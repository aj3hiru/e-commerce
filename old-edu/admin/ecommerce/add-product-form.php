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
if (!$user || $user['status'] !== 'active' || empty($permissions['ecommerce']['manage_products'])) {
    exit('Access Denied');
}
$username = $_SESSION['username'];

define('PRODUCT_UPLOAD_URL', 'uploads/ecommerce/products/');
define('PRODUCT_UPLOAD_ABS', DROOT_PATH . '/uploads/ecommerce/products/');

$valid_types = ['physical', 'digital', 'license', 'affiliate'];

function uniqueProductSlug(PDO $pdo, string $base, int $excludeId = 0): string {
    $slug = $base;
    $i = 1;
    while (true) {
        $q = $pdo->prepare("SELECT id FROM ecom_products WHERE slug = ? AND id != ?");
        $q->execute([$slug, $excludeId]);
        if (!$q->fetch()) break;
        $slug = $base . '-' . $i++;
    }
    return $slug;
}

$notifications = [];
$editing = null;

if (isset($_GET['edit']) && is_numeric($_GET['edit'])) {
    $e = $pdo->prepare("SELECT * FROM ecom_products WHERE id=?");
    $e->execute([(int)$_GET['edit']]);
    $editing = $e->fetch(PDO::FETCH_ASSOC);
}

$product_type = $editing['product_type'] ?? ($_GET['type'] ?? 'physical');
if (!in_array($product_type, $valid_types, true)) $product_type = 'physical';

// ── Handle POST (create / update) ──────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action           = $_POST['action'] ?? '';
    $edit_id          = (int)($_POST['edit_id'] ?? 0);
    $product_type     = in_array($_POST['product_type'] ?? '', $valid_types, true) ? $_POST['product_type'] : 'physical';
    $name             = trim($_POST['name'] ?? '');
    $slug_raw         = trim($_POST['slug'] ?? '');
    $category_id      = (int)($_POST['category_id'] ?? 0) ?: null;
    $subcategory_id   = (int)($_POST['subcategory_id'] ?? 0) ?: null;
    $brand_id         = (int)($_POST['brand_id'] ?? 0) ?: null;
    $sku              = trim($_POST['sku'] ?? '');
    $price            = (float)($_POST['price'] ?? 0);
    $sale_price       = ($_POST['sale_price'] ?? '') !== '' ? (float)$_POST['sale_price'] : null;
    $stock_qty        = ($product_type === 'physical') ? (int)($_POST['stock_qty'] ?? 0) : null;
    $description      = trim($_POST['description'] ?? '');
    $badge_tag        = in_array($_POST['badge_tag'] ?? '', ['none','new','best','hot','featured'], true) ? $_POST['badge_tag'] : 'none';
    $item_type        = ($_POST['item_type'] ?? 'normal') === 'variant' ? 'variant' : 'normal';
    $status           = ($_POST['status'] ?? 'active') === 'inactive' ? 'inactive' : 'active';
    $download_link    = $product_type === 'digital'  ? trim($_POST['download_link'] ?? '') : null;
    $license_key      = $product_type === 'license'  ? trim($_POST['license_key'] ?? '')   : null;
    $affiliate_url    = $product_type === 'affiliate' ? trim($_POST['affiliate_url'] ?? '') : null;

    if (empty($name)) {
        $notifications[] = ['type' => 'error', 'message' => 'Product name is required.'];
    } else {
        $base_slug = $slug_raw !== '' ? generateSlug($slug_raw) : generateSlug($name);
        $slug      = uniqueProductSlug($pdo, $base_slug, $edit_id);

        $image_path = null;
        if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
            if (!file_exists(PRODUCT_UPLOAD_ABS)) mkdir(PRODUCT_UPLOAD_ABS, 0777, true);
            $ext      = strtolower(pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION));
            $filename = $slug . '-' . uniqid() . '.' . $ext;
            if (move_uploaded_file($_FILES['image']['tmp_name'], PRODUCT_UPLOAD_ABS . $filename)) {
                $image_path = PRODUCT_UPLOAD_URL . $filename;
            }
        }

        try {
            if ($action === 'create') {
                $pdo->prepare("INSERT INTO ecom_products
                    (category_id, subcategory_id, brand_id, name, slug, sku, product_type,
                     price, sale_price, stock_qty, image, description, badge_tag, item_type, status,
                     download_link, license_key, affiliate_url)
                    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)")
                    ->execute([$category_id, $subcategory_id, $brand_id, $name, $slug, $sku, $product_type,
                               $price, $sale_price, $stock_qty, $image_path, $description, $badge_tag, $item_type, $status,
                               $download_link, $license_key, $affiliate_url]);

                $new_id = $pdo->lastInsertId();
                $barcode = 'EM' . str_pad($new_id, 8, '0', STR_PAD_LEFT);
                $pdo->prepare("UPDATE ecom_products SET barcode=? WHERE id=?")->execute([$barcode, $new_id]);

                $pdo->prepare("INSERT INTO activity_logs (user_id, action_type, description, ip_address, user_agent) VALUES (?, 'ecom_product_create', ?, ?, ?)")
                    ->execute([$_SESSION['user_id'], "Created Product: $name (ID: $new_id)", $log_ip, $log_ua]);

                header("Location: /admin/ecommerce/products.php?success=created");
                exit;

            } elseif ($action === 'update' && $edit_id > 0) {
                if ($image_path) {
                    $old = $pdo->prepare("SELECT image FROM ecom_products WHERE id=?");
                    $old->execute([$edit_id]);
                    if ($old_row = $old->fetch(PDO::FETCH_ASSOC)) {
                        if (!empty($old_row['image']) && file_exists(DROOT_PATH . '/' . $old_row['image'])) {
                            @unlink(DROOT_PATH . '/' . $old_row['image']);
                        }
                    }
                } else {
                    $keep = $pdo->prepare("SELECT image FROM ecom_products WHERE id=?");
                    $keep->execute([$edit_id]);
                    $image_path = $keep->fetchColumn() ?: null;
                }

                $pdo->prepare("UPDATE ecom_products SET
                    category_id=?, subcategory_id=?, brand_id=?, name=?, slug=?, sku=?, product_type=?,
                    price=?, sale_price=?, stock_qty=?, image=?, description=?, badge_tag=?, item_type=?, status=?,
                    download_link=?, license_key=?, affiliate_url=?
                    WHERE id=?")
                    ->execute([$category_id, $subcategory_id, $brand_id, $name, $slug, $sku, $product_type,
                               $price, $sale_price, $stock_qty, $image_path, $description, $badge_tag, $item_type, $status,
                               $download_link, $license_key, $affiliate_url, $edit_id]);

                $pdo->prepare("INSERT INTO activity_logs (user_id, action_type, description, ip_address, user_agent) VALUES (?, 'ecom_product_update', ?, ?, ?)")
                    ->execute([$_SESSION['user_id'], "Updated Product: $name (ID: $edit_id)", $log_ip, $log_ua]);

                header("Location: /admin/ecommerce/products.php?success=updated");
                exit;
            }
        } catch (Exception $e) {
            $notifications[] = ['type' => 'error', 'message' => 'Save failed: ' . $e->getMessage()];
        }
    }
}

$all_categories = $pdo->query("SELECT id, name FROM ecom_categories WHERE status='active' ORDER BY name ASC")->fetchAll(PDO::FETCH_ASSOC);
$all_brands      = $pdo->query("SELECT id, name FROM ecom_brands WHERE status='active' ORDER BY name ASC")->fetchAll(PDO::FETCH_ASSOC);

$editing_subcats = [];
if ($editing && $editing['category_id']) {
    $sc = $pdo->prepare("SELECT id, name FROM ecom_subcategories WHERE category_id=? ORDER BY name ASC");
    $sc->execute([$editing['category_id']]);
    $editing_subcats = $sc->fetchAll(PDO::FETCH_ASSOC);
}

$type_labels = ['physical' => 'Physical Product', 'digital' => 'Digital Product', 'license' => 'License Product', 'affiliate' => 'Affiliate Product'];
$page_title = $editing ? 'Edit Product' : 'Add ' . ($type_labels[$product_type] ?? 'Product');
$page_subtitle = $editing ? 'Update product details' : 'Fill in the details for your new ' . strtolower($type_labels[$product_type] ?? 'product');
?>
<!DOCTYPE html>
<html lang="en">
<head>
<?php include __DIR__ . '/components/ecom-head.php'; ?>
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
                <a href="products.php" class="btn btn-secondary btn-sm"><i class="fas fa-arrow-left"></i> Back to Products</a>
                <button class="icon-btn dark-mode-toggle" style="background: var(--primary-lighter); color: var(--primary);"><i class="fas fa-moon"></i></button>
            </div>
        </header>

        <div class="content-wrapper">

            <?php foreach ($notifications as $n): ?>
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <?= htmlspecialchars($n['message']) ?>
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
            <?php endforeach; ?>

            <form method="POST" enctype="multipart/form-data" id="productForm">
                <input type="hidden" name="action" value="<?= $editing ? 'update' : 'create' ?>">
                <input type="hidden" name="edit_id" value="<?= $editing['id'] ?? 0 ?>">
                <input type="hidden" name="product_type" id="productType" value="<?= htmlspecialchars($product_type) ?>">

                <div class="row">
                    <div class="col-lg-8">
                        <div class="gd-card">
                            <div class="gd-card-body">
                                <h5 class="mb-3"><i class="fas fa-info-circle text-primary"></i> Basic Info</h5>

                                <div class="mb-3">
                                    <label class="form-label">Product Name <span class="text-danger">*</span></label>
                                    <input type="text" name="name" id="prodName" class="form-control" value="<?= htmlspecialchars($editing['name'] ?? '') ?>" required>
                                </div>

                                <div class="mb-3">
                                    <label class="form-label">Slug <small class="text-muted">(auto-generated)</small></label>
                                    <input type="text" name="slug" id="prodSlug" class="form-control" value="<?= htmlspecialchars($editing['slug'] ?? '') ?>">
                                </div>

                                <div class="mb-3">
                                    <label class="form-label">SKU</label>
                                    <input type="text" name="sku" class="form-control" value="<?= htmlspecialchars($editing['sku'] ?? '') ?>" placeholder="e.g. SKU-00123">
                                </div>

                                <?php if ($editing && !empty($editing['barcode'])): ?>
                                <div class="mb-3">
                                    <label class="form-label">Barcode</label>
                                    <div class="d-flex align-items-center gap-2">
                                        <input type="text" class="form-control" value="<?= htmlspecialchars($editing['barcode']) ?>" readonly>
                                        <a href="barcode-print.php?ids=<?= $editing['id'] ?>" target="_blank" class="btn btn-secondary flex-shrink-0"><i class="fas fa-barcode"></i> Print</a>
                                    </div>
                                </div>
                                <?php endif; ?>

                                <div class="mb-3">
                                    <label class="form-label">Description</label>
                                    <textarea name="description" class="form-control" rows="5"><?= htmlspecialchars($editing['description'] ?? '') ?></textarea>
                                </div>
                            </div>
                        </div>

                        <div class="gd-card">
                            <div class="gd-card-body">
                                <h5 class="mb-3"><i class="fas fa-tags text-primary"></i> Categorization</h5>
                                <div class="row">
                                    <div class="col-md-6 mb-3">
                                        <label class="form-label">Category</label>
                                        <select name="category_id" id="pCategorySelect" class="form-select">
                                            <option value="">Select category…</option>
                                            <?php foreach ($all_categories as $c): ?>
                                            <option value="<?= $c['id'] ?>" <?= (($editing['category_id'] ?? 0) == $c['id']) ? 'selected' : '' ?>><?= htmlspecialchars($c['name']) ?></option>
                                            <?php endforeach; ?>
                                        </select>
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label class="form-label">Sub Category</label>
                                        <select name="subcategory_id" id="pSubcategorySelect" class="form-select" <?= empty($editing_subcats) ? 'disabled' : '' ?>>
                                            <option value="">Select category first…</option>
                                            <?php foreach ($editing_subcats as $s): ?>
                                            <option value="<?= $s['id'] ?>" <?= (($editing['subcategory_id'] ?? 0) == $s['id']) ? 'selected' : '' ?>><?= htmlspecialchars($s['name']) ?></option>
                                            <?php endforeach; ?>
                                        </select>
                                    </div>
                                </div>
                                <div class="mb-1">
                                    <label class="form-label">Brand</label>
                                    <select name="brand_id" class="form-select">
                                        <option value="">Select brand…</option>
                                        <?php foreach ($all_brands as $b): ?>
                                        <option value="<?= $b['id'] ?>" <?= (($editing['brand_id'] ?? 0) == $b['id']) ? 'selected' : '' ?>><?= htmlspecialchars($b['name']) ?></option>
                                        <?php endforeach; ?>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="gd-card">
                            <div class="gd-card-body">
                                <h5 class="mb-3"><i class="fas fa-rupee-sign text-primary"></i> Pricing<?= $product_type === 'physical' ? ' &amp; Stock' : '' ?></h5>
                                <div class="row">
                                    <div class="col-md-4 mb-3">
                                        <label class="form-label">Price (₹) <span class="text-danger">*</span></label>
                                        <input type="number" step="0.01" min="0" name="price" class="form-control" value="<?= htmlspecialchars($editing['price'] ?? '') ?>" required>
                                    </div>
                                    <div class="col-md-4 mb-3">
                                        <label class="form-label">Sale Price (₹)</label>
                                        <input type="number" step="0.01" min="0" name="sale_price" class="form-control" value="<?= htmlspecialchars($editing['sale_price'] ?? '') ?>">
                                    </div>
                                    <div class="col-md-4 mb-3 field-physical">
                                        <label class="form-label">Stock Quantity</label>
                                        <input type="number" min="0" name="stock_qty" class="form-control" value="<?= htmlspecialchars($editing['stock_qty'] ?? '0') ?>">
                                    </div>
                                </div>

                                <div class="mb-3 field-digital">
                                    <label class="form-label">Download Link</label>
                                    <input type="url" name="download_link" class="form-control" placeholder="https://…" value="<?= htmlspecialchars($editing['download_link'] ?? '') ?>">
                                </div>

                                <div class="mb-3 field-license">
                                    <label class="form-label">License Key(s)</label>
                                    <textarea name="license_key" class="form-control" rows="3" placeholder="One key per line"><?= htmlspecialchars($editing['license_key'] ?? '') ?></textarea>
                                </div>

                                <div class="mb-1 field-affiliate">
                                    <label class="form-label">Affiliate URL</label>
                                    <input type="url" name="affiliate_url" class="form-control" placeholder="https://…" value="<?= htmlspecialchars($editing['affiliate_url'] ?? '') ?>">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-4">
                        <div class="gd-card">
                            <div class="gd-card-body">
                                <h5 class="mb-3"><i class="fas fa-image text-primary"></i> Image</h5>
                                <div id="imgPreviewBox" class="dt-thumb-placeholder mb-3" style="width:100%;height:180px;<?= !empty($editing['image']) ? 'overflow:hidden;' : '' ?>">
                                    <?php if (!empty($editing['image'])): ?>
                                        <img id="imgPreviewImg" src="/<?= htmlspecialchars($editing['image']) ?>" style="width:100%;height:100%;object-fit:cover;">
                                    <?php else: ?>
                                        <i class="fas fa-image fa-2x"></i>
                                        <img id="imgPreviewImg" src="" style="display:none;width:100%;height:100%;object-fit:cover;">
                                    <?php endif; ?>
                                </div>
                                <input type="file" name="image" id="prodImage" class="form-control" accept="image/*">
                            </div>
                        </div>

                        <div class="gd-card">
                            <div class="gd-card-body">
                                <h5 class="mb-3"><i class="fas fa-sliders-h text-primary"></i> Organization</h5>

                                <div class="mb-3">
                                    <label class="form-label d-block">Status</label>
                                    <div class="btn-group w-100" role="group">
                                        <input type="radio" class="btn-check" name="status" id="stActive" value="active" <?= (($editing['status'] ?? 'active') === 'active') ? 'checked' : '' ?>>
                                        <label class="btn btn-outline-success btn-sm" for="stActive">Active</label>
                                        <input type="radio" class="btn-check" name="status" id="stInactive" value="inactive" <?= (($editing['status'] ?? '') === 'inactive') ? 'checked' : '' ?>>
                                        <label class="btn btn-outline-secondary btn-sm" for="stInactive">Inactive</label>
                                    </div>
                                </div>

                                <div class="mb-3">
                                    <label class="form-label">Badge Tag</label>
                                    <select name="badge_tag" class="form-select">
                                        <?php foreach (['none' => 'None', 'new' => 'New', 'best' => 'Best', 'hot' => 'Hot', 'featured' => 'Featured'] as $val => $lbl): ?>
                                        <option value="<?= $val ?>" <?= (($editing['badge_tag'] ?? 'none') === $val) ? 'selected' : '' ?>><?= $lbl ?></option>
                                        <?php endforeach; ?>
                                    </select>
                                </div>

                                <div class="mb-1">
                                    <label class="form-label">Item Type</label>
                                    <select name="item_type" class="form-select">
                                        <option value="normal" <?= (($editing['item_type'] ?? 'normal') === 'normal') ? 'selected' : '' ?>>Normal</option>
                                        <option value="variant" <?= (($editing['item_type'] ?? '') === 'variant') ? 'selected' : '' ?>>Variant</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <button type="submit" class="btn btn-primary w-100 btn-lg">
                            <i class="fas fa-<?= $editing ? 'save' : 'plus-circle' ?>"></i>
                            <?= $editing ? 'Update Product' : 'Create Product' ?>
                        </button>
                    </div>
                </div>
            </form>

        </div>
    </main>
</div>

<?php include_once ADMIN_PATH . '/components/admin_footer.php'; ?>
<?php include __DIR__ . '/components/ecom-scripts.php'; ?>

<script>
const CURRENT_TYPE = "<?= htmlspecialchars($product_type) ?>";

function applyTypeFields(type) {
    document.querySelectorAll('.field-physical, .field-digital, .field-license, .field-affiliate').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.field-' + type).forEach(el => el.style.display = 'block');
    document.getElementById('productType').value = type;
}
applyTypeFields(CURRENT_TYPE);

// Slug auto-gen
(function () {
    const nameEl = document.getElementById('prodName');
    const slugEl = document.getElementById('prodSlug');
    let userEditedSlug = slugEl.value !== '';
    function toSlug(str) {
        return str.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/[\s-]+/g, '-').replace(/^-+|-+$/g, '');
    }
    nameEl.addEventListener('input', function () { if (!userEditedSlug) slugEl.value = toSlug(this.value); });
    slugEl.addEventListener('input', function () { userEditedSlug = slugEl.value !== ''; });
})();

// Image preview
document.getElementById('prodImage').addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (ev) {
        const img = document.getElementById('imgPreviewImg');
        img.src = ev.target.result;
        img.style.display = 'block';
    };
    reader.readAsDataURL(file);
});

// Cascading Category -> Subcategory
const catSelect = document.getElementById('pCategorySelect');
const subSelect = document.getElementById('pSubcategorySelect');

catSelect.addEventListener('change', function () {
    loadSubcategories(this.value, null);
});

function loadSubcategories(categoryId, preselect) {
    subSelect.innerHTML = '<option value="">Loading…</option>';
    subSelect.disabled = true;
    if (!categoryId) { subSelect.innerHTML = '<option value="">Select category first…</option>'; return; }
    fetch('get-subcategories.php?category_id=' + encodeURIComponent(categoryId))
        .then(r => r.json())
        .then(data => {
            subSelect.innerHTML = '<option value="">Select subcategory…</option>';
            data.forEach(s => {
                const opt = document.createElement('option');
                opt.value = s.id; opt.textContent = s.name;
                if (preselect && String(s.id) === String(preselect)) opt.selected = true;
                subSelect.appendChild(opt);
            });
            subSelect.disabled = data.length === 0;
        });
}
</script>
</body>
</html>
