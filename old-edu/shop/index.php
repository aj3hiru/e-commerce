<?php
define('DROOT_PATH', $_SERVER['DOCUMENT_ROOT']);
require_once DROOT_PATH . '/includes/config.php';
require_once DROOT_PATH . '/includes/functions.php';

$page_title = 'Shop';
include __DIR__ . '/includes/shop-header.php';
include __DIR__ . '/includes/product-card.php';

$q = trim($_GET['q'] ?? '');

$where = "WHERE status = 'active'";
$params = [];
if ($q !== '') {
    $where .= " AND name LIKE ?";
    $params[] = "%$q%";
}

$stmt = $pdo->prepare("SELECT * FROM ecom_products $where ORDER BY created_at DESC LIMIT 40");
$stmt->execute($params);
$products = $stmt->fetchAll(PDO::FETCH_ASSOC);

$wishlisted_ids = [];
if ($shop_customer) {
    $w = $pdo->prepare("SELECT product_id FROM ecom_wishlist WHERE customer_id = ?");
    $w->execute([$shop_customer['id']]);
    $wishlisted_ids = array_column($w->fetchAll(PDO::FETCH_ASSOC), 'product_id');
}
?>

<?php if ($q === ''): ?>
<div style="background: linear-gradient(135deg, var(--primary), var(--primary-dark)); color:#fff;">
    <div class="shop-container text-center py-5">
        <h1 class="fw-bold mb-2">Shop the best deals, delivered to your door</h1>
        <p class="mb-0" style="opacity:.9;">Browse our full catalog — in-store pickup and local delivery both available.</p>
    </div>
</div>
<?php endif; ?>

<div class="shop-container">

    <?php if ($q === ''): ?>
    <div class="mb-4">
        <?php foreach ($shop_categories as $cat): ?>
        <a href="/shop/category.php?slug=<?= urlencode($cat['slug']) ?>" class="cat-chip"><?= htmlspecialchars($cat['name']) ?></a>
        <?php endforeach; ?>
    </div>
    <?php endif; ?>

    <h2 class="section-title"><?= $q !== '' ? 'Search results for "' . htmlspecialchars($q) . '"' : 'All Products' ?></h2>

    <?php if (empty($products)): ?>
        <div class="text-center py-5 text-muted">
            <i class="fas fa-box-open fa-3x mb-3"></i>
            <p>No products found<?= $q !== '' ? ' for your search.' : ' yet — check back soon!' ?></p>
        </div>
    <?php else: ?>
    <div class="row">
        <?php foreach ($products as $p) { renderProductCard($p, $wishlisted_ids); } ?>
    </div>
    <?php endif; ?>

</div>

<?php include __DIR__ . '/includes/shop-footer.php'; ?>
