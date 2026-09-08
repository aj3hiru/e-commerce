<?php
define('DROOT_PATH', $_SERVER['DOCUMENT_ROOT']);
require_once DROOT_PATH . '/includes/config.php';
require_once DROOT_PATH . '/includes/functions.php';

$page_title = 'Your Cart';
include __DIR__ . '/includes/shop-header.php';

$cart_items = [];
$subtotal = 0;

if (!empty($cart)) {
    $ids = array_keys($cart);
    $in = implode(',', array_fill(0, count($ids), '?'));
    $stmt = $pdo->prepare("SELECT * FROM ecom_products WHERE id IN ($in)");
    $stmt->execute($ids);
    foreach ($stmt->fetchAll(PDO::FETCH_ASSOC) as $p) {
        $qty = $cart[$p['id']];
        $price = (float)$p['price'];
        $sale  = (!empty($p['sale_price']) && (float)$p['sale_price'] > 0 && (float)$p['sale_price'] < $price) ? (float)$p['sale_price'] : null;
        $unit  = $sale ?? $price;
        $cart_items[] = ['product' => $p, 'qty' => $qty, 'unit_price' => $unit, 'line_total' => $unit * $qty];
        $subtotal += $unit * $qty;
    }
}
?>

<div class="shop-container">
    <h2 class="section-title">Your Cart</h2>

    <?php if (empty($cart_items)): ?>
        <div class="text-center py-5 text-muted">
            <i class="fas fa-shopping-cart fa-3x mb-3"></i>
            <p>Your cart is empty.</p>
            <a href="/shop/" class="btn btn-shop-primary">Continue Shopping</a>
        </div>
    <?php else: ?>
    <div class="row">
        <div class="col-lg-8">
            <div class="table-responsive">
                <table class="table align-middle" id="cartTable">
                    <thead><tr><th>Product</th><th>Price</th><th>Qty</th><th>Subtotal</th><th></th></tr></thead>
                    <tbody>
                    <?php foreach ($cart_items as $ci): $p = $ci['product']; ?>
                    <tr data-pid="<?= $p['id'] ?>">
                        <td>
                            <div class="d-flex align-items-center gap-2">
                                <div style="width:52px;height:52px;background:var(--gray-50);border-radius:6px;overflow:hidden;flex-shrink:0;display:flex;align-items:center;justify-content:center;">
                                    <?php if (!empty($p['image'])): ?><img src="/<?= htmlspecialchars($p['image']) ?>" style="width:100%;height:100%;object-fit:cover;"><?php else: ?><i class="fas fa-image text-muted"></i><?php endif; ?>
                                </div>
                                <a href="/shop/product.php?slug=<?= urlencode($p['slug']) ?>" class="text-dark fw-semibold"><?= htmlspecialchars($p['name']) ?></a>
                            </div>
                        </td>
                        <td>₹<?= number_format($ci['unit_price'], 2) ?></td>
                        <td style="width:120px;">
                            <input type="number" class="form-control form-control-sm qty-input" value="<?= $ci['qty'] ?>" min="1" onchange="updateQty(<?= $p['id'] ?>, this.value)">
                        </td>
                        <td class="line-total">₹<?= number_format($ci['line_total'], 2) ?></td>
                        <td><button class="btn btn-sm btn-outline-danger" onclick="removeItem(<?= $p['id'] ?>)"><i class="fas fa-trash-alt"></i></button></td>
                    </tr>
                    <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="card border-0 shadow-sm">
                <div class="card-body">
                    <h5 class="fw-bold mb-3">Order Summary</h5>
                    <div class="d-flex justify-content-between mb-2"><span>Subtotal</span><strong id="cartSubtotal">₹<?= number_format($subtotal, 2) ?></strong></div>
                    <p class="text-muted small">Taxes and delivery calculated at checkout.</p>
                    <a href="/shop/checkout.php" class="btn btn-shop-primary w-100">Proceed to Checkout</a>
                </div>
            </div>
        </div>
    </div>
    <?php endif; ?>
</div>

<script>
function updateQty(productId, qty) {
    fetch('/shop/ajax.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'action=update_cart_qty&product_id=' + productId + '&qty=' + qty
    }).then(() => window.location.reload());
}
function removeItem(productId) {
    fetch('/shop/ajax.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'action=remove_from_cart&product_id=' + productId
    }).then(() => window.location.reload());
}
</script>

<?php include __DIR__ . '/includes/shop-footer.php'; ?>
