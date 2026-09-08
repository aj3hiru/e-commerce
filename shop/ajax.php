<?php
define('DROOT_PATH', $_SERVER['DOCUMENT_ROOT']);
require_once DROOT_PATH . '/includes/config.php';
require_once __DIR__ . '/includes/product-card.php';

header('Content-Type: application/json');

$action = $_POST['action'] ?? $_GET['action'] ?? '';
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
        $cart_total = 0.0;
        if (!empty($_SESSION['shop_cart'])) {
            $ids = array_keys($_SESSION['shop_cart']);
            $in = implode(',', array_fill(0, count($ids), '?'));
            $cp = $pdo->prepare("SELECT id, price, sale_price FROM ecom_products WHERE id IN ($in)");
            $cp->execute($ids);
            foreach ($cp->fetchAll(PDO::FETCH_ASSOC) as $pr) {
                $unit = (!empty($pr['sale_price']) && (float)$pr['sale_price'] > 0 && (float)$pr['sale_price'] < (float)$pr['price']) ? (float)$pr['sale_price'] : (float)$pr['price'];
                $cart_total += $unit * (int)$_SESSION['shop_cart'][$pr['id']];
            }
        }
        echo json_encode(['success' => true, 'cart_count' => cartCount(), 'cart_total' => $cart_total]);
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

    case 'load_more_category_products': {
        $category_id = (int)($_GET['category_id'] ?? 0);
        $subcategory_id = (int)($_GET['subcategory_id'] ?? 0);
        $offset = max(0, (int)($_GET['offset'] ?? 0));
        $limit = 20;

        if ($subcategory_id > 0) {
            $stmt = $pdo->prepare("SELECT * FROM ecom_products WHERE status='active' AND subcategory_id = ? ORDER BY created_at DESC LIMIT $limit OFFSET $offset");
            $stmt->execute([$subcategory_id]);
            $count_stmt = $pdo->prepare("SELECT COUNT(*) FROM ecom_products WHERE status='active' AND subcategory_id = ?");
            $count_stmt->execute([$subcategory_id]);
        } else {
            $stmt = $pdo->prepare("SELECT * FROM ecom_products WHERE status='active' AND category_id = ? ORDER BY created_at DESC LIMIT $limit OFFSET $offset");
            $stmt->execute([$category_id]);
            $count_stmt = $pdo->prepare("SELECT COUNT(*) FROM ecom_products WHERE status='active' AND category_id = ?");
            $count_stmt->execute([$category_id]);
        }
        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $total = (int) $count_stmt->fetchColumn();

        ob_start();
        foreach ($products as $p) { renderCmartProductCard($p); }
        $html = ob_get_clean();

        echo json_encode([
            'success' => true,
            'html' => $html,
            'count' => count($products),
            'has_more' => ($offset + count($products)) < $total,
        ]);
        break;
    }

    default:
        echo json_encode(['success' => false, 'message' => 'Unknown action.']);
}
