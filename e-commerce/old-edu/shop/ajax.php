<?php
define('DROOT_PATH', $_SERVER['DOCUMENT_ROOT']);
require_once DROOT_PATH . '/includes/config.php';

header('Content-Type: application/json');

$action = $_POST['action'] ?? '';
$_SESSION['shop_cart'] = $_SESSION['shop_cart'] ?? [];

function cartCount() {
    return array_sum($_SESSION['shop_cart'] ?? []);
}

switch ($action) {

    case 'add_to_cart': {
        $pid = (int)($_POST['product_id'] ?? 0);
        $qty = max(1, (int)($_POST['qty'] ?? 1));
        if ($pid <= 0) { echo json_encode(['success' => false, 'message' => 'Invalid product.']); exit; }

        $stmt = $pdo->prepare("SELECT id, stock_qty, product_type FROM ecom_products WHERE id = ? AND status = 'active'");
        $stmt->execute([$pid]);
        $p = $stmt->fetch(PDO::FETCH_ASSOC);
        if (!$p) { echo json_encode(['success' => false, 'message' => 'Product not found.']); exit; }

        $current = $_SESSION['shop_cart'][$pid] ?? 0;
        $new_qty = $current + $qty;

        if ($p['product_type'] === 'physical' && $p['stock_qty'] !== null && $new_qty > (int)$p['stock_qty']) {
            $new_qty = max(1, (int)$p['stock_qty']);
            if ($new_qty <= 0) { echo json_encode(['success' => false, 'message' => 'Out of stock.']); exit; }
        }

        $_SESSION['shop_cart'][$pid] = $new_qty;
        echo json_encode(['success' => true, 'cart_count' => cartCount()]);
        break;
    }

    case 'update_cart_qty': {
        $pid = (int)($_POST['product_id'] ?? 0);
        $qty = max(0, (int)($_POST['qty'] ?? 1));
        if ($qty === 0) {
            unset($_SESSION['shop_cart'][$pid]);
        } else {
            $_SESSION['shop_cart'][$pid] = $qty;
        }
        echo json_encode(['success' => true, 'cart_count' => cartCount()]);
        break;
    }

    case 'remove_from_cart': {
        $pid = (int)($_POST['product_id'] ?? 0);
        unset($_SESSION['shop_cart'][$pid]);
        echo json_encode(['success' => true, 'cart_count' => cartCount()]);
        break;
    }

    case 'toggle_wishlist': {
        if (empty($_SESSION['customer_id'])) {
            echo json_encode(['success' => false, 'message' => 'Please login first.', 'need_login' => true]); exit;
        }
        $pid = (int)($_POST['product_id'] ?? 0);
        $cid = (int)$_SESSION['customer_id'];

        $check = $pdo->prepare("SELECT id FROM ecom_wishlist WHERE customer_id = ? AND product_id = ?");
        $check->execute([$cid, $pid]);
        if ($row = $check->fetch(PDO::FETCH_ASSOC)) {
            $pdo->prepare("DELETE FROM ecom_wishlist WHERE id = ?")->execute([$row['id']]);
            echo json_encode(['success' => true, 'wishlisted' => false]);
        } else {
            $pdo->prepare("INSERT INTO ecom_wishlist (customer_id, product_id) VALUES (?, ?)")->execute([$cid, $pid]);
            echo json_encode(['success' => true, 'wishlisted' => true]);
        }
        break;
    }

    default:
        echo json_encode(['success' => false, 'message' => 'Unknown action.']);
}
