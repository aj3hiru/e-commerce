<?php
define('DROOT_PATH', $_SERVER['DOCUMENT_ROOT']);
require_once DROOT_PATH . '/includes/config.php';
require_once DROOT_PATH . '/includes/functions.php';

if (!empty($_SESSION['customer_id'])) { header('Location: /shop/account.php'); exit; }

$error = '';
$redirect = $_GET['redirect'] ?? '/shop/account.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email    = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';
    $redirect = $_POST['redirect'] ?? $redirect;

    $stmt = $pdo->prepare("SELECT * FROM ecom_customers WHERE email = ?");
    $stmt->execute([$email]);
    $customer = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$customer || empty($customer['password']) || !password_verify($password, $customer['password'])) {
        $error = 'Incorrect email or password.';
    } elseif ($customer['status'] !== 'active') {
        $error = 'Your account has been suspended. Please contact support.';
    } else {
        $_SESSION['customer_id']   = $customer['id'];
        $_SESSION['customer_name'] = $customer['name'];
        header('Location: ' . $redirect);
        exit;
    }
}

$page_title = 'Login';
include __DIR__ . '/includes/shop-header.php';
?>

<div class="shop-container" style="max-width:420px;">
    <div class="card border-0 shadow-sm">
        <div class="card-body p-4">
            <h4 class="fw-bold mb-1">Welcome Back</h4>
            <p class="text-muted mb-4">Login to your account to continue.</p>

            <?php if ($error): ?>
            <div class="alert alert-danger"><?= htmlspecialchars($error) ?></div>
            <?php endif; ?>

            <form method="POST">
                <input type="hidden" name="redirect" value="<?= htmlspecialchars($redirect) ?>">
                <div class="mb-3">
                    <label class="form-label">Email</label>
                    <input type="email" name="email" class="form-control" required autofocus>
                </div>
                <div class="mb-3">
                    <label class="form-label">Password</label>
                    <input type="password" name="password" class="form-control" required>
                </div>
                <button type="submit" class="btn btn-shop-primary w-100">Login</button>
            </form>

            <p class="text-center mt-3 mb-0">New here? <a href="/shop/register.php">Create an account</a></p>
        </div>
    </div>
</div>

<?php include __DIR__ . '/includes/shop-footer.php'; ?>
