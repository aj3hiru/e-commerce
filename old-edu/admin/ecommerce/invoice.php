<?php
define('DROOT_PATH', $_SERVER['DOCUMENT_ROOT']);
require_once DROOT_PATH . '/includes/config.php';
require_once DROOT_PATH . '/includes/functions.php';

if (!isset($_SESSION['user_id'])) { exit('Access Denied'); }
$stmt = $pdo->prepare("SELECT status, permissions FROM users WHERE id = ?");
$stmt->execute([$_SESSION['user_id']]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);
$permissions = json_decode($user['permissions'] ?? '{}', true);
if (!$user || $user['status'] !== 'active' || (empty($permissions['ecommerce']['manage_orders']) && empty($permissions['ecommerce']['manage_customers']))) {
    exit('Access Denied');
}

$order_id = (int)($_GET['id'] ?? 0);
$stmt = $pdo->prepare("SELECT * FROM ecom_orders WHERE id = ?");
$stmt->execute([$order_id]);
$order = $stmt->fetch(PDO::FETCH_ASSOC);
if (!$order) { exit('Order not found.'); }

$items = $pdo->prepare("SELECT * FROM ecom_order_items WHERE order_id = ?");
$items->execute([$order_id]);
$items = $items->fetchAll(PDO::FETCH_ASSOC);

$customer = null;
if (!empty($order['customer_id'])) {
    $c = $pdo->prepare("SELECT * FROM ecom_customers WHERE id = ?");
    $c->execute([$order['customer_id']]);
    $customer = $c->fetch(PDO::FETCH_ASSOC);
}

$subtotal = 0;
foreach ($items as $it) { $subtotal += (float)$it['price'] * (int)$it['qty']; }
$grand_total = (float)$order['total_amount'];
$discount = max(0, $subtotal - $grand_total);
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Invoice <?= htmlspecialchars($order['order_number']) ?> - <?= htmlspecialchars($site_name) ?></title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
body { font-family: 'Inter', sans-serif; background: #f3f4f6; color: #1f2937; }
.invoice-box { max-width: 800px; margin: 2rem auto; background: #fff; padding: 2.5rem; border-radius: 0.5rem; box-shadow: 0 0.15rem 1.75rem rgba(58,59,69,.1); }
.invoice-head { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #7c3aed; padding-bottom: 1.5rem; margin-bottom: 1.5rem; }
.invoice-head h1 { font-size: 1.75rem; font-weight: 800; color: #7c3aed; margin: 0; }
.invoice-head .meta { text-align: right; font-size: 0.875rem; color: #6b7280; }
.invoice-parties { display: flex; justify-content: space-between; margin-bottom: 2rem; gap: 2rem; }
.invoice-parties .block h6 { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: #9ca3af; margin-bottom: 0.4rem; }
table.inv-table { width: 100%; border-collapse: collapse; margin-bottom: 1.5rem; }
table.inv-table th { background: #f9fafb; text-align: left; padding: 0.7rem 0.9rem; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.03em; color: #6b7280; border-bottom: 1px solid #e5e7eb; }
table.inv-table td { padding: 0.7rem 0.9rem; border-bottom: 1px solid #f3f4f6; font-size: 0.9375rem; }
.inv-totals { max-width: 320px; margin-left: auto; }
.inv-totals div { display: flex; justify-content: space-between; padding: 0.4rem 0; font-size: 0.9375rem; }
.inv-totals .grand { font-weight: 800; font-size: 1.125rem; border-top: 2px solid #1f2937; padding-top: 0.6rem; margin-top: 0.3rem; }
.print-bar { max-width: 800px; margin: 0 auto 1rem; display: flex; justify-content: flex-end; }
@media print { .print-bar { display: none; } body { background: #fff; } .invoice-box { box-shadow: none; margin: 0; } }
</style>
</head>
<body>

<div class="print-bar">
    <button class="btn btn-primary" onclick="window.print()"><i class="fas fa-print"></i> Print Invoice</button>
</div>

<div class="invoice-box">
    <div class="invoice-head">
        <div>
            <h1><?= htmlspecialchars($site_name) ?></h1>
            <p class="text-muted mb-0" style="font-size:0.875rem;">Tax Invoice</p>
        </div>
        <div class="meta">
            <div><strong>Invoice #:</strong> <?= htmlspecialchars($order['order_number']) ?></div>
            <div><strong>Date:</strong> <?= date('d M Y', strtotime($order['created_at'])) ?></div>
            <div><strong>Order Type:</strong> <?= ucfirst($order['order_type'] ?? 'online') ?></div>
        </div>
    </div>

    <div class="invoice-parties">
        <div class="block">
            <h6>Billed To</h6>
            <div><strong><?= htmlspecialchars($order['customer_name'] ?: ($customer['name'] ?? 'Walk-in Customer')) ?></strong></div>
            <div><?= htmlspecialchars($order['customer_email'] ?: ($customer['email'] ?? '')) ?></div>
            <?php if (!empty($customer['phone'])): ?><div><?= htmlspecialchars($customer['phone']) ?></div><?php endif; ?>
            <?php if (!empty($customer['address'])): ?><div><?= nl2br(htmlspecialchars($customer['address'])) ?></div><?php endif; ?>
        </div>
        <div class="block">
            <h6>Payment</h6>
            <div>Status: <strong><?= htmlspecialchars($order['payment_status']) ?></strong></div>
            <div>Order Status: <strong><?= htmlspecialchars($order['order_status']) ?></strong></div>
        </div>
    </div>

    <table class="inv-table">
        <thead>
            <tr>
                <th>#</th>
                <th>Item</th>
                <th>Qty</th>
                <th>Price</th>
                <th class="text-end">Subtotal</th>
            </tr>
        </thead>
        <tbody>
        <?php if (empty($items)): ?>
            <tr><td colspan="5" class="text-center text-muted">No line items recorded for this order.</td></tr>
        <?php else: foreach ($items as $i => $it): ?>
            <tr>
                <td><?= $i + 1 ?></td>
                <td><?= htmlspecialchars($it['product_name']) ?></td>
                <td><?= (int)$it['qty'] ?></td>
                <td>₹<?= number_format((float)$it['price'], 2) ?></td>
                <td class="text-end">₹<?= number_format((float)$it['price'] * (int)$it['qty'], 2) ?></td>
            </tr>
        <?php endforeach; endif; ?>
        </tbody>
    </table>

    <div class="inv-totals">
        <div><span>Subtotal</span><span>₹<?= number_format($subtotal, 2) ?></span></div>
        <?php if ($discount > 0): ?>
        <div><span>Discount</span><span>-₹<?= number_format($discount, 2) ?></span></div>
        <?php endif; ?>
        <div class="grand"><span>Grand Total</span><span>₹<?= number_format($grand_total, 2) ?></span></div>
    </div>

    <p class="text-muted text-center mt-4 mb-0" style="font-size:0.8125rem;">Thank you for shopping with <?= htmlspecialchars($site_name) ?>!</p>
</div>

</body>
</html>
