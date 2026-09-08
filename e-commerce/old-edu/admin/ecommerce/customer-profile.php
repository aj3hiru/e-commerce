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
if (!$user || $user['status'] !== 'active' || empty($permissions['ecommerce']['manage_customers'])) {
    exit('Access Denied');
}
$username = $_SESSION['username'];

$customer_id = (int)($_GET['id'] ?? 0);
$notifications = [];

// ── Handle update ────────────────────────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name          = trim($_POST['name'] ?? '');
    $email         = trim($_POST['email'] ?? '');
    $phone         = trim($_POST['phone'] ?? '');
    $address       = trim($_POST['address'] ?? '');
    $customer_type = ($_POST['customer_type'] ?? 'online') === 'offline' ? 'offline' : 'online';
    $status        = ($_POST['status'] ?? 'active') === 'inactive' ? 'inactive' : 'active';

    if (empty($name) || empty($email)) {
        $notifications[] = ['type' => 'error', 'message' => 'Name and email are required.'];
    } else {
        try {
            $pdo->prepare("UPDATE ecom_customers SET name=?, email=?, phone=?, address=?, customer_type=?, status=? WHERE id=?")
                ->execute([$name, $email, $phone ?: null, $address ?: null, $customer_type, $status, $customer_id]);

            $pdo->prepare("INSERT INTO activity_logs (user_id, action_type, description, ip_address, user_agent) VALUES (?, 'ecom_customer_update', ?, ?, ?)")
                ->execute([$_SESSION['user_id'], "Updated Customer profile: $name (ID: $customer_id)", $log_ip, $log_ua]);

            header("Location: /admin/ecommerce/customer-profile.php?id=$customer_id&success=1");
            exit;
        } catch (Exception $e) {
            $notifications[] = ['type' => 'error', 'message' => 'Save failed: this email may already be in use.'];
        }
    }
}

if (isset($_GET['success'])) {
    $notifications[] = ['type' => 'success', 'message' => 'Profile updated successfully!'];
}

$stmt = $pdo->prepare("SELECT * FROM ecom_customers WHERE id = ?");
$stmt->execute([$customer_id]);
$customer = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$customer) { exit('Customer not found.'); }

$orders = $pdo->prepare("SELECT * FROM ecom_orders WHERE customer_id = ? ORDER BY created_at DESC");
$orders->execute([$customer_id]);
$orders = $orders->fetchAll(PDO::FETCH_ASSOC);

$total_spent  = array_sum(array_column($orders, 'total_amount'));
$total_orders = count($orders);

$page_title = $customer['name'];
$page_subtitle = 'Customer profile and purchase history';
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
                <a href="customers.php" class="btn btn-secondary btn-sm"><i class="fas fa-arrow-left"></i> Back to Customers</a>
                <button class="icon-btn dark-mode-toggle" style="background: var(--primary-lighter); color: var(--primary);"><i class="fas fa-moon"></i></button>
            </div>
        </header>

        <div class="content-wrapper">

            <?php foreach ($notifications as $n): ?>
            <div class="alert alert-<?= $n['type'] === 'success' ? 'success' : 'danger' ?> alert-dismissible fade show" role="alert">
                <?= htmlspecialchars($n['message']) ?>
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
            <?php endforeach; ?>

            <div class="stat-mini-grid">
                <div class="stat-mini"><div class="val"><?= number_format($total_orders) ?></div><div class="lbl">Total Orders</div></div>
                <div class="stat-mini"><div class="val" style="color:var(--success);">₹<?= number_format((float)$total_spent, 2) ?></div><div class="lbl">Total Spent</div></div>
                <div class="stat-mini"><div class="val" style="color:var(--info);"><?= ucfirst($customer['customer_type']) ?></div><div class="lbl">Customer Type</div></div>
            </div>

            <div class="row">
                <div class="col-lg-4">
                    <div class="gd-card">
                        <div class="gd-card-body">
                            <h5 class="mb-3"><i class="fas fa-user-edit text-primary"></i> Edit Profile</h5>
                            <form method="POST">
                                <div class="mb-3">
                                    <label class="form-label">Name <span class="text-danger">*</span></label>
                                    <input type="text" name="name" class="form-control" value="<?= htmlspecialchars($customer['name']) ?>" required>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Email <span class="text-danger">*</span></label>
                                    <input type="email" name="email" class="form-control" value="<?= htmlspecialchars($customer['email']) ?>" required>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Phone</label>
                                    <input type="text" name="phone" class="form-control" value="<?= htmlspecialchars($customer['phone'] ?? '') ?>">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Address</label>
                                    <textarea name="address" class="form-control" rows="3"><?= htmlspecialchars($customer['address'] ?? '') ?></textarea>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label d-block">Customer Type</label>
                                    <div class="btn-group w-100" role="group">
                                        <input type="radio" class="btn-check" name="customer_type" id="pTypeOnline" value="online" <?= $customer['customer_type'] === 'online' ? 'checked' : '' ?>>
                                        <label class="btn btn-outline-primary btn-sm" for="pTypeOnline">Online</label>
                                        <input type="radio" class="btn-check" name="customer_type" id="pTypeOffline" value="offline" <?= $customer['customer_type'] === 'offline' ? 'checked' : '' ?>>
                                        <label class="btn btn-outline-warning btn-sm" for="pTypeOffline">Offline</label>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label d-block">Status</label>
                                    <div class="btn-group w-100" role="group">
                                        <input type="radio" class="btn-check" name="status" id="pStatusActive" value="active" <?= $customer['status'] === 'active' ? 'checked' : '' ?>>
                                        <label class="btn btn-outline-success btn-sm" for="pStatusActive">Active</label>
                                        <input type="radio" class="btn-check" name="status" id="pStatusInactive" value="inactive" <?= $customer['status'] === 'inactive' ? 'checked' : '' ?>>
                                        <label class="btn btn-outline-secondary btn-sm" for="pStatusInactive">Suspended</label>
                                    </div>
                                </div>
                                <button type="submit" class="btn btn-primary w-100"><i class="fas fa-save"></i> Save Changes</button>
                            </form>
                        </div>
                    </div>
                </div>

                <div class="col-lg-8">
                    <div class="gd-card">
                        <div class="gd-card-body">
                            <h5 class="mb-3"><i class="fas fa-receipt text-primary"></i> Purchase History</h5>
                            <?php if (empty($orders)): ?>
                            <div class="text-center py-5 text-muted">
                                <i class="fas fa-box-open fa-3x mb-3"></i>
                                <p>No orders yet from this customer.</p>
                            </div>
                            <?php else: ?>
                            <div class="table-responsive">
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Order #</th>
                                            <th>Date</th>
                                            <th>Total</th>
                                            <th>Payment</th>
                                            <th>Status</th>
                                            <th>Invoice</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    <?php foreach ($orders as $o): ?>
                                    <tr>
                                        <td><?= htmlspecialchars($o['order_number']) ?></td>
                                        <td><?= date('d M Y', strtotime($o['created_at'])) ?></td>
                                        <td>₹<?= number_format((float)$o['total_amount'], 2) ?></td>
                                        <td><span class="badge <?= $o['payment_status'] === 'Paid' ? 'bg-success' : 'bg-secondary' ?>"><?= htmlspecialchars($o['payment_status']) ?></span></td>
                                        <td><span class="badge bg-info"><?= htmlspecialchars($o['order_status']) ?></span></td>
                                        <td><a href="invoice.php?id=<?= $o['id'] ?>" target="_blank" class="btn btn-secondary btn-sm"><i class="fas fa-file-invoice"></i> Print</a></td>
                                    </tr>
                                    <?php endforeach; ?>
                                    </tbody>
                                </table>
                            </div>
                            <?php endif; ?>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </main>
</div>

<?php include_once ADMIN_PATH . '/components/admin_footer.php'; ?>
<?php include __DIR__ . '/components/ecom-scripts.php'; ?>
</body>
</html>
