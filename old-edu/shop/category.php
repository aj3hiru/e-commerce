<?php
define('DROOT_PATH', $_SERVER['DOCUMENT_ROOT']);
require_once DROOT_PATH . '/includes/config.php';
require_once DROOT_PATH . '/includes/functions.php';

$slug = $_GET['slug'] ?? '';
$stmt = $pdo->prepare("SELECT * FROM ecom_categories WHERE slug = ? AND status = 'active'");
$stmt->execute([$slug]);
$category = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$category) { http_response_code(404); exit('Category not found.'); }

$page_title = $category['name'];
include __DIR__ . '/includes/shop-header.php';
include __DIR__ . '/includes/product-card.php';

$subcats = $pdo->prepare("SELECT id, name, slug FROM ecom_subcategories WHERE category_id = ? AND status = 'active' ORDER BY name ASC");
$subcats->execute([$category['id']]);
$subcats = $subcats->fetchAll(PDO::FETCH_ASSOC);

$sub_slug = $_GET['sub'] ?? '';
$active_subcat_id = null;
if ($sub_slug !== '') {
    foreach ($subcats as $sc) { if ($sc['slug'] === $sub_slug) { $active_subcat_id = $sc['id']; break; } }
}

if ($active_subcat_id) {
    $stmt = $pdo->prepare("SELECT * FROM ecom_products WHERE status='active' AND subcategory_id = ? ORDER BY created_at DESC");
    $stmt->execute([$active_subcat_id]);
} else {
    $stmt = $pdo->prepare("SELECT * FROM ecom_products WHERE status='active' AND category_id = ? ORDER BY created_at DESC");
    $stmt->execute([$category['id']]);
}
$products = $stmt->fetchAll(PDO::FETCH_ASSOC);

$wishlisted_ids = [];
if ($shop_customer) {
    $w = $pdo->prepare("SELECT product_id FROM ecom_wishlist WHERE customer_id = ?");
    $w->execute([$shop_customer['id']]);
    $wishlisted_ids = array_column($w->fetchAll(PDO::FETCH_ASSOC), 'product_id');
}
?>

<div class="shop-container">
    <nav aria-label="breadcrumb" class="mb-3">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/shop/">Home</a></li>
            <li class="breadcrumb-item active"><?= htmlspecialchars($category['name']) ?></li>
        </ol>
    </nav>

    <h2 class="section-title"><?= htmlspecialchars($category['name']) ?></h2>

    <?php if (!empty($subcats)): ?>
    <div class="mb-4">
        <a href="/shop/category.php?slug=<?= urlencode($slug) ?>" class="cat-chip<?= !$active_subcat_id ? ' active' : '' ?>">All</a>
        <?php foreach ($subcats as $sc): ?>
        <a href="/shop/category.php?slug=<?= urlencode($slug) ?>&sub=<?= urlencode($sc['slug']) ?>" class="cat-chip<?= $active_subcat_id === $sc['id'] ? ' active' : '' ?>"><?= htmlspecialchars($sc['name']) ?></a>
        <?php endforeach; ?>
    </div>
    <?php endif; ?>

    <?php if (empty($products)): ?>
        <div class="text-center py-5 text-muted">
            <i class="fas fa-box-open fa-3x mb-3"></i>
            <p>No products in this category yet.</p>
        </div>
    <?php else: ?>
    <div class="row">
        <?php foreach ($products as $p) { renderProductCard($p, $wishlisted_ids); } ?>
    </div>
    <?php endif; ?>
</div>

<?php include __DIR__ . '/includes/shop-footer.php'; ?>
