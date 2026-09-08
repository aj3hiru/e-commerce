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
if (!$user || $user['status'] !== 'active' || empty($permissions['ecommerce']['manage_orders'])) {
    exit('Access Denied');
}
$username = $_SESSION['username'];

$order_id = (int)($_GET['id'] ?? 0);
$stmt = $pdo->prepare("SELECT * FROM ecom_orders WHERE id = ?");
$stmt->execute([$order_id]);
$order = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$order) { exit('Order not found.'); }

$items = $pdo->prepare("SELECT * FROM ecom_order_items WHERE order_id = ?");
$items->execute([$order_id]);
$items = $items->fetchAll(PDO::FETCH_ASSOC);

$page_title = 'Order ' . $order['order_number'];
$page_subtitle = 'Order details and items';
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
                <a href="orders.php" class="btn btn-secondary btn-sm"><i class="fas fa-arrow-left"></i> Back to Orders</a>
                <button class="icon-btn dark-mode-toggle" style="background: var(--primary-lighter); color: var(--primary);"><i class="fas fa-moon"></i></button>
            </div>
        </header>

        <div class="content-wrapper">
            <div class="row">
                <div class="col-md-8">
                    <div class="gd-card">
                        <div class="gd-card-body">
                            <h5 class="mb-3"><i class="fas fa-box text-primary"></i> Items</h5>
                            <?php if (empty($items)): ?>
                                <p class="text-muted">No line items recorded for this order.</p>
                            <?php else: ?>
                            <div class="table-responsive">
                                <table class="table table-bordered">
                                    <thead><tr><th>Product</th><th>Qty</th><th>Price</th><th>Subtotal</th></tr></thead>
                                    <tbody>
                                    <?php foreach ($items as $it): ?>
                                    <tr>
                                        <td><?= htmlspecialchars($it['product_name']) ?></td>
                                        <td><?= (int)$it['qty'] ?></td>
                                        <td>₹<?= number_format((float)$it['price'], 2) ?></td>
                                        <td>₹<?= number_format((float)$it['price'] * (int)$it['qty'], 2) ?></td>
                                    </tr>
                                    <?php endforeach; ?>
                                    </tbody>
                                </table>
                            </div>
                            <?php endif; ?>
                        </div>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="gd-card">
                        <div class="gd-card-body">
                            <h5 class="mb-3"><i class="fas fa-info-circle text-primary"></i> Summary</h5>
                            <p class="mb-1"><strong>Order #:</strong> <?= htmlspecialchars($order['order_number']) ?></p>
                            <p class="mb-1"><strong>Customer:</strong> <?= htmlspecialchars($order['customer_name'] ?: '—') ?></p>
                            <p class="mb-1"><strong>Email:</strong> <?= htmlspecialchars($order['customer_email'] ?: '—') ?></p>
                            <p class="mb-1"><strong>Total:</strong> ₹<?= number_format((float)$order['total_amount'], 2) ?></p>
                            <p class="mb-1"><strong>Payment:</strong> <span class="badge <?= $order['payment_status'] === 'Paid' ? 'bg-success' : 'bg-secondary' ?>"><?= htmlspecialchars($order['payment_status']) ?></span></p>
                            <p class="mb-1"><strong>Status:</strong> <span class="badge bg-info"><?= htmlspecialchars($order['order_status']) ?></span></p>
                            <p class="mb-0"><strong>Placed:</strong> <?= date('d M Y, h:i A', strtotime($order['created_at'])) ?></p>
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
