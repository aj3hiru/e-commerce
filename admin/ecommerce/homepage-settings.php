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
if (!$user || $user['status'] !== 'active' || empty($permissions['ecommerce']['manage_payment'])) {
    exit('Access Denied');
}
$username = $_SESSION['username'];

define('HOME_UPLOAD_URL', 'uploads/ecommerce/homepage/');
define('HOME_UPLOAD_ABS', DROOT_PATH . '/uploads/ecommerce/homepage/');
if (!file_exists(HOME_UPLOAD_ABS)) mkdir(HOME_UPLOAD_ABS, 0777, true);

function saveUpload($field, $prefix) {
    if (!isset($_FILES[$field]) || $_FILES[$field]['error'] !== UPLOAD_ERR_OK) return null;
    $ext = strtolower(pathinfo($_FILES[$field]['name'], PATHINFO_EXTENSION));
    $filename = $prefix . '-' . uniqid() . '.' . $ext;
    if (move_uploaded_file($_FILES[$field]['tmp_name'], HOME_UPLOAD_ABS . $filename)) {
        return HOME_UPLOAD_URL . $filename;
    }
    return null;
}

$notifications = [];
$action = $_POST['action'] ?? '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // ── SLIDES ──────────────────────────────────────────────────────────────
    if ($action === 'add_slide') {
        $image = saveUpload('image', 'slide');
        if (!$image) {
            $notifications[] = ['type' => 'error', 'message' => 'Please choose an image for the slide.'];
        } else {
            $max = (int) $pdo->query("SELECT COALESCE(MAX(sort_order),0) FROM ecom_home_slides")->fetchColumn();
            $pdo->prepare("INSERT INTO ecom_home_slides (image, button_link, sort_order) VALUES (?,?,?)")
                ->execute([$image, trim($_POST['button_link'] ?? '#') ?: '#', $max + 1]);
            $notifications[] = ['type' => 'success', 'message' => 'Slide added.'];
        }
    } elseif ($action === 'edit_slide') {
        $id = (int)$_POST['id'];
        $newImage = saveUpload('image', 'slide');
        if ($newImage) {
            $pdo->prepare("UPDATE ecom_home_slides SET image = ?, button_link = ? WHERE id = ?")->execute([$newImage, trim($_POST['button_link'] ?? '#') ?: '#', $id]);
        } else {
            $pdo->prepare("UPDATE ecom_home_slides SET button_link = ? WHERE id = ?")->execute([trim($_POST['button_link'] ?? '#') ?: '#', $id]);
        }
        $notifications[] = ['type' => 'success', 'message' => 'Slide updated.'];
    } elseif ($action === 'delete_slide') {
        $pdo->prepare("DELETE FROM ecom_home_slides WHERE id = ?")->execute([(int)$_POST['id']]);
        $notifications[] = ['type' => 'success', 'message' => 'Slide removed.'];
    } elseif ($action === 'toggle_slide') {
        $pdo->prepare("UPDATE ecom_home_slides SET status = IF(status='active','inactive','active') WHERE id = ?")->execute([(int)$_POST['id']]);
    } elseif ($action === 'move_slide') {
        moveItem($pdo, 'ecom_home_slides', (int)$_POST['id'], $_POST['direction']);
    }

    // ── ICON STRIP ──────────────────────────────────────────────────────────
    elseif ($action === 'add_strip_category') {
        $cat_id = (int)($_POST['category_id'] ?? 0);
        if ($cat_id <= 0) {
            $notifications[] = ['type' => 'error', 'message' => 'Please choose a category.'];
        } else {
            $exists = $pdo->prepare("SELECT id FROM ecom_home_category_strip WHERE category_id = ?");
            $exists->execute([$cat_id]);
            if ($exists->fetch()) {
                $notifications[] = ['type' => 'error', 'message' => 'That category is already in the strip.'];
            } else {
                $max = (int) $pdo->query("SELECT COALESCE(MAX(sort_order),0) FROM ecom_home_category_strip")->fetchColumn();
                $pdo->prepare("INSERT INTO ecom_home_category_strip (category_id, sort_order) VALUES (?,?)")->execute([$cat_id, $max + 1]);
                $notifications[] = ['type' => 'success', 'message' => 'Category pinned to the strip.'];
            }
        }
    } elseif ($action === 'delete_strip_category') {
        $pdo->prepare("DELETE FROM ecom_home_category_strip WHERE id = ?")->execute([(int)$_POST['id']]);
        $notifications[] = ['type' => 'success', 'message' => 'Removed from the strip.'];
    } elseif ($action === 'move_strip_category') {
        moveItem($pdo, 'ecom_home_category_strip', (int)$_POST['id'], $_POST['direction']);
    } elseif ($action === 'save_strip_settings') {
        $mode = in_array($_POST['strip_mode'] ?? '', ['pinned', 'all'], true) ? $_POST['strip_mode'] : 'pinned';
        $count = max(1, min(30, (int)($_POST['strip_count'] ?? 10)));
        $pdo->prepare("INSERT INTO ecom_home_settings (setting_key, setting_value) VALUES ('category_strip_mode', ?) ON DUPLICATE KEY UPDATE setting_value = ?")->execute([$mode, $mode]);
        $pdo->prepare("INSERT INTO ecom_home_settings (setting_key, setting_value) VALUES ('category_strip_count', ?) ON DUPLICATE KEY UPDATE setting_value = ?")->execute([$count, $count]);
        $notifications[] = ['type' => 'success', 'message' => 'Category strip settings saved.'];
    }

    // ── SECTIONS ────────────────────────────────────────────────────────────
    elseif ($action === 'add_section') {
        $type = in_array($_POST['section_type'] ?? '', ['category_row', 'product_grid', 'festive_banner', 'manual_products'], true) ? $_POST['section_type'] : 'category_row';
        $source_type = in_array($_POST['source_type'] ?? '', ['manual', 'category', 'latest'], true) ? $_POST['source_type'] : 'latest';
        $card_design = in_array($_POST['card_design'] ?? '', ['design1', 'design2', 'design3', 'design4'], true) ? $_POST['card_design'] : 'design1';
        $banner_image = $type === 'festive_banner' ? saveUpload('banner_image', 'banner') : null;
        $max = (int) $pdo->query("SELECT COALESCE(MAX(sort_order),0) FROM ecom_home_sections")->fetchColumn();
        $pdo->prepare("INSERT INTO ecom_home_sections (section_type, title, category_id, source_type, card_design, product_limit, banner_text, banner_image, dismissible, sort_order) VALUES (?,?,?,?,?,?,?,?,?,?)")
            ->execute([
                $type,
                trim($_POST['title'] ?? ''),
                !empty($_POST['category_id']) ? (int)$_POST['category_id'] : null,
                $source_type,
                $card_design,
                (int)($_POST['product_limit'] ?? 10) ?: 10,
                trim($_POST['banner_text'] ?? ''),
                $banner_image,
                isset($_POST['dismissible']) ? 1 : 0,
                $max + 1,
            ]);
        $notifications[] = ['type' => 'success', 'message' => 'Section added.'];
    } elseif ($action === 'delete_section') {
        $pdo->prepare("DELETE FROM ecom_home_sections WHERE id = ?")->execute([(int)$_POST['id']]);
        $notifications[] = ['type' => 'success', 'message' => 'Section removed.'];
    } elseif ($action === 'toggle_section') {
        $pdo->prepare("UPDATE ecom_home_sections SET status = IF(status='active','inactive','active') WHERE id = ?")->execute([(int)$_POST['id']]);
    } elseif ($action === 'move_section') {
        moveItem($pdo, 'ecom_home_sections', (int)$_POST['id'], $_POST['direction']);
    }

    // ── SECTION ITEMS (category or product cards inside a row/manual section) ──
    elseif ($action === 'add_section_item') {
        $section_id = (int)$_POST['section_id'];
        $image = saveUpload('custom_image', 'catcard');
        $max = (int) $pdo->query("SELECT COALESCE(MAX(sort_order),0) FROM ecom_home_section_items WHERE section_id = $section_id")->fetchColumn();
        $pdo->prepare("INSERT INTO ecom_home_section_items (section_id, category_id, product_id, custom_label, custom_image, sort_order) VALUES (?,?,?,?,?,?)")
            ->execute([
                $section_id,
                !empty($_POST['category_id']) ? (int)$_POST['category_id'] : null,
                !empty($_POST['product_id']) ? (int)$_POST['product_id'] : null,
                trim($_POST['custom_label'] ?? ''),
                $image,
                $max + 1,
            ]);
        $notifications[] = ['type' => 'success', 'message' => 'Card added to section.'];
    } elseif ($action === 'delete_section_item') {
        $pdo->prepare("DELETE FROM ecom_home_section_items WHERE id = ?")->execute([(int)$_POST['id']]);
        $notifications[] = ['type' => 'success', 'message' => 'Card removed.'];
    }

    if (!empty($notifications)) {
        $_SESSION['home_cms_flash'] = $notifications;
    }
    header('Location: /admin/ecommerce/homepage-settings.php?tab=' . urlencode($_POST['return_tab'] ?? 'slider'));
    exit;
}

function moveItem($pdo, $table, $id, $direction) {
    $cur = $pdo->prepare("SELECT sort_order FROM $table WHERE id = ?");
    $cur->execute([$id]);
    $curOrder = $cur->fetchColumn();
    if ($curOrder === false) return;

    $op = $direction === 'up' ? '<' : '>';
    $ord = $direction === 'up' ? 'DESC' : 'ASC';
    $swap = $pdo->prepare("SELECT id, sort_order FROM $table WHERE sort_order $op ? ORDER BY sort_order $ord LIMIT 1");
    $swap->execute([$curOrder]);
    $target = $swap->fetch(PDO::FETCH_ASSOC);
    if (!$target) return;

    $pdo->prepare("UPDATE $table SET sort_order = ? WHERE id = ?")->execute([$target['sort_order'], $id]);
    $pdo->prepare("UPDATE $table SET sort_order = ? WHERE id = ?")->execute([$curOrder, $target['id']]);
}

if (!empty($_SESSION['home_cms_flash'])) {
    $notifications = $_SESSION['home_cms_flash'];
    unset($_SESSION['home_cms_flash']);
}

$active_tab = $_GET['tab'] ?? 'slider';

$slides = $pdo->query("SELECT * FROM ecom_home_slides ORDER BY sort_order ASC, id ASC")->fetchAll(PDO::FETCH_ASSOC);
$strip_items = $pdo->query("
    SELECT hcs.id, hcs.sort_order, c.id AS category_id, c.name, c.slug, c.image
    FROM ecom_home_category_strip hcs
    JOIN ecom_categories c ON hcs.category_id = c.id
    ORDER BY hcs.sort_order ASC, hcs.id ASC
")->fetchAll(PDO::FETCH_ASSOC);
$home_settings = [];
foreach ($pdo->query("SELECT * FROM ecom_home_settings") as $row) { $home_settings[$row['setting_key']] = $row['setting_value']; }
$strip_mode = $home_settings['category_strip_mode'] ?? 'pinned';
$strip_count = (int)($home_settings['category_strip_count'] ?? 10);
$sections = $pdo->query("SELECT * FROM ecom_home_sections ORDER BY sort_order ASC, id ASC")->fetchAll(PDO::FETCH_ASSOC);
$categories = $pdo->query("SELECT id, name, slug, image FROM ecom_categories WHERE status='active' ORDER BY name ASC")->fetchAll(PDO::FETCH_ASSOC);
$categories_by_id = [];
foreach ($categories as $c) $categories_by_id[$c['id']] = $c;
$pinned_category_ids = array_column($strip_items, 'category_id');

$section_items_by_section = [];
foreach ($sections as $sec) {
    $si = $pdo->prepare("
        SELECT si.*, p.name AS prod_name, p.image AS prod_image
        FROM ecom_home_section_items si
        LEFT JOIN ecom_products p ON si.product_id = p.id
        WHERE si.section_id = ? ORDER BY si.sort_order ASC, si.id ASC
    ");
    $si->execute([$sec['id']]);
    $section_items_by_section[$sec['id']] = $si->fetchAll(PDO::FETCH_ASSOC);
}

$product_search_list = $pdo->query("SELECT id, name, image FROM ecom_products WHERE status='active' ORDER BY name ASC LIMIT 500")->fetchAll(PDO::FETCH_ASSOC);

$page_title = 'Homepage Settings';
$page_subtitle = 'Manage the slider, category strip, and product sections shown on your storefront homepage';
?>
<!DOCTYPE html>
<html lang="en">
<head>
<?php include __DIR__ . '/components/ecom-head.php'; ?>
<style>
.settings-tabs { display: flex; gap: 0.35rem; background: #fff; border: 1px solid var(--gray-200); border-radius: 0.65rem; padding: 0.4rem; margin-bottom: 1.25rem; overflow-x: auto; }
.settings-tab-btn { display: flex; align-items: center; gap: 0.5rem; white-space: nowrap; padding: 0.55rem 1rem; border-radius: 0.5rem; border: none; background: none; font-size: 0.875rem; font-weight: 600; color: var(--gray-500); cursor: pointer; text-decoration: none; }
.settings-tab-btn:hover { background: var(--gray-50); color: var(--gray-700); }
.settings-tab-btn.active { background: var(--primary); color: #fff; }

.home-item-row { display: flex; gap: 1rem; align-items: center; border: 1px solid var(--gray-200); border-radius: 0.5rem; padding: 0.85rem; margin-bottom: 0.75rem; background: #fff; }
.home-item-thumb { width: 90px; height: 60px; border-radius: 0.4rem; object-fit: cover; background: var(--gray-50); flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; }
.home-item-icon-thumb { width: 52px; height: 52px; border-radius: 0.6rem; object-fit: cover; background: var(--gray-50); flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; }
.home-item-body { flex: 1; min-width: 0; }
.home-item-actions { display: flex; gap: 0.35rem; flex-shrink: 0; }
.home-item-row.inactive { opacity: 0.5; }
.section-type-badge { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; padding: 0.2rem 0.55rem; border-radius: 9999px; }
.section-type-badge.category_row { background: #dbeafe; color: #1e40af; }
.section-type-badge.product_grid { background: #d1fae5; color: #065f46; }
.section-type-badge.festive_banner { background: #fef3c7; color: #92400e; }
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
                <a href="/shop/" target="_blank" class="btn btn-secondary btn-sm"><i class="fas fa-external-link-alt"></i> View Homepage</a>
                <button class="icon-btn dark-mode-toggle" style="background: var(--primary-lighter); color: var(--primary);"><i class="fas fa-moon"></i></button>
                <?php include DROOT_PATH . '/admin/components/header-user.php'; ?>
            </div>
        </header>

        <div class="content-wrapper">

            <?php foreach ($notifications as $n): ?>
            <div class="alert alert-<?= $n['type'] === 'error' ? 'danger' : 'success' ?> alert-dismissible fade show" role="alert">
                <?= htmlspecialchars($n['message']) ?>
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
            <?php endforeach; ?>

            <div class="settings-tabs">
                <a href="?tab=slider" class="settings-tab-btn <?= $active_tab === 'slider' ? 'active' : '' ?>"><i class="fas fa-images"></i> Banner Slider</a>
                <a href="?tab=strip" class="settings-tab-btn <?= $active_tab === 'strip' ? 'active' : '' ?>"><i class="fas fa-th"></i> Category Strip</a>
                <a href="?tab=sections" class="settings-tab-btn <?= $active_tab === 'sections' ? 'active' : '' ?>"><i class="fas fa-layer-group"></i> Homepage Sections</a>
            </div>

            <?php if ($active_tab === 'slider'): ?>
            <!-- ══════════════ SLIDER TAB ══════════════ -->
            <div class="row">
                <div class="col-lg-5">
                    <div class="gd-card">
                        <div class="gd-card-body">
                            <h5 class="mb-3"><i class="fas fa-plus-circle text-primary"></i> Add a Slide</h5>
                            <form method="POST" enctype="multipart/form-data">
                                <input type="hidden" name="action" value="add_slide">
                                <input type="hidden" name="return_tab" value="slider">
                                <div class="mb-3">
                                    <label class="form-label">Banner Image <span class="text-danger">*</span></label>
                                    <input type="file" name="image" class="form-control" accept="image/*" required>
                                    <div class="form-text">The image itself is the whole banner — no text is added on top. The slider sizes itself to match your image, so export it at the width/height you want shown.</div>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Click-through Link</label>
                                    <input type="text" name="button_link" class="form-control" placeholder="/shop/category.php?slug=... or leave blank">
                                </div>
                                <button type="submit" class="btn btn-primary w-100"><i class="fas fa-save"></i> Add Slide</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="col-lg-7">
                    <h5 class="mb-3">Current Slides (<?= count($slides) ?>)</h5>
                    <?php if (empty($slides)): ?>
                        <p class="text-muted">No slides yet — add your first one on the left.</p>
                    <?php endif; ?>
                    <?php foreach ($slides as $i => $sl): ?>
                    <div class="home-item-row <?= $sl['status'] !== 'active' ? 'inactive' : '' ?>">
                        <img src="/<?= htmlspecialchars($sl['image']) ?>" class="home-item-thumb">
                        <div class="home-item-body">
                            <strong>Slide <?= $i + 1 ?></strong>
                            <div class="text-muted small text-truncate"><?= htmlspecialchars($sl['button_link'] ?: 'No link set') ?></div>
                        </div>
                        <div class="home-item-actions">
                            <button type="button" class="btn btn-sm btn-outline-primary" onclick="openEditSlide(<?= $sl['id'] ?>, '<?= htmlspecialchars(addslashes($sl['button_link'] ?? '')) ?>', '/<?= htmlspecialchars($sl['image']) ?>')"><i class="fas fa-pen"></i></button>
                            <form method="POST" style="display:inline;"><input type="hidden" name="action" value="move_slide"><input type="hidden" name="id" value="<?= $sl['id'] ?>"><input type="hidden" name="direction" value="up"><input type="hidden" name="return_tab" value="slider"><button class="btn btn-sm btn-outline-secondary" <?= $i === 0 ? 'disabled' : '' ?>><i class="fas fa-arrow-up"></i></button></form>
                            <form method="POST" style="display:inline;"><input type="hidden" name="action" value="move_slide"><input type="hidden" name="id" value="<?= $sl['id'] ?>"><input type="hidden" name="direction" value="down"><input type="hidden" name="return_tab" value="slider"><button class="btn btn-sm btn-outline-secondary" <?= $i === count($slides) - 1 ? 'disabled' : '' ?>><i class="fas fa-arrow-down"></i></button></form>
                            <form method="POST" style="display:inline;"><input type="hidden" name="action" value="toggle_slide"><input type="hidden" name="id" value="<?= $sl['id'] ?>"><input type="hidden" name="return_tab" value="slider"><button class="btn btn-sm btn-outline-secondary"><i class="fas fa-<?= $sl['status'] === 'active' ? 'eye' : 'eye-slash' ?>"></i></button></form>
                            <form method="POST" style="display:inline;" onsubmit="return confirm('Delete this slide?');"><input type="hidden" name="action" value="delete_slide"><input type="hidden" name="id" value="<?= $sl['id'] ?>"><input type="hidden" name="return_tab" value="slider"><button class="btn btn-sm btn-outline-danger"><i class="fas fa-trash-alt"></i></button></form>
                        </div>
                    </div>
                    <?php endforeach; ?>
                </div>
            </div>

            <?php elseif ($active_tab === 'strip'): ?>
            <!-- ══════════════ CATEGORY STRIP TAB ══════════════ -->
            <div class="gd-card">
                <div class="gd-card-body">
                    <h5 class="mb-3"><i class="fas fa-sliders-h text-primary"></i> Strip Mode</h5>
                    <form method="POST" class="row g-3 align-items-end">
                        <input type="hidden" name="action" value="save_strip_settings">
                        <input type="hidden" name="return_tab" value="strip">
                        <div class="col-md-5">
                            <label class="form-label">How should the strip be filled?</label>
                            <select name="strip_mode" class="form-select" onchange="document.getElementById('stripCountWrap').style.display = this.value==='all' ? 'block' : 'none';">
                                <option value="pinned" <?= $strip_mode === 'pinned' ? 'selected' : '' ?>>Use my pinned list below</option>
                                <option value="all" <?= $strip_mode === 'all' ? 'selected' : '' ?>>Show every category automatically</option>
                            </select>
                        </div>
                        <div class="col-md-3" id="stripCountWrap" style="<?= $strip_mode === 'all' ? '' : 'display:none;' ?>">
                            <label class="form-label">How many to show</label>
                            <input type="number" name="strip_count" class="form-control" value="<?= $strip_count ?>" min="1" max="30">
                        </div>
                        <div class="col-md-3">
                            <button type="submit" class="btn btn-primary"><i class="fas fa-save"></i> Save</button>
                        </div>
                    </form>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-5">
                    <div class="gd-card">
                        <div class="gd-card-body">
                            <h5 class="mb-3"><i class="fas fa-thumbtack text-primary"></i> Pin a Category</h5>
                            <form method="POST">
                                <input type="hidden" name="action" value="add_strip_category">
                                <input type="hidden" name="return_tab" value="strip">
                                <div class="mb-3">
                                    <label class="form-label">Category</label>
                                    <select name="category_id" class="form-select" required>
                                        <option value="">— Choose —</option>
                                        <?php foreach ($categories as $c): if (in_array($c['id'], $pinned_category_ids, true)) continue; ?>
                                        <option value="<?= $c['id'] ?>"><?= htmlspecialchars($c['name']) ?></option>
                                        <?php endforeach; ?>
                                    </select>
                                </div>
                                <button type="submit" class="btn btn-primary w-100"><i class="fas fa-plus"></i> Pin to Strip</button>
                            </form>
                            <div class="form-text mt-2">Pinned categories always appear first, in this order. This list is used when Strip Mode is set to "pinned list".</div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-7">
                    <h5 class="mb-3">Pinned Categories (<?= count($strip_items) ?>)</h5>
                    <?php if (empty($strip_items)): ?>
                        <p class="text-muted">Nothing pinned yet — add one on the left, or switch Strip Mode to "show every category".</p>
                    <?php endif; ?>
                    <?php foreach ($strip_items as $i => $sc): ?>
                    <div class="home-item-row">
                        <?php if (!empty($sc['image'])): ?>
                            <img src="/<?= htmlspecialchars($sc['image']) ?>" class="home-item-icon-thumb">
                        <?php else: ?>
                            <div class="home-item-icon-thumb">🛒</div>
                        <?php endif; ?>
                        <div class="home-item-body">
                            <strong><?= htmlspecialchars($sc['name']) ?></strong>
                        </div>
                        <div class="home-item-actions">
                            <form method="POST" style="display:inline;"><input type="hidden" name="action" value="move_strip_category"><input type="hidden" name="id" value="<?= $sc['id'] ?>"><input type="hidden" name="direction" value="up"><input type="hidden" name="return_tab" value="strip"><button class="btn btn-sm btn-outline-secondary" <?= $i === 0 ? 'disabled' : '' ?>><i class="fas fa-arrow-up"></i></button></form>
                            <form method="POST" style="display:inline;"><input type="hidden" name="action" value="move_strip_category"><input type="hidden" name="id" value="<?= $sc['id'] ?>"><input type="hidden" name="direction" value="down"><input type="hidden" name="return_tab" value="strip"><button class="btn btn-sm btn-outline-secondary" <?= $i === count($strip_items) - 1 ? 'disabled' : '' ?>><i class="fas fa-arrow-down"></i></button></form>
                            <form method="POST" style="display:inline;" onsubmit="return confirm('Unpin this category?');"><input type="hidden" name="action" value="delete_strip_category"><input type="hidden" name="id" value="<?= $sc['id'] ?>"><input type="hidden" name="return_tab" value="strip"><button class="btn btn-sm btn-outline-danger"><i class="fas fa-trash-alt"></i></button></form>
                        </div>
                    </div>
                    <?php endforeach; ?>
                </div>
            </div>

            <?php else: ?>
            <!-- ══════════════ SECTIONS TAB ══════════════ -->
            <div class="row">
                <div class="col-lg-5">
                    <div class="gd-card">
                        <div class="gd-card-body">
                            <h5 class="mb-3"><i class="fas fa-plus-circle text-primary"></i> Add a Section</h5>
                            <form method="POST" enctype="multipart/form-data">
                                <input type="hidden" name="action" value="add_section">
                                <input type="hidden" name="return_tab" value="sections">
                                <div class="mb-3">
                                    <label class="form-label">Section Type</label>
                                    <select name="section_type" class="form-select" id="newSectionType" onchange="toggleSectionFields()">
                                        <option value="manual_products">Product Picks Row (small cards, like "Fresh Items" — you choose the products)</option>
                                        <option value="category_row">Category Row (small cards, like "Snacks &amp; Drinks" — categories)</option>
                                        <option value="product_grid">Product Grid (full cards with Add to Cart, like "Popular Products")</option>
                                        <option value="festive_banner">Banner Strip (image or text, like "Festive Celebrations")</option>
                                    </select>
                                </div>

                                <div class="mb-3" id="fieldTitle">
                                    <label class="form-label">Section Title</label>
                                    <input type="text" name="title" class="form-control" placeholder="e.g. Fresh Items">
                                </div>

                                <div class="mb-3" id="fieldCategoryRowSource" style="display:none;">
                                    <label class="form-label">Categories to Show</label>
                                    <select name="source_type" class="form-select">
                                        <option value="manual">I'll pick them myself below</option>
                                        <option value="category">Show every category automatically</option>
                                    </select>
                                    <div class="form-text">Pick "manual" to hand-pick a few, or auto-show all categories in this row.</div>
                                </div>

                                <div class="mb-3" id="fieldGridSource" style="display:none;">
                                    <label class="form-label">Products to Show</label>
                                    <select name="source_type" id="gridSourceType" class="form-select" onchange="toggleGridSourceFields()">
                                        <option value="manual">I'll pick specific products myself below</option>
                                        <option value="category">Pull from one category</option>
                                        <option value="latest">Just show the latest products</option>
                                    </select>
                                </div>
                                <div class="mb-3" id="fieldCategory" style="display:none;">
                                    <label class="form-label">Category</label>
                                    <select name="category_id" class="form-select">
                                        <option value="">— Choose —</option>
                                        <?php foreach ($categories as $c): ?>
                                        <option value="<?= $c['id'] ?>"><?= htmlspecialchars($c['name']) ?></option>
                                        <?php endforeach; ?>
                                    </select>
                                </div>
                                <div class="mb-3" id="fieldLimit" style="display:none;">
                                    <label class="form-label">How Many to Show</label>
                                    <input type="number" name="product_limit" class="form-control" value="10" min="2" max="30">
                                </div>
                                <div class="mb-3" id="fieldDesign" style="display:none;">
                                    <label class="form-label">Card Design</label>
                                    <select name="card_design" class="form-select">
                                        <option value="design1">Design 1 — Clean Minimal</option>
                                        <option value="design2">Design 2 — Ribbon Discount Badge</option>
                                        <option value="design3">Design 3 — Two-tone (Shaded Action Strip)</option>
                                        <option value="design4">Design 4 — Compact Chip Style</option>
                                    </select>
                                </div>

                                <div id="fieldBannerGroup" style="display:none;">
                                    <div class="mb-3">
                                        <label class="form-label">Banner Image <small class="text-muted">(optional — leave blank for a plain text banner)</small></label>
                                        <input type="file" name="banner_image" class="form-control" accept="image/*">
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Banner Text <small class="text-muted">(shown if no image, or used as the click-through link if an image is uploaded)</small></label>
                                        <input type="text" name="banner_text" class="form-control" placeholder="e.g. FESTIVE CELEBRATIONS or a link">
                                    </div>
                                    <div class="form-check mb-3">
                                        <input class="form-check-input" type="checkbox" name="dismissible" id="dismissibleCheck" checked>
                                        <label class="form-check-label" for="dismissibleCheck">Let customers dismiss this banner (✕ button)</label>
                                    </div>
                                </div>

                                <button type="submit" class="btn btn-primary w-100"><i class="fas fa-save"></i> Add Section</button>
                            </form>
                        </div>
                    </div>
                </div>

                <div class="col-lg-7">
                    <h5 class="mb-3">Homepage Sections, In Order (<?= count($sections) ?>)</h5>
                    <?php if (empty($sections)): ?>
                        <p class="text-muted">No sections yet — add your first one on the left. Sections appear on the homepage in this order, below the slider and icon strip.</p>
                    <?php endif; ?>
                    <?php foreach ($sections as $i => $sec): ?>
                    <div class="gd-card <?= $sec['status'] !== 'active' ? 'home-item-row inactive' : '' ?>" style="margin-bottom:1rem;">
                        <div class="gd-card-body">
                            <div class="d-flex justify-content-between align-items-start mb-2">
                                <div>
                                    <span class="section-type-badge <?= $sec['section_type'] ?>"><?= str_replace('_', ' ', $sec['section_type']) ?></span>
                                    <strong class="ms-2"><?= htmlspecialchars($sec['title'] ?: $sec['banner_text'] ?: '(untitled)') ?></strong>
                                    <?php if ($sec['section_type'] === 'product_grid'): ?>
                                        <div class="text-muted small mt-1">
                                            Design: <?= $sec['card_design'] ?>
                                            · Source: <?= $sec['source_type'] === 'category' ? htmlspecialchars($categories_by_id[$sec['category_id']]['name'] ?? 'Unknown category') : ($sec['source_type'] === 'manual' ? 'Hand-picked' : 'Latest products') ?>
                                            <?php if ($sec['source_type'] !== 'manual'): ?>· Showing <?= (int)$sec['product_limit'] ?><?php endif; ?>
                                        </div>
                                    <?php elseif ($sec['section_type'] === 'category_row'): ?>
                                        <div class="text-muted small mt-1">Source: <?= $sec['source_type'] === 'category' ? 'All categories' : 'Hand-picked' ?></div>
                                    <?php endif; ?>
                                </div>
                                <div class="home-item-actions">
                                    <form method="POST" style="display:inline;"><input type="hidden" name="action" value="move_section"><input type="hidden" name="id" value="<?= $sec['id'] ?>"><input type="hidden" name="direction" value="up"><input type="hidden" name="return_tab" value="sections"><button class="btn btn-sm btn-outline-secondary" <?= $i === 0 ? 'disabled' : '' ?>><i class="fas fa-arrow-up"></i></button></form>
                                    <form method="POST" style="display:inline;"><input type="hidden" name="action" value="move_section"><input type="hidden" name="id" value="<?= $sec['id'] ?>"><input type="hidden" name="direction" value="down"><input type="hidden" name="return_tab" value="sections"><button class="btn btn-sm btn-outline-secondary" <?= $i === count($sections) - 1 ? 'disabled' : '' ?>><i class="fas fa-arrow-down"></i></button></form>
                                    <form method="POST" style="display:inline;"><input type="hidden" name="action" value="toggle_section"><input type="hidden" name="id" value="<?= $sec['id'] ?>"><input type="hidden" name="return_tab" value="sections"><button class="btn btn-sm btn-outline-secondary"><i class="fas fa-<?= $sec['status'] === 'active' ? 'eye' : 'eye-slash' ?>"></i></button></form>
                                    <form method="POST" style="display:inline;" onsubmit="return confirm('Delete this section?');"><input type="hidden" name="action" value="delete_section"><input type="hidden" name="id" value="<?= $sec['id'] ?>"><input type="hidden" name="return_tab" value="sections"><button class="btn btn-sm btn-outline-danger"><i class="fas fa-trash-alt"></i></button></form>
                                </div>
                            </div>

                            <?php
                            $items = $section_items_by_section[$sec['id']] ?? [];
                            $needs_category_picker = $sec['section_type'] === 'category_row' && $sec['source_type'] !== 'category';
                            $needs_product_picker = $sec['section_type'] === 'manual_products' || ($sec['section_type'] === 'product_grid' && $sec['source_type'] === 'manual');
                            ?>
                            <?php if ($needs_category_picker || $needs_product_picker): ?>
                            <hr>
                            <div class="d-flex flex-wrap gap-2 mb-2">
                                <?php foreach ($items as $it): ?>
                                <div class="d-flex align-items-center gap-1 border rounded px-2 py-1">
                                    <span class="small"><?= htmlspecialchars($it['custom_label'] ?: ($it['prod_name'] ?? ($categories_by_id[$it['category_id']]['name'] ?? '?'))) ?></span>
                                    <form method="POST" style="display:inline;" onsubmit="return confirm('Remove this card?');">
                                        <input type="hidden" name="action" value="delete_section_item">
                                        <input type="hidden" name="id" value="<?= $it['id'] ?>">
                                        <input type="hidden" name="return_tab" value="sections">
                                        <button class="btn btn-sm btn-link text-danger p-0 ms-1"><i class="fas fa-times"></i></button>
                                    </form>
                                </div>
                                <?php endforeach; ?>
                                <?php if (empty($items)): ?><span class="text-muted small">No cards yet.</span><?php endif; ?>
                            </div>
                            <form method="POST" class="d-flex gap-2">
                                <input type="hidden" name="action" value="add_section_item">
                                <input type="hidden" name="section_id" value="<?= $sec['id'] ?>">
                                <input type="hidden" name="return_tab" value="sections">
                                <?php if ($needs_product_picker): ?>
                                <select name="product_id" class="form-select form-select-sm">
                                    <option value="">— Pick a product —</option>
                                    <?php foreach ($product_search_list as $p): ?>
                                    <option value="<?= $p['id'] ?>"><?= htmlspecialchars($p['name']) ?></option>
                                    <?php endforeach; ?>
                                </select>
                                <?php else: ?>
                                <select name="category_id" class="form-select form-select-sm">
                                    <option value="">— Pick a category —</option>
                                    <?php foreach ($categories as $c): ?>
                                    <option value="<?= $c['id'] ?>"><?= htmlspecialchars($c['name']) ?></option>
                                    <?php endforeach; ?>
                                </select>
                                <input type="text" name="custom_label" class="form-control form-control-sm" placeholder="Or type a custom label">
                                <?php endif; ?>
                                <button type="submit" class="btn btn-sm btn-outline-primary flex-shrink-0"><i class="fas fa-plus"></i> Add</button>
                            </form>
                            <?php endif; ?>
                        </div>
                    </div>
                    <?php endforeach; ?>
                </div>
            </div>
            <?php endif; ?>

        </div>
    </main>
</div>

<!-- Edit Slide Modal -->
<div class="modal fade" id="editSlideModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <form method="POST" enctype="multipart/form-data">
                <div class="modal-header">
                    <h5 class="modal-title">Edit Slide</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <input type="hidden" name="action" value="edit_slide">
                    <input type="hidden" name="return_tab" value="slider">
                    <input type="hidden" name="id" id="editSlideId">
                    <div class="mb-3 text-center">
                        <img id="editSlidePreview" src="" style="max-width:100%; border-radius:0.5rem;">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Replace Image <small class="text-muted">(optional — leave blank to keep current)</small></label>
                        <input type="file" name="image" class="form-control" accept="image/*">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Click-through Link</label>
                        <input type="text" name="button_link" id="editSlideLink" class="form-control">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="submit" class="btn btn-primary">Save Changes</button>
                </div>
            </form>
        </div>
    </div>
</div>

<?php include_once ADMIN_PATH . '/components/admin_footer.php'; ?>
<?php include __DIR__ . '/components/ecom-scripts.php'; ?>
<script>
function openEditSlide(id, link, imageSrc) {
    document.getElementById('editSlideId').value = id;
    document.getElementById('editSlideLink').value = link;
    document.getElementById('editSlidePreview').src = imageSrc;
    new bootstrap.Modal(document.getElementById('editSlideModal')).show();
}

function toggleSectionFields() {
    const type = document.getElementById('newSectionType').value;
    document.getElementById('fieldCategoryRowSource').style.display = type === 'category_row' ? 'block' : 'none';
    document.getElementById('fieldGridSource').style.display = type === 'product_grid' ? 'block' : 'none';
    document.getElementById('fieldDesign').style.display = type === 'product_grid' ? 'block' : 'none';
    document.getElementById('fieldBannerGroup').style.display = type === 'festive_banner' ? 'block' : 'none';
    document.getElementById('fieldTitle').style.display = type === 'festive_banner' ? 'none' : 'block';

    if (type === 'product_grid') {
        toggleGridSourceFields();
    } else if (type === 'category_row') {
        document.getElementById('fieldCategory').style.display = 'none';
        document.getElementById('fieldLimit').style.display = 'block';
    } else {
        document.getElementById('fieldCategory').style.display = 'none';
        document.getElementById('fieldLimit').style.display = 'none';
    }
}

function toggleGridSourceFields() {
    const source = document.getElementById('gridSourceType').value;
    document.getElementById('fieldCategory').style.display = source === 'category' ? 'block' : 'none';
    document.getElementById('fieldLimit').style.display = source === 'manual' ? 'none' : 'block';
}
toggleSectionFields();
</script>
</body>
</html>
