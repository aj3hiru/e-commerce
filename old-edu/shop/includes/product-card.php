<?php
/**
 * Renders one product card. Requires $pdo and (optionally) $shop_customer
 * to already be available in scope (both are set by shop-header.php).
 */
function renderProductCard($p, $wishlisted_ids = []) {
    $price = (float)$p['price'];
    $sale  = (!empty($p['sale_price']) && (float)$p['sale_price'] > 0 && (float)$p['sale_price'] < $price) ? (float)$p['sale_price'] : null;
    $out_of_stock = $p['product_type'] === 'physical' && (int)($p['stock_qty'] ?? 0) <= 0;
    $is_wished = in_array($p['id'], $wishlisted_ids);
    ?>
    <div class="col-6 col-md-4 col-lg-3 mb-4">
        <div class="product-card">
            <a href="/shop/product.php?slug=<?= urlencode($p['slug']) ?>" class="thumb">
                <?php if (!empty($p['image'])): ?>
                    <img src="/<?= htmlspecialchars($p['image']) ?>" alt="<?= htmlspecialchars($p['name']) ?>">
                <?php else: ?>
                    <i class="fas fa-image fa-2x text-muted"></i>
                <?php endif; ?>
                <?php if ($p['badge_tag'] !== 'none'): ?>
                    <span class="badge bg-danger badge-corner text-uppercase"><?= htmlspecialchars($p['badge_tag']) ?></span>
                <?php endif; ?>
            </a>
            <button class="wish-btn<?= $is_wished ? ' active' : '' ?>" onclick="toggleWishlist(<?= $p['id'] ?>, this)" title="Add to wishlist">
                <i class="<?= $is_wished ? 'fas' : 'far' ?> fa-heart"></i>
            </button>
            <div class="body">
                <a href="/shop/product.php?slug=<?= urlencode($p['slug']) ?>" class="name"><?= htmlspecialchars($p['name']) ?></a>
                <div class="price-row">
                    <span class="price-now">₹<?= number_format($sale ?? $price, 2) ?></span>
                    <?php if ($sale): ?><span class="price-old">₹<?= number_format($price, 2) ?></span><?php endif; ?>
                </div>
                <?php if ($out_of_stock): ?>
                    <button class="btn btn-sm btn-secondary mt-2" disabled>Out of Stock</button>
                <?php else: ?>
                    <button class="btn btn-shop-primary btn-sm mt-2" onclick="addToCart(<?= $p['id'] ?>)"><i class="fas fa-cart-plus"></i> Add to Cart</button>
                <?php endif; ?>
            </div>
        </div>
    </div>
    <?php
}
