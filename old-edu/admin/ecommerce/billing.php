<?php
define('DROOT_PATH', $_SERVER['DOCUMENT_ROOT']);
define('ADMIN_PATH', DROOT_PATH . '/admin');
define('ADMIN_URL', '/admin');
require_once DROOT_PATH . '/includes/config.php';
require_once DROOT_PATH . '/includes/functions.php';

if (!isset($_SESSION['user_id'])) { exit('Access Denied'); }
$stmt = $pdo->prepare("SELECT status, permissions FROM users WHERE id = ?");
$stmt->execute([$_SESSION['user_id']]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);
$permissions = json_decode($user['permissions'] ?? '{}', true);
if (!$user || $user['status'] !== 'active' || empty($permissions['ecommerce']['manage_billing'])) {
    exit('Access Denied');
}
$username = $_SESSION['username'];

// ── AJAX: checkout (create the sale) ────────────────────────────────────────
if (isset($_GET['action']) && $_GET['action'] === 'checkout') {
    header('Content-Type: application/json');
    $input = json_decode(file_get_contents('php://input'), true);

    $items         = $input['items'] ?? [];
    $customer_id   = (int)($input['customer_id'] ?? 0);
    $customer_name = trim($input['customer_name'] ?? '');
    $customer_phone= trim($input['customer_phone'] ?? '');
    $payment_status= ($input['payment_status'] ?? 'Paid') === 'Unpaid' ? 'Unpaid' : 'Paid';
    $payment_method= trim($input['payment_method'] ?? 'Cash');
    $coupon_code   = strtoupper(trim($input['coupon_code'] ?? ''));

    if (empty($items)) {
        echo json_encode(['success' => false, 'message' => 'Cart is empty.']); exit;
    }

    try {
        $pdo->beginTransaction();

        // Re-fetch authoritative product data (never trust client-sent prices)
        $line_items = [];
        $subtotal = 0;
        foreach ($items as $it) {
            $pid = (int)($it['product_id'] ?? 0);
            $qty = max(1, (int)($it['qty'] ?? 1));
            $p = $pdo->prepare("SELECT * FROM ecom_products WHERE id = ?");
            $p->execute([$pid]);
            $product = $p->fetch(PDO::FETCH_ASSOC);
            if (!$product) continue;

            $unit_price = (!empty($product['sale_price']) && (float)$product['sale_price'] > 0 && (float)$product['sale_price'] < (float)$product['price'])
                ? (float)$product['sale_price'] : (float)$product['price'];

            $line_items[] = [
                'product'    => $product,
                'qty'        => $qty,
                'unit_price' => $unit_price,
                'line_total' => $unit_price * $qty,
            ];
            $subtotal += $unit_price * $qty;
        }

        if (empty($line_items)) {
            $pdo->rollBack();
            echo json_encode(['success' => false, 'message' => 'No valid products in cart.']); exit;
        }

        // ── Coupon validation & discount calculation (server-side, authoritative) ──
        $discount = 0;
        $coupon = null;
        if ($coupon_code !== '') {
            $cq = $pdo->prepare("SELECT * FROM ecom_coupons WHERE code = ? AND status = 'active'");
            $cq->execute([$coupon_code]);
            $coupon = $cq->fetch(PDO::FETCH_ASSOC);

            if ($coupon && (int)$coupon['used_count'] < (int)$coupon['number_of_times']) {
                $eligible_total = 0;
                foreach ($line_items as $li) {
                    $matches = false;
                    if ($coupon['applies_to'] === 'all') $matches = true;
                    elseif ($coupon['applies_to'] === 'product' && $li['product']['id'] == $coupon['product_id']) $matches = true;
                    elseif ($coupon['applies_to'] === 'category' && $li['product']['category_id'] == $coupon['category_id']) $matches = true;
                    elseif ($coupon['applies_to'] === 'subcategory' && $li['product']['subcategory_id'] == $coupon['subcategory_id']) $matches = true;

                    if ($matches) $eligible_total += $li['line_total'];
                }

                if ($eligible_total > 0) {
                    $discount = $coupon['discount_type'] === 'percentage'
                        ? $eligible_total * ((float)$coupon['discount_value'] / 100)
                        : min((float)$coupon['discount_value'], $eligible_total);
                }
            } else {
                $coupon = null; // invalid / exhausted — ignore silently, still complete the sale
            }
        }

        $grand_total = max(0, $subtotal - $discount);

        // ── Resolve / create customer ────────────────────────────────────────────
        if ($customer_id > 0) {
            $cc = $pdo->prepare("SELECT id, name FROM ecom_customers WHERE id = ?");
            $cc->execute([$customer_id]);
            $existing = $cc->fetch(PDO::FETCH_ASSOC);
            if ($existing) $customer_name = $existing['name'];
        } elseif ($customer_name !== '') {
            $pdo->prepare("INSERT INTO ecom_customers (name, phone, customer_type, status) VALUES (?,?,?,'active')")
                ->execute([$customer_name, $customer_phone ?: null, 'offline']);
            $customer_id = (int)$pdo->lastInsertId();
        } else {
            $customer_name = 'Walk-in Customer';
        }

        // ── Create order ─────────────────────────────────────────────────────────
        $order_number = 'POS-' . date('Ymd') . '-' . strtoupper(substr(uniqid(), -6));
        $pdo->prepare("
            INSERT INTO ecom_orders (order_number, customer_id, customer_name, total_amount, payment_status, order_status, order_type)
            VALUES (?,?,?,?,?,?,'offline')
        ")->execute([$order_number, $customer_id ?: null, $customer_name, $grand_total, $payment_status, 'Delivered']);
        $order_id = (int)$pdo->lastInsertId();

        foreach ($line_items as $li) {
            $pdo->prepare("INSERT INTO ecom_order_items (order_id, product_id, product_name, qty, price) VALUES (?,?,?,?,?)")
                ->execute([$order_id, $li['product']['id'], $li['product']['name'], $li['qty'], $li['unit_price']]);

            if ($li['product']['product_type'] === 'physical' && $li['product']['stock_qty'] !== null) {
                $pdo->prepare("UPDATE ecom_products SET stock_qty = GREATEST(stock_qty - ?, 0) WHERE id = ?")
                    ->execute([$li['qty'], $li['product']['id']]);
            }
        }

        if ($coupon) {
            $pdo->prepare("UPDATE ecom_coupons SET used_count = used_count + 1 WHERE id = ?")->execute([$coupon['id']]);
        }

        $pdo->prepare("INSERT INTO activity_logs (user_id, action_type, description, ip_address, user_agent) VALUES (?, 'ecom_pos_sale', ?, ?, ?)")
            ->execute([$_SESSION['user_id'], "POS Sale: $order_number (₹" . number_format($grand_total, 2) . ") via $payment_method", $log_ip, $log_ua]);

        $pdo->commit();
        echo json_encode(['success' => true, 'order_id' => $order_id, 'order_number' => $order_number, 'discount' => $discount, 'grand_total' => $grand_total]);
        exit;

    } catch (Exception $e) {
        $pdo->rollBack();
        echo json_encode(['success' => false, 'message' => 'Checkout failed: ' . $e->getMessage()]);
        exit;
    }
}

// ── Preload data for the client-side POS ────────────────────────────────────
$all_products = $pdo->query("
    SELECT id, name, sku, barcode, price, sale_price, stock_qty, product_type, category_id, subcategory_id
    FROM ecom_products WHERE status = 'active' ORDER BY name ASC
")->fetchAll(PDO::FETCH_ASSOC);

$all_coupons = $pdo->query("SELECT code, discount_type, discount_value, applies_to FROM ecom_coupons WHERE status = 'active'")->fetchAll(PDO::FETCH_ASSOC);
$all_customers = $pdo->query("SELECT id, name, phone FROM ecom_customers WHERE status = 'active' ORDER BY name ASC")->fetchAll(PDO::FETCH_ASSOC);

$page_title = 'Billing / POS';
$page_subtitle = 'Scan a barcode or search a product to start a sale';
?>
<!DOCTYPE html>
<html lang="en">
<head>
<?php include __DIR__ . '/components/ecom-head.php'; ?>
<style>
.scan-box { font-size: 1.25rem; padding: 1rem 1.25rem; border: 2px solid var(--primary); border-radius: var(--radius-lg); }
.scan-box:focus { box-shadow: 0 0 0 3px var(--primary-lighter); }
.pos-cart-table th, .pos-cart-table td { vertical-align: middle; }
.qty-controls { display: flex; align-items: center; gap: 0.4rem; }
.qty-controls button { width: 28px; height: 28px; border: 1px solid var(--gray-200); background: var(--gray-50); border-radius: 4px; cursor: pointer; }
.qty-controls input { width: 50px; text-align: center; border: 1px solid var(--gray-200); border-radius: 4px; padding: 0.25rem; }
.pos-totals div { display: flex; justify-content: space-between; padding: 0.4rem 0; font-size: 0.95rem; }
.pos-totals .grand { font-size: 1.375rem; font-weight: 800; border-top: 2px solid var(--gray-800); padding-top: 0.6rem; margin-top: 0.3rem; }
.search-results-pos { position: absolute; z-index: 1060; background: #fff; border: 1px solid var(--gray-200); border-radius: var(--radius); box-shadow: var(--shadow-lg, 0 8px 20px rgba(0,0,0,.1)); max-height: 260px; overflow-y: auto; display: none; width: 100%; }
.search-results-pos .item { padding: 0.6rem 0.9rem; cursor: pointer; }
.search-results-pos .item:hover { background: var(--gray-50); }
.search-results-pos .item small { color: var(--gray-400); }
.customer-search-wrap { position: relative; }
</style>
</head>
<body>

<div class="admin-container">
    <div class="sidebar-overlay" id="sidebarOverlay" onclick="toggleSidebar()"></div>
    <?php include DROOT_PATH . '/admin/components/sidebar-nav.php'; ?>

    <main class="main-content">
        <header class="top-nav">
            <div class="nav-left">
                <button class="menu-toggle" onclick="toggleSidebar()"><i class="fas fa-bars"></i></button>
                <span class="sitename-mob"><?= htmlspecialchars($site_name) ?></span>
                <div class="page-heading-mini">
                    <h1><?= htmlspecialchars($page_title) ?></h1>
                    <p><?= htmlspecialchars($page_subtitle) ?></p>
                </div>
            </div>
            <div class="nav-right">
                <a href="barcode-print.php" class="btn btn-secondary btn-sm"><i class="fas fa-barcode"></i> Print Barcodes</a>
                <button class="icon-btn dark-mode-toggle" style="background: var(--primary-lighter); color: var(--primary);"><i class="fas fa-moon"></i></button>
            </div>
        </header>

        <div class="content-wrapper">

            <div class="row">
                <!-- LEFT: Scan + Cart -->
                <div class="col-lg-8">
                    <div class="gd-card">
                        <div class="gd-card-body">
                            <label class="form-label"><i class="fas fa-barcode"></i> Scan Barcode or Search Product</label>
                            <div class="position-relative">
                                <input type="text" id="scanInput" class="form-control scan-box" placeholder="Scan barcode or type product name / SKU…" autocomplete="off" autofocus>
                                <div class="search-results-pos" id="scanResults"></div>
                            </div>
                        </div>
                    </div>

                    <div class="gd-card">
                        <div class="gd-card-body">
                            <h5 class="mb-3"><i class="fas fa-shopping-basket text-primary"></i> Cart</h5>
                            <div class="table-responsive">
                                <table class="table table-bordered pos-cart-table" id="cartTable">
                                    <thead>
                                        <tr><th>Product</th><th>Price</th><th width="140">Qty</th><th>Subtotal</th><th></th></tr>
                                    </thead>
                                    <tbody id="cartBody">
                                        <tr id="emptyCartRow"><td colspan="5" class="text-center text-muted py-4">Cart is empty — scan a product to begin.</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- RIGHT: Customer, Coupon, Totals -->
                <div class="col-lg-4">
                    <div class="gd-card">
                        <div class="gd-card-body">
                            <h5 class="mb-3"><i class="fas fa-user text-primary"></i> Customer</h5>
                            <div class="customer-search-wrap mb-2">
                                <input type="text" id="customerSearch" class="form-control" placeholder="Search existing customer…" autocomplete="off">
                                <input type="hidden" id="customerId">
                                <div class="search-results-pos" id="customerResults"></div>
                            </div>
                            <div class="mb-2">
                                <input type="text" id="customerName" class="form-control" placeholder="Walk-in customer name (optional)">
                            </div>
                            <div>
                                <input type="text" id="customerPhone" class="form-control" placeholder="Phone (optional)">
                            </div>
                        </div>
                    </div>

                    <div class="gd-card">
                        <div class="gd-card-body">
                            <h5 class="mb-3"><i class="fas fa-tag text-primary"></i> Coupon</h5>
                            <div class="input-group">
                                <input type="text" id="couponCode" class="form-control text-uppercase" placeholder="Coupon code">
                                <button class="btn btn-secondary" type="button" onclick="applyCoupon()">Apply</button>
                            </div>
                            <div id="couponMsg" class="form-text"></div>
                        </div>
                    </div>

                    <div class="gd-card">
                        <div class="gd-card-body">
                            <h5 class="mb-3"><i class="fas fa-money-bill-wave text-primary"></i> Payment</h5>
                            <div class="mb-3">
                                <label class="form-label">Method</label>
                                <select id="paymentMethod" class="form-select">
                                    <option value="Cash">Cash</option>
                                    <option value="Card">Card</option>
                                    <option value="UPI">UPI</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Payment Status</label>
                                <select id="paymentStatus" class="form-select">
                                    <option value="Paid">Paid</option>
                                    <option value="Unpaid">Unpaid</option>
                                </select>
                            </div>

                            <div class="pos-totals">
                                <div><span>Subtotal</span><span id="totSubtotal">₹0.00</span></div>
                                <div><span>Discount</span><span id="totDiscount">-₹0.00</span></div>
                                <div class="grand"><span>Total</span><span id="totGrand">₹0.00</span></div>
                            </div>

                            <button class="btn btn-primary w-100 btn-lg mt-3" onclick="completeSale()">
                                <i class="fas fa-check-circle"></i> Complete Sale
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </main>
</div>

<?php include_once ADMIN_PATH . '/components/admin_footer.php'; ?>
<?php include __DIR__ . '/components/ecom-scripts.php'; ?>

<script>
const ALL_PRODUCTS  = <?= json_encode($all_products) ?>;
const ALL_COUPONS   = <?= json_encode($all_coupons) ?>;
const ALL_CUSTOMERS = <?= json_encode($all_customers) ?>;

let cart = [];              // [{product_id, name, unit_price, qty, stock_qty, product_type}]
let appliedCoupon = null;   // {code, discount_type, discount_value, applies_to}

function fmt(n) { return '₹' + Number(n).toFixed(2); }

function effectivePrice(p) {
    const sale = parseFloat(p.sale_price);
    const price = parseFloat(p.price);
    return (sale > 0 && sale < price) ? sale : price;
}

function addToCart(product) {
    const existing = cart.find(c => c.product_id === product.id);
    if (existing) {
        if (product.product_type === 'physical' && product.stock_qty !== null && existing.qty + 1 > product.stock_qty) {
            alert('Only ' + product.stock_qty + ' in stock for "' + product.name + '".');
            return;
        }
        existing.qty += 1;
    } else {
        cart.push({
            product_id: product.id,
            name: product.name,
            unit_price: effectivePrice(product),
            qty: 1,
            stock_qty: product.stock_qty,
            product_type: product.product_type,
            category_id: product.category_id,
            subcategory_id: product.subcategory_id
        });
    }
    renderCart();
}

function renderCart() {
    const body = document.getElementById('cartBody');
    if (cart.length === 0) {
        body.innerHTML = '<tr id="emptyCartRow"><td colspan="5" class="text-center text-muted py-4">Cart is empty — scan a product to begin.</td></tr>';
    } else {
        body.innerHTML = cart.map((c, idx) => `
            <tr>
                <td>${c.name}</td>
                <td>${fmt(c.unit_price)}</td>
                <td>
                    <div class="qty-controls">
                        <button type="button" onclick="changeQty(${idx}, -1)">-</button>
                        <input type="number" value="${c.qty}" min="1" onchange="setQty(${idx}, this.value)">
                        <button type="button" onclick="changeQty(${idx}, 1)">+</button>
                    </div>
                </td>
                <td>${fmt(c.unit_price * c.qty)}</td>
                <td><button type="button" class="btn btn-danger btn-sm" onclick="removeFromCart(${idx})"><i class="fas fa-trash-alt"></i></button></td>
            </tr>
        `).join('');
    }
    recalcTotals();
}

function changeQty(idx, delta) {
    const item = cart[idx];
    const newQty = item.qty + delta;
    if (newQty < 1) { removeFromCart(idx); return; }
    if (item.product_type === 'physical' && item.stock_qty !== null && newQty > item.stock_qty) {
        alert('Only ' + item.stock_qty + ' in stock.');
        return;
    }
    item.qty = newQty;
    renderCart();
}

function setQty(idx, val) {
    const qty = Math.max(1, parseInt(val) || 1);
    const item = cart[idx];
    if (item.product_type === 'physical' && item.stock_qty !== null && qty > item.stock_qty) {
        alert('Only ' + item.stock_qty + ' in stock.');
        item.qty = item.stock_qty;
    } else {
        item.qty = qty;
    }
    renderCart();
}

function removeFromCart(idx) {
    cart.splice(idx, 1);
    renderCart();
}

function recalcTotals() {
    const subtotal = cart.reduce((sum, c) => sum + c.unit_price * c.qty, 0);
    let discount = 0;

    if (appliedCoupon) {
        let eligible = 0;
        cart.forEach(c => {
            let matches = false;
            if (appliedCoupon.applies_to === 'all') matches = true;
            else if (appliedCoupon.applies_to === 'product' && c.product_id == appliedCoupon.product_id) matches = true;
            else if (appliedCoupon.applies_to === 'category' && c.category_id == appliedCoupon.category_id) matches = true;
            else if (appliedCoupon.applies_to === 'subcategory' && c.subcategory_id == appliedCoupon.subcategory_id) matches = true;
            if (matches) eligible += c.unit_price * c.qty;
        });
        if (eligible > 0) {
            discount = appliedCoupon.discount_type === 'percentage'
                ? eligible * (appliedCoupon.discount_value / 100)
                : Math.min(appliedCoupon.discount_value, eligible);
        }
    }

    document.getElementById('totSubtotal').textContent = fmt(subtotal);
    document.getElementById('totDiscount').textContent = '-' + fmt(discount);
    document.getElementById('totGrand').textContent = fmt(Math.max(0, subtotal - discount));
}

function applyCoupon() {
    const code = document.getElementById('couponCode').value.trim().toUpperCase();
    const msg = document.getElementById('couponMsg');
    if (!code) { appliedCoupon = null; msg.textContent = ''; recalcTotals(); return; }

    const found = ALL_COUPONS.find(c => c.code.toUpperCase() === code);
    if (!found) {
        appliedCoupon = null;
        msg.innerHTML = '<span class="text-danger">Invalid or inactive coupon code.</span>';
    } else {
        appliedCoupon = found;
        msg.innerHTML = '<span class="text-success">Coupon "' + code + '" applied!</span>';
    }
    recalcTotals();
}

// ── Barcode scan / product search ───────────────────────────────────────────
const scanInput = document.getElementById('scanInput');
const scanResults = document.getElementById('scanResults');

scanInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        const val = this.value.trim();
        if (!val) return;

        // Exact match first (this is what a barcode scanner gun produces)
        const exact = ALL_PRODUCTS.find(p => p.barcode === val || p.sku === val || String(p.id) === val);
        if (exact) {
            addToCart(exact);
            this.value = '';
            scanResults.style.display = 'none';
            return;
        }

        // Otherwise treat it as a name search — add the first match
        const q = val.toLowerCase();
        const match = ALL_PRODUCTS.find(p => p.name.toLowerCase().includes(q));
        if (match) {
            addToCart(match);
            this.value = '';
            scanResults.style.display = 'none';
        } else {
            alert('No product found for "' + val + '".');
        }
    }
});

scanInput.addEventListener('input', function () {
    const q = this.value.trim().toLowerCase();
    if (q.length < 2) { scanResults.style.display = 'none'; return; }
    const matches = ALL_PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(q) || (p.sku || '').toLowerCase().includes(q) || (p.barcode || '').includes(q)
    ).slice(0, 8);

    if (matches.length === 0) { scanResults.style.display = 'none'; return; }
    scanResults.innerHTML = matches.map(p =>
        `<div class="item" data-id="${p.id}">${p.name} <small>(${fmt(effectivePrice(p))}${p.stock_qty !== null ? ' · Stock: ' + p.stock_qty : ''})</small></div>`
    ).join('');
    scanResults.style.display = 'block';
});

scanResults.addEventListener('click', function (e) {
    const item = e.target.closest('.item[data-id]');
    if (!item) return;
    const product = ALL_PRODUCTS.find(p => p.id == item.dataset.id);
    if (product) addToCart(product);
    scanInput.value = '';
    scanInput.focus();
    scanResults.style.display = 'none';
});

document.addEventListener('click', function (e) {
    if (!e.target.closest('.position-relative')) scanResults.style.display = 'none';
});

// ── Customer search ──────────────────────────────────────────────────────────
const customerSearch = document.getElementById('customerSearch');
const customerResults = document.getElementById('customerResults');
const customerIdField = document.getElementById('customerId');

customerSearch.addEventListener('input', function () {
    customerIdField.value = '';
    const q = this.value.trim().toLowerCase();
    if (q.length < 2) { customerResults.style.display = 'none'; return; }
    const matches = ALL_CUSTOMERS.filter(c => c.name.toLowerCase().includes(q) || (c.phone || '').includes(q)).slice(0, 8);
    if (matches.length === 0) { customerResults.style.display = 'none'; return; }
    customerResults.innerHTML = matches.map(c =>
        `<div class="item" data-id="${c.id}" data-name="${c.name.replace(/"/g,'&quot;')}">${c.name} <small>(${c.phone || 'no phone'})</small></div>`
    ).join('');
    customerResults.style.display = 'block';
});
customerResults.addEventListener('click', function (e) {
    const item = e.target.closest('.item[data-id]');
    if (!item) return;
    customerIdField.value = item.dataset.id;
    customerSearch.value = item.dataset.name;
    customerResults.style.display = 'none';
});
document.addEventListener('click', function (e) {
    if (!e.target.closest('.customer-search-wrap')) customerResults.style.display = 'none';
});

// ── Complete Sale ────────────────────────────────────────────────────────────
function completeSale() {
    if (cart.length === 0) { alert('Cart is empty.'); return; }

    const payload = {
        items: cart.map(c => ({ product_id: c.product_id, qty: c.qty })),
        customer_id: customerIdField.value || 0,
        customer_name: document.getElementById('customerName').value.trim(),
        customer_phone: document.getElementById('customerPhone').value.trim(),
        payment_method: document.getElementById('paymentMethod').value,
        payment_status: document.getElementById('paymentStatus').value,
        coupon_code: appliedCoupon ? appliedCoupon.code : ''
    };

    fetch('billing.php?action=checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    .then(r => r.json())
    .then(data => {
        if (!data.success) { alert(data.message || 'Checkout failed.'); return; }
        window.open('invoice.php?id=' + data.order_id, '_blank');

        // Reset for next sale
        cart = [];
        appliedCoupon = null;
        document.getElementById('couponCode').value = '';
        document.getElementById('couponMsg').textContent = '';
        document.getElementById('customerName').value = '';
        document.getElementById('customerPhone').value = '';
        customerSearch.value = '';
        customerIdField.value = '';
        renderCart();
        scanInput.focus();
    })
    .catch(() => alert('Checkout failed — please try again.'));
}
</script>
</body>
</html>
