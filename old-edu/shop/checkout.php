<?php
define('DROOT_PATH', $_SERVER['DOCUMENT_ROOT']);
require_once DROOT_PATH . '/includes/config.php';
require_once DROOT_PATH . '/includes/functions.php';

if (empty($_SESSION['customer_id'])) {
    header('Location: /shop/login.php?redirect=' . urlencode('/shop/checkout.php'));
    exit;
}
if (empty($_SESSION['shop_cart'])) {
    header('Location: /shop/cart.php');
    exit;
}

$cstmt = $pdo->prepare("SELECT * FROM ecom_customers WHERE id = ?");
$cstmt->execute([$_SESSION['customer_id']]);
$customer = $cstmt->fetch(PDO::FETCH_ASSOC);
$cart = $_SESSION['shop_cart'];

$error = '';

// ── Place order (runs BEFORE any HTML output, so redirects work) ────────────
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $address        = trim($_POST['address'] ?? '');
    $payment_method = $_POST['payment_method'] ?? '';
    $coupon_code    = strtoupper(trim($_POST['coupon_code'] ?? ''));

    if (empty($address)) {
        $error = 'Please enter a delivery address.';
    } elseif (empty($payment_method)) {
        $error = 'Please select a payment method.';
    } else {
        try {
            $pdo->beginTransaction();

            $ids = array_keys($cart);
            $in = implode(',', array_fill(0, count($ids), '?'));
            $pstmt = $pdo->prepare("SELECT * FROM ecom_products WHERE id IN ($in) AND status='active'");
            $pstmt->execute($ids);
            $products = $pstmt->fetchAll(PDO::FETCH_ASSOC);

            $line_items = [];
            $subtotal = 0;
            foreach ($products as $p) {
                $qty = $cart[$p['id']] ?? 0;
                if ($qty <= 0) continue;
                if ($p['product_type'] === 'physical' && $p['stock_qty'] !== null && $qty > (int)$p['stock_qty']) {
                    $qty = (int)$p['stock_qty'];
                }
                if ($qty <= 0) continue;
                $price = (float)$p['price'];
                $sale  = (!empty($p['sale_price']) && (float)$p['sale_price'] > 0 && (float)$p['sale_price'] < $price) ? (float)$p['sale_price'] : null;
                $unit  = $sale ?? $price;
                $line_items[] = ['product' => $p, 'qty' => $qty, 'unit_price' => $unit, 'line_total' => $unit * $qty];
                $subtotal += $unit * $qty;
            }

            if (empty($line_items)) {
                throw new Exception('Your cart items are no longer available.');
            }

            $discount = 0;
            $coupon = null;
            if ($coupon_code !== '') {
                $cq = $pdo->prepare("SELECT * FROM ecom_coupons WHERE code = ? AND status = 'active'");
                $cq->execute([$coupon_code]);
                $coupon = $cq->fetch(PDO::FETCH_ASSOC);
                if ($coupon && (int)$coupon['used_count'] < (int)$coupon['number_of_times']) {
                    $eligible = 0;
                    foreach ($line_items as $li) {
                        $matches = $coupon['applies_to'] === 'all'
                            || ($coupon['applies_to'] === 'product' && $li['product']['id'] == $coupon['product_id'])
                            || ($coupon['applies_to'] === 'category' && $li['product']['category_id'] == $coupon['category_id'])
                            || ($coupon['applies_to'] === 'subcategory' && $li['product']['subcategory_id'] == $coupon['subcategory_id']);
                        if ($matches) $eligible += $li['line_total'];
                    }
                    if ($eligible > 0) {
                        $discount = $coupon['discount_type'] === 'percentage'
                            ? $eligible * ((float)$coupon['discount_value'] / 100)
                            : min((float)$coupon['discount_value'], $eligible);
                    }
                } else {
                    $coupon = null;
                }
            }

            $grand_total = max(0, $subtotal - $discount);

            $pdo->prepare("UPDATE ecom_customers SET address = ? WHERE id = ?")->execute([$address, $customer['id']]);

            $order_number = 'ORD-' . date('Ymd') . '-' . strtoupper(substr(uniqid(), -6));
            $pdo->prepare("
                INSERT INTO ecom_orders (order_number, customer_id, customer_name, customer_email, total_amount, payment_status, order_status, order_type)
                VALUES (?,?,?,?,?,?,?,'online')
            ")->execute([$order_number, $customer['id'], $customer['name'], $customer['email'], $grand_total, 'Unpaid', 'Pending']);
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

            $pdo->commit();
            unset($_SESSION['shop_cart']);

            header('Location: /shop/order.php?id=' . $order_id . '&placed=1');
            exit;

        } catch (Exception $e) {
            $pdo->rollBack();
            $error = 'Could not place order: ' . $e->getMessage();
        }
    }
}

// ── Build cart summary for display ──────────────────────────────────────────
$ids = array_keys($cart);
$in = implode(',', array_fill(0, count($ids), '?'));
$stmt = $pdo->prepare("SELECT * FROM ecom_products WHERE id IN ($in)");
$stmt->execute($ids);
$cart_items = [];
$subtotal = 0;
foreach ($stmt->fetchAll(PDO::FETCH_ASSOC) as $p) {
    $qty = $cart[$p['id']];
    $price = (float)$p['price'];
    $sale  = (!empty($p['sale_price']) && (float)$p['sale_price'] > 0 && (float)$p['sale_price'] < $price) ? (float)$p['sale_price'] : null;
    $unit  = $sale ?? $price;
    $cart_items[] = ['name' => $p['name'], 'qty' => $qty, 'line_total' => $unit * $qty];
    $subtotal += $unit * $qty;
}

$payment_methods = $pdo->query("SELECT method_key, name FROM ecom_payment_settings WHERE is_enabled = 1")->fetchAll(PDO::FETCH_ASSOC);

// ── Now safe to render the page ──────────────────────────────────────────────
$page_title = 'Checkout';
include __DIR__ . '/includes/shop-header.php';
?>

<div class="shop-container">
    <h2 class="section-title">Checkout</h2>

    <?php if ($error): ?><div class="alert alert-danger"><?= htmlspecialchars($error) ?></div><?php endif; ?>

    <form method="POST">
        <div class="row">
            <div class="col-lg-7">
                <div class="card border-0 shadow-sm mb-3">
                    <div class="card-body">
                        <h5 class="fw-bold mb-3">Delivery Address</h5>
                        <textarea name="address" class="form-control" rows="3" placeholder="Full address for delivery" required><?= htmlspecialchars($customer['address'] ?? '') ?></textarea>
                    </div>
                </div>

                <div class="card border-0 shadow-sm mb-3">
                    <div class="card-body">
                        <h5 class="fw-bold mb-3">Payment Method</h5>
                        <?php if (empty($payment_methods)): ?>
                            <p class="text-muted">No payment methods are currently available. Please contact us.</p>
                        <?php else: foreach ($payment_methods as $pm): ?>
                        <div class="form-check mb-2">
                            <input class="form-check-input" type="radio" name="payment_method" id="pm-<?= $pm['method_key'] ?>" value="<?= $pm['method_key'] ?>" required>
                            <label class="form-check-label" for="pm-<?= $pm['method_key'] ?>"><?= htmlspecialchars($pm['name']) ?></label>
                        </div>
                        <?php endforeach; endif; ?>
                    </div>
                </div>

                <div class="card border-0 shadow-sm">
                    <div class="card-body">
                        <h5 class="fw-bold mb-3">Coupon Code</h5>
                        <input type="text" name="coupon_code" class="form-control text-uppercase" placeholder="Have a coupon? Enter it here">
                    </div>
                </div>
            </div>

            <div class="col-lg-5">
                <div class="card border-0 shadow-sm">
                    <div class="card-body">
                        <h5 class="fw-bold mb-3">Order Summary</h5>
                        <?php foreach ($cart_items as $ci): ?>
                        <div class="d-flex justify-content-between mb-2 small">
                            <span><?= htmlspecialchars($ci['name']) ?> × <?= $ci['qty'] ?></span>
                            <span>₹<?= number_format($ci['line_total'], 2) ?></span>
                        </div>
                        <?php endforeach; ?>
                        <hr>
                        <div class="d-flex justify-content-between fw-bold"><span>Subtotal</span><span>₹<?= number_format($subtotal, 2) ?></span></div>
                        <p class="text-muted small mt-2">Coupon discount (if any) is applied when you place the order.</p>
                        <button type="submit" class="btn btn-shop-primary w-100 mt-3">Place Order</button>
                    </div>
                </div>
            </div>
        </div>
    </form>
</div>

<?php include __DIR__ . '/includes/shop-footer.php'; ?>
