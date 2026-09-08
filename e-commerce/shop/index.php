<?php
define('DROOT_PATH', $_SERVER['DOCUMENT_ROOT']);
require_once DROOT_PATH . '/includes/config.php';
require_once DROOT_PATH . '/includes/functions.php';

$page_title = 'Shop';
include __DIR__ . '/includes/shop-header.php';
include __DIR__ . '/includes/product-card.php';

$q = trim($_GET['q'] ?? '');

// ── Search mode: simple results grid, no homepage sections ──────────────────
if ($q !== '') {
    $stmt = $pdo->prepare("SELECT * FROM ecom_products WHERE status='active' AND name LIKE ? ORDER BY created_at DESC LIMIT 60");
    $stmt->execute(["%$q%"]);
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
    ?>
    <section class="section">
        <h2>Search results for "<?= htmlspecialchars($q) ?>"</h2>
        <?php if (empty($products)): ?>
            <div class="text-center py-5" style="color:var(--muted);">
                <i class="fas fa-box-open fa-3x mb-3"></i>
                <p>No products found for your search.</p>
            </div>
        <?php else: ?>
            <div class="product-grid"><?php foreach ($products as $p) { renderCmartProductCard($p); } ?></div>
        <?php endif; ?>
    </section>
    <?php include __DIR__ . '/includes/shop-footer.php'; ?>
    <?php exit; ?>
<?php } ?>

<?php
// ── Homepage: slider ─────────────────────────────────────────────────────────
$slides = $pdo->query("SELECT * FROM ecom_home_slides WHERE status='active' ORDER BY sort_order ASC, id ASC")->fetchAll(PDO::FETCH_ASSOC);

// ── Homepage: category strip (pinned list, or every active category) ────────
$home_settings = [];
foreach ($pdo->query("SELECT * FROM ecom_home_settings") as $row) { $home_settings[$row['setting_key']] = $row['setting_value']; }
$strip_mode = $home_settings['category_strip_mode'] ?? 'pinned';
$strip_count = max(1, (int)($home_settings['category_strip_count'] ?? 10));

if ($strip_mode === 'all') {
    $strip_categories = $pdo->query("SELECT id, name, slug, image FROM ecom_categories WHERE status='active' ORDER BY serial ASC, name ASC LIMIT $strip_count")->fetchAll(PDO::FETCH_ASSOC);
} else {
    $strip_categories = $pdo->query("
        SELECT c.id, c.name, c.slug, c.image
        FROM ecom_home_category_strip hcs
        JOIN ecom_categories c ON hcs.category_id = c.id
        WHERE hcs.status = 'active' AND c.status = 'active'
        ORDER BY hcs.sort_order ASC, hcs.id ASC
    ")->fetchAll(PDO::FETCH_ASSOC);
}
$strip_colors = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'];

// ── Homepage: manually configured sections ───────────────────────────────────
$sections = $pdo->query("SELECT * FROM ecom_home_sections WHERE status='active' ORDER BY sort_order ASC, id ASC")->fetchAll(PDO::FETCH_ASSOC);

$section_items_by_section = [];
$section_ids = array_column($sections, 'id');
if (!empty($section_ids)) {
    $in = implode(',', array_fill(0, count($section_ids), '?'));
    $si = $pdo->prepare("
        SELECT si.*, c.name AS cat_name, c.slug AS cat_slug, c.image AS cat_image,
               p.name AS prod_name, p.slug AS prod_slug, p.image AS prod_image
        FROM ecom_home_section_items si
        LEFT JOIN ecom_categories c ON si.category_id = c.id
        LEFT JOIN ecom_products p ON si.product_id = p.id
        WHERE si.section_id IN ($in)
        ORDER BY si.sort_order ASC, si.id ASC
    ");
    $si->execute($section_ids);
    foreach ($si->fetchAll(PDO::FETCH_ASSOC) as $row) {
        $section_items_by_section[$row['section_id']][] = $row;
    }
}

// Track which categories have already been manually featured via a product_grid
// section, so we don't necessarily need to change auto-listing behaviour — the
// brief asks for every category to get an auto row regardless, so no exclusion here.
?>

<!-- BANNER SLIDER -->
<?php if (!empty($slides)): ?>
<div class="banner-slider" id="bannerSlider">
    <?php foreach ($slides as $i => $sl): ?>
    <div class="slide<?= $i === 0 ? ' active' : '' ?>">
        <a href="<?= htmlspecialchars($sl['button_link'] ?: '#') ?>" class="slide-link">
            <img src="/<?= htmlspecialchars($sl['image']) ?>" alt="Banner">
        </a>
    </div>
    <?php endforeach; ?>
</div>
<?php if (count($slides) > 1): ?>
<div class="slider-dots">
    <?php foreach ($slides as $i => $sl): ?><button class="dot<?= $i === 0 ? ' active' : '' ?>" aria-label="Slide <?= $i + 1 ?>"></button><?php endforeach; ?>
    <span class="counter" id="slideCounter">1/<?= count($slides) ?></span>
</div>
<?php endif; ?>
<?php endif; ?>

<!-- CATEGORY STRIP -->
<?php if (!empty($strip_categories)): ?>
<div class="icon-strip">
    <?php foreach ($strip_categories as $i => $cat): ?>
    <a href="/shop/category.php?slug=<?= urlencode($cat['slug']) ?>" class="strip-item">
        <div class="circle <?= $strip_colors[$i % count($strip_colors)] ?>">
            <?php if (!empty($cat['image'])): ?>
                <img src="/<?= htmlspecialchars($cat['image']) ?>" style="width:100%;height:100%;object-fit:cover;border-radius:14px;">
            <?php else: ?>
                🛒
            <?php endif; ?>
        </div>
        <span><?= htmlspecialchars($cat['name']) ?></span>
    </a>
    <?php endforeach; ?>
</div>
<?php endif; ?>

<?php foreach ($sections as $sec):
    $items = $section_items_by_section[$sec['id']] ?? [];
?>

    <?php if ($sec['section_type'] === 'manual_products'): ?>
        <!-- Hand-picked products, shown as small image+name cards (e.g. "Fresh Items") -->
        <?php if (!empty($sec['title'])): ?><div class="cat-row-title"><?= htmlspecialchars($sec['title']) ?></div><?php endif; ?>
        <?php if (!empty($items)): ?>
        <div class="cat-cards">
            <?php foreach ($items as $it): if (empty($it['product_id'])) continue; ?>
            <a href="/shop/product.php?slug=<?= urlencode($it['prod_slug']) ?>" class="ccard">
                <div class="thumb">
                    <?php if (!empty($it['prod_image'])): ?><img src="/<?= htmlspecialchars($it['prod_image']) ?>" alt="<?= htmlspecialchars($it['prod_name']) ?>"><?php else: ?><span>🛒</span><?php endif; ?>
                </div>
                <p><?= htmlspecialchars($it['prod_name']) ?></p>
            </a>
            <?php endforeach; ?>
        </div>
        <?php endif; ?>

    <?php elseif ($sec['section_type'] === 'category_row'): ?>
        <!-- Hand-picked (or all) categories, shown as small image+name cards (e.g. "Snacks & Drinks") -->
        <?php if (!empty($sec['title'])): ?><div class="cat-row-title"><?= htmlspecialchars($sec['title']) ?></div><?php endif; ?>
        <?php
        if ($sec['source_type'] === 'category' && empty($items)) {
            // "All categories" mode for this row
            $row_cats = $pdo->query("SELECT id, name, slug, image FROM ecom_categories WHERE status='active' ORDER BY name ASC LIMIT " . max(1, (int)$sec['product_limit']))->fetchAll(PDO::FETCH_ASSOC);
        } else {
            $row_cats = [];
        }
        ?>
        <?php if (!empty($items) || !empty($row_cats)): ?>
        <div class="cat-cards">
            <?php foreach ($items as $it): if (empty($it['category_id'])) continue; ?>
            <a href="/shop/category.php?slug=<?= urlencode($it['cat_slug']) ?>" class="ccard">
                <div class="thumb">
                    <?php if (!empty($it['custom_image']) || !empty($it['cat_image'])): ?><img src="/<?= htmlspecialchars($it['custom_image'] ?: $it['cat_image']) ?>" alt="<?= htmlspecialchars($it['custom_label'] ?: $it['cat_name']) ?>"><?php else: ?><span>🛒</span><?php endif; ?>
                </div>
                <p><?= htmlspecialchars($it['custom_label'] ?: $it['cat_name']) ?></p>
            </a>
            <?php endforeach; ?>
            <?php foreach ($row_cats as $c): ?>
            <a href="/shop/category.php?slug=<?= urlencode($c['slug']) ?>" class="ccard">
                <div class="thumb">
                    <?php if (!empty($c['image'])): ?><img src="/<?= htmlspecialchars($c['image']) ?>" alt="<?= htmlspecialchars($c['name']) ?>"><?php else: ?><span>🛒</span><?php endif; ?>
                </div>
                <p><?= htmlspecialchars($c['name']) ?></p>
            </a>
            <?php endforeach; ?>
        </div>
        <?php endif; ?>

    <?php elseif ($sec['section_type'] === 'festive_banner'): ?>
        <!-- Dismissible image or text banner -->
        <div class="festive-banner home-banner-dismissible" data-banner-id="<?= $sec['id'] ?>" id="banner-<?= $sec['id'] ?>">
            <?php if ($sec['dismissible']): ?>
            <button type="button" class="banner-close-btn" onclick="dismissHomeBanner(<?= $sec['id'] ?>)" aria-label="Dismiss">&times;</button>
            <?php endif; ?>
            <?php if (!empty($sec['banner_image'])): ?>
                <a href="<?= htmlspecialchars($sec['banner_text'] ?: '#') ?>"><img src="/<?= htmlspecialchars($sec['banner_image']) ?>" style="width:100%;height:auto;border-radius:12px;display:block;"></a>
            <?php else: ?>
                <span class="leaf left">🌿</span>
                <span class="leaf right">🌿</span>
                <h2><?= htmlspecialchars($sec['banner_text'] ?: $sec['title']) ?></h2>
            <?php endif; ?>
        </div>

    <?php elseif ($sec['section_type'] === 'product_grid'): ?>
        <!-- Real product grid, in one of 4 selectable card designs -->
        <?php
        $limit = max(1, (int)($sec['product_limit'] ?: 10));
        if ($sec['source_type'] === 'manual') {
            $product_ids = array_filter(array_column($items, 'product_id'));
            $grid_products = [];
            if (!empty($product_ids)) {
                $in2 = implode(',', array_fill(0, count($product_ids), '?'));
                $pp = $pdo->prepare("SELECT * FROM ecom_products WHERE id IN ($in2) AND status='active'");
                $pp->execute(array_values($product_ids));
                $by_id = [];
                foreach ($pp->fetchAll(PDO::FETCH_ASSOC) as $row) { $by_id[$row['id']] = $row; }
                foreach ($product_ids as $pid) { if (isset($by_id[$pid])) $grid_products[] = $by_id[$pid]; }
            }
        } elseif ($sec['source_type'] === 'category' && !empty($sec['category_id'])) {
            $pp = $pdo->prepare("SELECT * FROM ecom_products WHERE status='active' AND category_id = ? ORDER BY created_at DESC LIMIT $limit");
            $pp->execute([$sec['category_id']]);
            $grid_products = $pp->fetchAll(PDO::FETCH_ASSOC);
        } else {
            $grid_products = $pdo->query("SELECT * FROM ecom_products WHERE status='active' ORDER BY created_at DESC LIMIT $limit")->fetchAll(PDO::FETCH_ASSOC);
        }
        $design = $sec['card_design'] ?: 'design1';
        $view_more_url = !empty($sec['category_id']) ? '/shop/category.php?slug=' . urlencode($pdo->query("SELECT slug FROM ecom_categories WHERE id = " . (int)$sec['category_id'])->fetchColumn() ?: '') : null;
        ?>
        <?php if (!empty($grid_products)): ?>
        <section class="section">
            <?php if (!empty($sec['title'])): ?><h2><?= htmlspecialchars($sec['title']) ?></h2><?php endif; ?>
            <div class="product-grid">
                <?php foreach ($grid_products as $p) { renderCard2Product($p, $design); } ?>
            </div>
            <?php if ($view_more_url): ?>
            <div class="text-center mt-3"><a href="<?= htmlspecialchars($view_more_url) ?>" class="btn-see-more">View More <i class="fas fa-chevron-right"></i></a></div>
            <?php endif; ?>
        </section>
        <?php endif; ?>
    <?php endif; ?>

<?php endforeach; ?>

<!-- AUTO-GENERATED: one product row per active category (10 desktop / 5 mobile), with View More -->
<?php
$all_categories = $pdo->query("SELECT id, name, slug FROM ecom_categories WHERE status='active' ORDER BY serial ASC, name ASC")->fetchAll(PDO::FETCH_ASSOC);
foreach ($all_categories as $cat):
    $cp = $pdo->prepare("SELECT * FROM ecom_products WHERE status='active' AND category_id = ? ORDER BY created_at DESC LIMIT 10");
    $cp->execute([$cat['id']]);
    $cat_products = $cp->fetchAll(PDO::FETCH_ASSOC);
    if (empty($cat_products)) continue;
?>
<section class="section">
    <h2><?= htmlspecialchars($cat['name']) ?></h2>
    <div class="product-grid auto-cat-grid">
        <?php foreach ($cat_products as $p) { renderCmartProductCard($p); } ?>
    </div>
    <div class="text-center mt-3">
        <a href="/shop/category.php?slug=<?= urlencode($cat['slug']) ?>" class="btn-see-more">View More <i class="fas fa-chevron-right"></i></a>
    </div>
</section>
<?php endforeach; ?>

<?php if (empty($sections) && empty($slides) && empty($all_categories)): ?>
<div class="text-center py-5" style="color:var(--muted);">
    <i class="fas fa-store fa-3x mb-3"></i>
    <p>The homepage hasn't been set up yet. Go to <strong>Admin → Homepage Settings</strong> to add a slider and product sections.</p>
</div>
<?php endif; ?>

<style>
.btn-see-more { display: inline-block; background: #fff; border: 1.5px solid var(--green); color: var(--green-dark); font-weight: 700; font-size: 13px; padding: 10px 26px; border-radius: 30px; text-decoration: none; }
.btn-see-more:hover { background: var(--green-light); }
.home-banner-dismissible { position: relative; }
.banner-close-btn { position: absolute; top: 10px; right: 14px; background: rgba(255,255,255,.8); border: none; width: 30px; height: 30px; border-radius: 50%; font-size: 20px; line-height: 1; color: #8a3b12; cursor: pointer; z-index: 2; }
.banner-close-btn:hover { background: #fff; }
@media (max-width: 640px) {
    .auto-cat-grid > .product-card:nth-child(n+6) { display: none; }
}
</style>

<script>
function dismissHomeBanner(id) {
    const el = document.getElementById('banner-' + id);
    if (el) el.style.display = 'none';
    try {
        const dismissed = JSON.parse(sessionStorage.getItem('dismissedHomeBanners') || '[]');
        dismissed.push(id);
        sessionStorage.setItem('dismissedHomeBanners', JSON.stringify(dismissed));
    } catch (e) {}
}
(function () {
    try {
        const dismissed = JSON.parse(sessionStorage.getItem('dismissedHomeBanners') || '[]');
        dismissed.forEach(id => {
            const el = document.getElementById('banner-' + id);
            if (el) el.style.display = 'none';
        });
    } catch (e) {}
})();
</script>

<?php include __DIR__ . '/includes/shop-footer.php'; ?>
