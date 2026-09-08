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
if (!$user || $user['status'] !== 'active' || empty(array_filter($permissions['ecommerce'] ?? []))) {
    exit('Access Denied');
}
$username = $_SESSION['username'];

function scalar($pdo, $sql) { return (float)($pdo->query($sql)->fetchColumn() ?: 0); }

$total_orders     = scalar($pdo, "SELECT COUNT(*) FROM ecom_orders");
$pending_orders   = scalar($pdo, "SELECT COUNT(*) FROM ecom_orders WHERE order_status='Pending'");
$progress_orders  = scalar($pdo, "SELECT COUNT(*) FROM ecom_orders WHERE order_status='In Progress'");
$delivered_orders = scalar($pdo, "SELECT COUNT(*) FROM ecom_orders WHERE order_status='Delivered'");
$canceled_orders  = scalar($pdo, "SELECT COUNT(*) FROM ecom_orders WHERE order_status='Canceled'");

$total_earning      = scalar($pdo, "SELECT COALESCE(SUM(total_amount),0) FROM ecom_orders WHERE payment_status='Paid'");
$today_earning      = scalar($pdo, "SELECT COALESCE(SUM(total_amount),0) FROM ecom_orders WHERE payment_status='Paid' AND DATE(created_at)=CURDATE()");
$this_month_earning = scalar($pdo, "SELECT COALESCE(SUM(total_amount),0) FROM ecom_orders WHERE payment_status='Paid' AND MONTH(created_at)=MONTH(CURDATE()) AND YEAR(created_at)=YEAR(CURDATE())");
$this_year_earning  = scalar($pdo, "SELECT COALESCE(SUM(total_amount),0) FROM ecom_orders WHERE payment_status='Paid' AND YEAR(created_at)=YEAR(CURDATE())");

$total_products    = scalar($pdo, "SELECT COUNT(*) FROM ecom_products");
$out_of_stock      = scalar($pdo, "SELECT COUNT(*) FROM ecom_products WHERE product_type='physical' AND (stock_qty IS NULL OR stock_qty<=0)");
$total_customers   = scalar($pdo, "SELECT COUNT(*) FROM ecom_customers");
$online_customers  = scalar($pdo, "SELECT COUNT(*) FROM ecom_customers WHERE customer_type='online'");
$offline_customers = scalar($pdo, "SELECT COUNT(*) FROM ecom_customers WHERE customer_type='offline'");
$total_categories  = scalar($pdo, "SELECT COUNT(*) FROM ecom_categories");
$total_brands      = scalar($pdo, "SELECT COUNT(*) FROM ecom_brands");
$total_reviews     = scalar($pdo, "SELECT COUNT(*) FROM ecom_product_reviews");
$total_coupons     = scalar($pdo, "SELECT COUNT(*) FROM ecom_coupons");

$recent_orders = $pdo->query("SELECT * FROM ecom_orders ORDER BY created_at DESC LIMIT 8")->fetchAll(PDO::FETCH_ASSOC);

$page_title = 'E-commerce Dashboard';
$page_subtitle = 'A live overview of your store';

function statCard($color, $icon, $label, $value) {
    $colors = [
        'green'  => '#1cc88a',
        'blue'   => '#4361ee',
        'red'    => '#e74a5b',
        'cyan'   => '#36b9cc',
        'orange' => '#f6c23e',
    ];
    $bg = $colors[$color] ?? '#4361ee';
    echo '<div class="col-sm-6 col-lg-3 mb-3">
        <div class="stat-card-e">
            <div class="stat-icon-e" style="background:' . $bg . '"><i class="fas ' . $icon . '"></i></div>
            <div>
                <div class="stat-label-e">' . htmlspecialchars($label) . '</div>
                <div class="stat-value-e">' . $value . '</div>
            </div>
        </div>
    </div>';
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<?php include __DIR__ . '/components/ecom-head.php'; ?>
<style>
.stat-card-e { background: #fff; border: 1px solid rgba(0,0,0,.08); border-radius: 0.5rem; box-shadow: 0 0.15rem 1.75rem 0 rgba(58,59,69,.1); padding: 1.25rem; display: flex; align-items: center; gap: 1rem; height: 100%; }
.stat-icon-e { width: 52px; height: 52px; border-radius: 0.5rem; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 1.25rem; flex-shrink: 0; }
.stat-label-e { font-size: 0.875rem; color: var(--gray-500); margin-bottom: 0.2rem; }
.stat-value-e { font-size: 1.375rem; font-weight: 700; color: var(--gray-900); }
.section-label { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--gray-400); margin: 1.5rem 0 0.75rem; }
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
                <button class="icon-btn dark-mode-toggle" style="background: var(--primary-lighter); color: var(--primary);"><i class="fas fa-moon"></i></button>
            </div>
        </header>

        <div class="content-wrapper">

            <div class="section-label">Orders</div>
            <div class="row">
                <?php
                statCard('green', 'fa-shopping-cart', 'Total Orders', number_format($total_orders));
                statCard('green', 'fa-hourglass-half', 'Pending Orders', number_format($pending_orders));
                statCard('green', 'fa-truck-loading', 'In Progress', number_format($progress_orders));
                statCard('green', 'fa-check-circle', 'Delivered Orders', number_format($delivered_orders));
                ?>
            </div>

            <div class="section-label">Earnings (₹)</div>
            <div class="row">
                <?php
                statCard('red', 'fa-rupee-sign', 'Total Earning', '₹' . number_format($total_earning, 2));
                statCard('red', 'fa-calendar-day', "Today's Earning", '₹' . number_format($today_earning, 2));
                statCard('red', 'fa-calendar-alt', 'This Month', '₹' . number_format($this_month_earning, 2));
                statCard('red', 'fa-calendar', 'This Year', '₹' . number_format($this_year_earning, 2));
                ?>
            </div>

            <div class="section-label">Catalog &amp; Customers</div>
            <div class="row">
                <?php
                statCard('blue', 'fa-boxes', 'Total Products', number_format($total_products));
                statCard('blue', 'fa-list', 'Total Categories', number_format($total_categories));
                statCard('blue', 'fa-copyright', 'Total Brands', number_format($total_brands));
                statCard('blue', 'fa-users', 'Total Customers', number_format($total_customers));
                ?>
            </div>

            <div class="row">
                <?php
                statCard('cyan', 'fa-globe', 'Online Customers', number_format($online_customers));
                statCard('orange', 'fa-store', 'Offline Customers', number_format($offline_customers));
                statCard('red', 'fa-box-open', 'Out of Stock', number_format($out_of_stock));
                statCard('cyan', 'fa-star-half-alt', 'Total Reviews', number_format($total_reviews));
                ?>
            </div>

            <div class="row">
                <?php
                statCard('orange', 'fa-percentage', 'Active Coupons', number_format($total_coupons));
                statCard('green', 'fa-ban', 'Canceled Orders', number_format($canceled_orders));
                ?>
            </div>

            <div class="gd-card mt-3">
                <div class="gd-card-body">
                    <h5 class="mb-3"><i class="fas fa-clock text-primary"></i> Recent Orders</h5>
                    <?php if (empty($recent_orders)): ?>
                        <p class="text-muted mb-0">No orders yet.</p>
                    <?php else: ?>
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead>
                                <tr><th>Order #</th><th>Customer</th><th>Total</th><th>Payment</th><th>Status</th><th>Date</th></tr>
                            </thead>
                            <tbody>
                            <?php foreach ($recent_orders as $o): ?>
                            <tr>
                                <td><?= htmlspecialchars($o['order_number']) ?></td>
                                <td><?= htmlspecialchars($o['customer_name'] ?: '—') ?></td>
                                <td>₹<?= number_format((float)$o['total_amount'], 2) ?></td>
                                <td><span class="badge <?= $o['payment_status'] === 'Paid' ? 'bg-success' : 'bg-secondary' ?>"><?= htmlspecialchars($o['payment_status']) ?></span></td>
                                <td><span class="badge bg-info"><?= htmlspecialchars($o['order_status']) ?></span></td>
                                <td><?= date('d M Y', strtotime($o['created_at'])) ?></td>
                            </tr>
                            <?php endforeach; ?>
                            </tbody>
                        </table>
                    </div>
                    <?php endif; ?>
                </div>
            </div>

        </div>
    </main>
</div>

<?php include_once ADMIN_PATH . '/components/admin_footer.php'; ?>
<?php include __DIR__ . '/components/ecom-scripts.php'; ?>
</body>
</html>
