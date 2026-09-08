<?php
define('DROOT_PATH', $_SERVER['DOCUMENT_ROOT']);
require_once DROOT_PATH . '/includes/config.php';
require_once DROOT_PATH . '/includes/functions.php';

$slug = $_GET['slug'] ?? '';
$stmt = $pdo->prepare("SELECT * FROM ecom_products WHERE slug = ? AND status = 'active'");
$stmt->execute([$slug]);
$product = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$product) { http_response_code(404); exit('Product not found.'); }

$gallery = $pdo->prepare("SELECT image FROM ecom_product_images WHERE product_id = ? ORDER BY sort_order ASC, id ASC");
$gallery->execute([$product['id']]);
$gallery_images = array_column($gallery->fetchAll(PDO::FETCH_ASSOC), 'image');

$slides = [];
if (!empty($product['image'])) $slides[] = $product['image'];
foreach ($gallery_images as $g) { $slides[] = $g; }
if (empty($slides)) $slides[] = null; // will render the placeholder icon

// ── Handle review submission (logged-in customers only) ─────────────────────
$review_msg = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST' && !empty($_SESSION['customer_id'])) {
    $rating = max(1, min(5, (int)($_POST['rating'] ?? 5)));
    $text   = trim($_POST['review_text'] ?? '');
    $cstmt = $pdo->prepare("SELECT name FROM ecom_customers WHERE id = ?");
    $cstmt->execute([$_SESSION['customer_id']]);
    $cname = $cstmt->fetchColumn() ?: 'Customer';

    $pdo->prepare("INSERT INTO ecom_product_reviews (product_id, customer_name, rating, review_text, status) VALUES (?,?,?,?,'pending')")
        ->execute([$product['id'], $cname, $rating, $text]);
    $review_msg = 'Thanks! Your review has been submitted and will appear once approved.';
}

$page_title = $product['name'];
include __DIR__ . '/includes/shop-header.php';
include __DIR__ . '/includes/product-card.php';

$brand = null;
if (!empty($product['brand_id'])) {
    $b = $pdo->prepare("SELECT name FROM ecom_brands WHERE id = ?");
    $b->execute([$product['brand_id']]);
    $brand = $b->fetchColumn();
}

$reviews = $pdo->prepare("SELECT * FROM ecom_product_reviews WHERE product_id = ? AND status = 'approved' ORDER BY created_at DESC");
$reviews->execute([$product['id']]);
$reviews = $reviews->fetchAll(PDO::FETCH_ASSOC);
$avg_rating = count($reviews) ? array_sum(array_column($reviews, 'rating')) / count($reviews) : 0;

$is_wished = false;
if ($shop_customer) {
    $w = $pdo->prepare("SELECT id FROM ecom_wishlist WHERE customer_id = ? AND product_id = ?");
    $w->execute([$shop_customer['id'], $product['id']]);
    $is_wished = (bool)$w->fetch();
}

$related = $pdo->prepare("SELECT * FROM ecom_products WHERE status='active' AND category_id = ? AND id != ? LIMIT 4");
$related->execute([$product['category_id'], $product['id']]);
$related = $related->fetchAll(PDO::FETCH_ASSOC);

$price = (float)$product['price'];
$sale  = (!empty($product['sale_price']) && (float)$product['sale_price'] > 0 && (float)$product['sale_price'] < $price) ? (float)$product['sale_price'] : null;
$out_of_stock = $product['product_type'] === 'physical' && (int)($product['stock_qty'] ?? 0) <= 0;
?>

<div class="shop-container">
    <nav aria-label="breadcrumb" class="mb-3">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/shop/">Home</a></li>
            <li class="breadcrumb-item active"><?= htmlspecialchars($product['name']) ?></li>
        </ol>
    </nav>

    <div class="row mb-5">
        <div class="col-md-5 mb-3">
            <div class="thumb" id="mainImageBox" style="border-radius: var(--radius-lg); border:1px solid var(--gray-200); overflow:hidden; aspect-ratio:1/1; display:flex; align-items:center; justify-content:center; background:var(--gray-50);">
                <?php if ($slides[0]): ?>
                    <img id="mainProductImage" src="/<?= htmlspecialchars($slides[0]) ?>" style="width:100%;height:100%;object-fit:cover;" alt="<?= htmlspecialchars($product['name']) ?>">
                <?php else: ?>
                    <i class="fas fa-image fa-4x text-muted"></i>
                <?php endif; ?>
            </div>

            <?php if (count($slides) > 1): ?>
            <div class="d-flex gap-2 mt-2 flex-wrap">
                <?php foreach ($slides as $i => $s): if (!$s) continue; ?>
                <div class="gallery-slide-thumb<?= $i === 0 ? ' active' : '' ?>" onclick="setMainImage('/<?= htmlspecialchars($s) ?>', this)" style="width:64px;height:64px;border-radius:6px;overflow:hidden;border:2px solid <?= $i === 0 ? 'var(--primary)' : 'var(--gray-200)' ?>;cursor:pointer;flex-shrink:0;">
                    <img src="/<?= htmlspecialchars($s) ?>" style="width:100%;height:100%;object-fit:cover;display:block;">
                </div>
                <?php endforeach; ?>
            </div>
            <?php endif; ?>
        </div>
        <div class="col-md-7">
            <?php if ($brand): ?><div class="text-muted mb-1"><?= htmlspecialchars($brand) ?></div><?php endif; ?>
            <h1 class="fw-bold mb-2" style="font-size:1.75rem;"><?= htmlspecialchars($product['name']) ?></h1>

            <?php if (count($reviews) > 0): ?>
            <div class="mb-2 text-warning">
                <?php for ($i = 1; $i <= 5; $i++): ?><i class="<?= $i <= round($avg_rating) ? 'fas' : 'far' ?> fa-star"></i><?php endfor; ?>
                <span class="text-muted ms-1">(<?= count($reviews) ?> review<?= count($reviews) === 1 ? '' : 's' ?>)</span>
            </div>
            <?php endif; ?>

            <div class="mb-3">
                <span class="fw-bold" style="font-size:1.75rem;">₹<?= number_format($sale ?? $price, 2) ?></span>
                <?php if ($sale): ?><span class="text-muted text-decoration-line-through ms-2" style="font-size:1.15rem;">₹<?= number_format($price, 2) ?></span>
                    <span class="badge bg-danger ms-2"><?= round((1 - $sale / $price) * 100) ?>% OFF</span>
                <?php endif; ?>
            </div>

            <?php if (!empty($product['description'])): ?>
            <p class="text-muted"><?= nl2br(htmlspecialchars($product['description'])) ?></p>
            <?php endif; ?>

            <?php if ($product['product_type'] === 'physical'): ?>
                <p class="mb-3"><?= $out_of_stock ? '<span class="text-danger fw-bold">Out of Stock</span>' : '<span class="text-success fw-bold">In Stock</span> (' . (int)$product['stock_qty'] . ' available)' ?></p>
            <?php endif; ?>

            <div class="d-flex gap-2">
                <?php if (!$out_of_stock): ?>
                <div class="input-group" style="max-width:130px;">
                    <button class="btn btn-outline-secondary" type="button" onclick="stepQty(-1)">-</button>
                    <input type="number" id="qtyInput" class="form-control text-center" value="1" min="1">
                    <button class="btn btn-outline-secondary" type="button" onclick="stepQty(1)">+</button>
                </div>
                <button class="btn btn-shop-primary" onclick="addToCart(<?= $product['id'] ?>, document.getElementById('qtyInput').value)"><i class="fas fa-cart-plus"></i> Add to Cart</button>
                <?php else: ?>
                <button class="btn btn-secondary" disabled>Out of Stock</button>
                <?php endif; ?>
                <button class="btn btn-outline-shop" onclick="toggleWishlist(<?= $product['id'] ?>, this)">
                    <i class="<?= $is_wished ? 'fas' : 'far' ?> fa-heart"></i>
                </button>
            </div>
        </div>
    </div>

    <!-- Reviews -->
    <div class="mb-5">
        <h4 class="fw-bold mb-3">Customer Reviews</h4>

        <?php if ($review_msg): ?><div class="alert alert-success"><?= htmlspecialchars($review_msg) ?></div><?php endif; ?>

        <?php if (empty($reviews)): ?>
            <p class="text-muted">No reviews yet — be the first to review this product!</p>
        <?php else: foreach ($reviews as $r): ?>
            <div class="border-bottom py-3">
                <div class="d-flex justify-content-between">
                    <strong><?= htmlspecialchars($r['customer_name']) ?></strong>
                    <span class="text-warning"><?php for ($i = 1; $i <= 5; $i++): ?><i class="<?= $i <= $r['rating'] ? 'fas' : 'far' ?> fa-star"></i><?php endfor; ?></span>
                </div>
                <?php if (!empty($r['review_text'])): ?><p class="mb-0 text-muted mt-1"><?= htmlspecialchars($r['review_text']) ?></p><?php endif; ?>
            </div>
        <?php endforeach; endif; ?>

        <?php if ($shop_customer): ?>
        <form method="POST" class="mt-4" style="max-width:500px;">
            <h6 class="fw-bold">Write a Review</h6>
            <div class="mb-2">
                <select name="rating" class="form-select">
                    <option value="5">★★★★★ Excellent</option>
                    <option value="4">★★★★ Good</option>
                    <option value="3">★★★ Average</option>
                    <option value="2">★★ Poor</option>
                    <option value="1">★ Terrible</option>
                </select>
            </div>
            <div class="mb-2">
                <textarea name="review_text" class="form-control" rows="3" placeholder="Share your experience…"></textarea>
            </div>
            <button type="submit" class="btn btn-shop-primary btn-sm">Submit Review</button>
        </form>
        <?php else: ?>
        <p class="mt-3"><a href="/shop/login.php">Login</a> to write a review.</p>
        <?php endif; ?>
    </div>

    <?php if (!empty($related)): ?>
    <h4 class="fw-bold mb-3">You May Also Like</h4>
    <div class="product-grid">
        <?php foreach ($related as $rp) { renderCmartProductCard($rp); } ?>
    </div>
    <?php endif; ?>
</div>

<script>
function stepQty(delta) {
    const input = document.getElementById('qtyInput');
    input.value = Math.max(1, parseInt(input.value || 1) + delta);
}

// Gallery: click a thumbnail to swap the main image
function setMainImage(src, thumbEl) {
    document.getElementById('mainProductImage').src = src;
    document.querySelectorAll('.gallery-slide-thumb').forEach(t => t.style.borderColor = 'var(--gray-200)');
    thumbEl.style.borderColor = 'var(--primary)';
}

// Gallery: swipe left/right on the main image to move through photos (mobile)
(function () {
    const box = document.getElementById('mainImageBox');
    const thumbs = document.querySelectorAll('.gallery-slide-thumb');
    if (!box || thumbs.length < 2) return;

    let startX = 0;
    box.addEventListener('touchstart', e => { startX = e.changedTouches[0].screenX; }, { passive: true });
    box.addEventListener('touchend', e => {
        const delta = e.changedTouches[0].screenX - startX;
        if (Math.abs(delta) < 40) return;

        let idx = Array.from(thumbs).findIndex(t => t.querySelector('img').src === document.getElementById('mainProductImage').src);
        if (idx === -1) idx = 0;
        idx = delta < 0 ? Math.min(idx + 1, thumbs.length - 1) : Math.max(idx - 1, 0);

        const target = thumbs[idx];
        setMainImage(target.querySelector('img').src, target);
    }, { passive: true });
})();
</script>

<?php include __DIR__ . '/includes/shop-footer.php'; ?>
