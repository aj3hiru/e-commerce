<?php
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Pragma: no-cache");
header("X-Frame-Options: DENY");
header("X-Content-Type-Options: nosniff");
header("Referrer-Policy: no-referrer");

require_once __DIR__ . '/../includes/config.php';
define('ADMIN_DASHBOARD', '/admin/dashboard.php');

// ── Security headers ───────────────────────────────────────────────────────

$seo_robots  = 'noindex, nofollow, noarchive, nosnippet';
$ip_address  = $_SERVER['REMOTE_ADDR']     ?? 'UNKNOWN';
$user_agent  = $_SERVER['HTTP_USER_AGENT'] ?? 'UNKNOWN';

// ── Already logged in — redirect ───────────────────────────────────────────
if (isset($_SESSION['user_id'], $_SESSION['role'])) {
    if (in_array($_SESSION['role'], ['admin', 'editor', 'author'], true)) {
        header("Location: " . ADMIN_DASHBOARD);
        exit;
    }
}

// ── Brute-force lockout (session-based, no extra table) ────────────────────
const MAX_ATTEMPTS = 5;
const LOCKOUT_SECS = 900; // 15 min

if (!isset($_SESSION['login_attempts'])) $_SESSION['login_attempts'] = 0;
if (!isset($_SESSION['lockout_until']))  $_SESSION['lockout_until']  = 0;

$locked    = $_SESSION['lockout_until'] > time();
$lock_left = $locked ? $_SESSION['lockout_until'] - time() : 0;

$error = '';

// ── POST handler ────────────────────────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] === 'POST' && !$locked) {

    // CSRF
    if (
        empty($_POST['csrf_token']) ||
        !hash_equals($_SESSION['csrf_token'] ?? '', $_POST['csrf_token'])
    ) {
        $error = 'Invalid request. Please refresh and try again.';

    } else {

        $username = trim($_POST['username'] ?? '');
        $password = $_POST['password']       ?? '';

        if (empty($username) || empty($password)) {
            $error = 'Username and password are required.';
        } else {
            try {
                $stmt = $pdo->prepare(
                    "SELECT id, username, email, password_hash, role, status, permissions
                     FROM users
                     WHERE username = ?
                     AND role IN ('admin','editor','author')
                     LIMIT 1"
                );
                $stmt->execute([$username]);
                $user = $stmt->fetch(PDO::FETCH_ASSOC);

                // Always run verify — prevents timing-based username enumeration
                $dummy   = '$2y$10$invaliddummyhashXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
                $pass_ok = password_verify($password, $user['password_hash'] ?? $dummy);

                if ($user && $pass_ok) {

                    if ($user['status'] === 'suspended') {
                        $error = 'Your account has been suspended. Contact the administrator.';
                        $pdo->prepare("INSERT INTO activity_logs (user_id, action_type, description, ip_address, user_agent) VALUES (?, 'login_blocked', ?, ?, ?)")
                            ->execute([$user['id'], "Suspended account login attempt: {$user['username']}", $ip_address, $user_agent]);

                    } elseif ($user['status'] === 'pending') {
                        $error = 'Your account is pending approval. Please wait for admin activation.';
                        $pdo->prepare("INSERT INTO activity_logs (user_id, action_type, description, ip_address, user_agent) VALUES (?, 'login_blocked', ?, ?, ?)")
                            ->execute([$user['id'], "Pending account login attempt: {$user['username']}", $ip_address, $user_agent]);

                    } else {
                        $permissions = json_decode($user['permissions'] ?? '{}', true);

                        if (empty($permissions['dashboard_access'])) {
                            $error = 'You do not have permission to access the admin panel.';
                            $pdo->prepare("INSERT INTO activity_logs (user_id, action_type, description, ip_address, user_agent) VALUES (?, 'login_denied', ?, ?, ?)")
                                ->execute([$user['id'], "No dashboard_access: {$user['username']}", $ip_address, $user_agent]);

                        } else {
                            // ── SUCCESS ──
                            $_SESSION['login_attempts'] = 0;
                            $_SESSION['lockout_until']  = 0;

                            session_regenerate_id(true); // prevent session fixation

                            $_SESSION['user_id']    = $user['id'];
                            $_SESSION['username']   = $user['username'];
                            $_SESSION['email']      = $user['email'];
                            $_SESSION['role']       = $user['role'];
                            $_SESSION['login_time'] = time();

                            $pdo->prepare("INSERT INTO activity_logs (user_id, action_type, description, ip_address, user_agent) VALUES (?, 'login_success', ?, ?, ?)")
                                ->execute([$user['id'], "Logged in as {$user['role']}: {$user['username']}", $ip_address, $user_agent]);

                            header("Location: " . ADMIN_DASHBOARD);
                            exit;
                        }
                    }

                } else {
                    // Wrong credentials
                    $_SESSION['login_attempts']++;

                    if ($_SESSION['login_attempts'] >= MAX_ATTEMPTS) {
                        $_SESSION['lockout_until'] = time() + LOCKOUT_SECS;
                        $locked    = true;
                        $lock_left = LOCKOUT_SECS;
                    } else {
                        $remaining = MAX_ATTEMPTS - $_SESSION['login_attempts'];
                        $error     = 'Invalid username or password. ' . $remaining . ' attempt' . ($remaining !== 1 ? 's' : '') . ' remaining.';
                    }

                    $pdo->prepare("INSERT INTO activity_logs (user_id, action_type, description, ip_address, user_agent) VALUES (NULL, 'login_failed', ?, ?, ?)")
                        ->execute(["Failed login for: $username (attempt {$_SESSION['login_attempts']})", $ip_address, $user_agent]);
                }

            } catch (PDOException $e) {
                error_log($e->getMessage());
                $error = 'Database error. Please try again later.';
            }
        }
    }
}

// ── CSRF token ──────────────────────────────────────────────────────────────
if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}
$csrf_token = $_SESSION['csrf_token'];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="<?= htmlspecialchars($seo_robots) ?>">
    <title>Admin Login - <?= htmlspecialchars($site_name) ?></title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }

        :root {
            --primary: #4f46e5;
            --primary-dark: #4338ca;
            --primary-light: #e0e7ff;
            --danger: #dc2626;
            --danger-light: #fef2f2;
            --warning: #f59e0b;
            --warning-light: #fffbeb;
            --gray-50: #f9fafb;
            --gray-100: #f3f4f6;
            --gray-200: #e5e7eb;
            --gray-300: #d1d5db;
            --gray-400: #9ca3af;
            --gray-500: #6b7280;
            --gray-600: #4b5563;
            --gray-700: #374151;
            --gray-800: #1f2937;
            --gray-900: #111827;
            --shadow-xl: 0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1);
        }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }

        .login-wrapper {
            width: 100%;
            max-width: 420px;
            animation: fadeInUp 0.6s ease-out;
        }

        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to   { opacity: 1; transform: translateY(0); }
        }

        .login-card {
            background: #ffffff;
            border-radius: 20px;
            box-shadow: var(--shadow-xl);
            overflow: hidden;
        }

        .login-header {
            background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
            padding: 48px 40px 40px;
            text-align: center;
            position: relative;
        }

        .login-header::after {
            content: '';
            position: absolute;
            bottom: -20px;
            left: 0;
            right: 0;
            height: 40px;
            background: #ffffff;
            border-radius: 50% 50% 0 0;
        }

        .logo-container {
            width: 72px;
            height: 72px;
            background: rgba(255,255,255,0.15);
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.2);
        }

        .logo-container img { max-width: 40px; max-height: 40px; object-fit: contain; }
        .logo-fallback { font-size: 28px; color: #ffffff; }

        .login-header h1 {
            font-size: 26px;
            font-weight: 700;
            color: #ffffff;
            margin-bottom: 6px;
            letter-spacing: -0.5px;
        }

        .login-header p { font-size: 14px; color: rgba(255,255,255,0.85); }

        .login-body { padding: 32px 40px 40px; }

        /* ── Alerts ── */
        .alert-box {
            border-radius: 12px;
            padding: 14px 16px;
            margin-bottom: 24px;
            display: flex;
            align-items: flex-start;
            gap: 12px;
        }

        .alert-box i    { font-size: 18px; flex-shrink: 0; margin-top: 1px; }
        .alert-box span { font-size: 14px; font-weight: 500; line-height: 1.4; }

        .alert-error {
            background: var(--danger-light);
            border: 1px solid #fecaca;
            animation: shake 0.4s ease-in-out;
        }
        .alert-error i, .alert-error span { color: var(--danger); }

        /* Lockout */
        .lockout-box {
            background: var(--warning-light);
            border: 1px solid #fde68a;
            border-radius: 12px;
            padding: 24px 16px;
            margin-bottom: 24px;
            text-align: center;
        }

        .lockout-icon {
            width: 56px; height: 56px;
            background: #fef3c7;
            color: var(--warning);
            border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            font-size: 1.5rem;
            margin: 0 auto 12px;
        }

        .lockout-box h3 { font-size: 15px; font-weight: 700; color: #92400e; margin-bottom: 4px; }
        .lockout-box p  { font-size: 13px; color: #b45309; margin-bottom: 12px; }

        .countdown-display {
            font-size: 2rem;
            font-weight: 800;
            color: var(--warning);
            font-variant-numeric: tabular-nums;
            letter-spacing: -0.02em;
        }

        @keyframes shake {
            0%,100% { transform: translateX(0); }
            20%      { transform: translateX(-4px); }
            40%      { transform: translateX(4px); }
            60%      { transform: translateX(-4px); }
            80%      { transform: translateX(4px); }
        }

        /* ── Form ── */
        .form-group { margin-bottom: 20px; }
        .form-group:last-of-type { margin-bottom: 24px; }

        label {
            display: block;
            font-size: 13px;
            font-weight: 600;
            color: var(--gray-700);
            margin-bottom: 8px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .input-wrapper { position: relative; }

        .input-icon {
            position: absolute;
            left: 16px;
            top: 50%;
            transform: translateY(-50%);
            color: var(--gray-400);
            font-size: 18px;
            transition: color 0.2s ease;
            pointer-events: none;
        }

        input[type="text"],
        input[type="password"] {
            width: 100%;
            padding: 14px 16px 14px 48px;
            border: 2px solid var(--gray-200);
            border-radius: 12px;
            font-size: 15px;
            color: var(--gray-800);
            background: var(--gray-50);
            transition: all 0.2s ease;
            font-family: inherit;
        }

        input[type="text"]::placeholder,
        input[type="password"]::placeholder { color: var(--gray-400); }

        input[type="text"]:hover,
        input[type="password"]:hover { border-color: var(--gray-300); background: #ffffff; }

        input[type="text"]:focus,
        input[type="password"]:focus {
            outline: none;
            border-color: var(--primary);
            background: #ffffff;
            box-shadow: 0 0 0 4px var(--primary-light);
        }

        input:focus ~ .input-icon { color: var(--primary); }

        /* Password show/hide toggle */
        .toggle-password {
            position: absolute;
            right: 14px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: var(--gray-400);
            cursor: pointer;
            font-size: 16px;
            padding: 4px;
            display: flex;
            align-items: center;
            transition: color 0.2s;
        }
        .toggle-password:hover { color: var(--gray-600); }
        .password-input { padding-right: 46px !important; }

        /* ── Submit ── */
        .submit-btn {
            width: 100%;
            padding: 16px 24px;
            background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
            color: #ffffff;
            border: none;
            border-radius: 12px;
            font-size: 15px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            font-family: inherit;
            box-shadow: 0 4px 14px rgba(79,70,229,0.4);
        }

        .submit-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(79,70,229,0.5); }
        .submit-btn:active:not(:disabled) { transform: translateY(0); }
        .submit-btn:disabled { background: var(--gray-400); cursor: not-allowed; transform: none; box-shadow: none; }
        .submit-btn i { font-size: 16px; }

        .spinner {
            width: 18px; height: 18px;
            border: 2px solid rgba(255,255,255,0.3);
            border-top-color: #ffffff;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
            display: none;
        }

        .submit-btn.loading .spinner  { display: inline-block; }
        .submit-btn.loading .btn-text { display: none; }

        @keyframes spin { to { transform: rotate(360deg); } }

        /* ── Footer ── */
        .login-footer { margin-top: 28px; padding-top: 24px; border-top: 1px solid var(--gray-200); }

        .security-badge {
            display: flex; align-items: center; justify-content: center;
            gap: 8px; font-size: 12px; color: var(--gray-500); margin-bottom: 16px;
        }
        .security-badge i { color: #10b981; font-size: 14px; }

        .security-note {
            background: linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%);
            border: 1px solid #c7d2fe;
            border-radius: 10px;
            padding: 14px 16px;
            display: flex; align-items: flex-start; gap: 12px;
        }
        .security-note i      { color: var(--primary); font-size: 18px; margin-top: 1px; flex-shrink: 0; }
        .security-note span   { font-size: 13px; color: var(--gray-600); line-height: 1.5; }
        .security-note strong { color: var(--gray-800); display: block; margin-bottom: 2px; }

        /* ── Responsive ── */
        @media (max-width: 480px) {
            body { padding: 16px; }
            .login-header { padding: 36px 24px 32px; }
            .login-header h1 { font-size: 22px; }
            .login-body { padding: 24px; }
            .logo-container { width: 60px; height: 60px; }
            .logo-container img { max-width: 32px; max-height: 32px; }
            .logo-fallback { font-size: 24px; }
        }

        @media (prefers-color-scheme: dark) {
            body { background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%); }
        }
    </style>
</head>
<body>
    <div class="login-wrapper">
        <div class="login-card">

            <div class="login-header">
                <div class="logo-container">
                    <img src="/assets/img/logo.png" alt="<?= htmlspecialchars($site_name) ?>"
                         onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
                    <div class="logo-fallback" style="display:none;">
                        <i class="fas fa-shield-alt"></i>
                    </div>
                </div>
                <h1><?= htmlspecialchars($site_name) ?></h1>
                <p>Administrator Portal</p>
            </div>

            <div class="login-body">

                <?php if ($locked): ?>
                <div class="lockout-box">
                    <div class="lockout-icon"><i class="fas fa-lock"></i></div>
                    <h3>Account Temporarily Locked</h3>
                    <p>Too many failed attempts. Try again in:</p>
                    <div class="countdown-display" id="countdown">
                        <?= sprintf('%02d:%02d', floor($lock_left / 60), $lock_left % 60) ?>
                    </div>
                </div>

                <?php else: ?>

                <?php if ($error): ?>
                <div class="alert-box alert-error">
                    <i class="fas fa-exclamation-circle"></i>
                    <span><?= htmlspecialchars($error) ?></span>
                </div>
                <?php endif; ?>

                <form method="POST" action="" id="loginForm" autocomplete="off" novalidate>
                    <input type="hidden" name="csrf_token" value="<?= htmlspecialchars($csrf_token) ?>">

                    <div class="form-group">
                        <label for="username">Username</label>
                        <div class="input-wrapper">
                            <input type="text" id="username" name="username" required
                                   autocomplete="username"
                                   placeholder="Enter your username"
                                   value="<?= htmlspecialchars($_POST['username'] ?? '') ?>"
                                   autofocus>
                            <i class="fas fa-user input-icon"></i>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="password">Password</label>
                        <div class="input-wrapper">
                            <input type="password" id="password" name="password" required
                                   autocomplete="current-password"
                                   placeholder="Enter your password"
                                   class="password-input">
                            <i class="fas fa-lock input-icon"></i>
                            <button type="button" class="toggle-password" onclick="togglePass()" tabindex="-1" aria-label="Toggle password visibility">
                                <i class="fas fa-eye" id="toggleIcon"></i>
                            </button>
                        </div>
                    </div>

                    <button type="submit" class="submit-btn" id="submitBtn">
                        <span class="spinner"></span>
                        <span class="btn-text"><i class="fas fa-sign-in-alt"></i> Sign In to Dashboard</span>
                    </button>
                </form>

                <?php endif; ?>

                <div class="login-footer">
                    <div class="security-badge">
                        <i class="fas fa-lock"></i>
                        <span>Secure Admin Access Only</span>
                    </div>
                    <div class="security-note">
                        <i class="fas fa-shield-alt"></i>
                        <span>
                            <strong>Security Notice</strong>
                            Please ensure you're using a secure HTTPS connection before entering your credentials.
                        </span>
                    </div>
                </div>

            </div><!-- login-body -->
        </div><!-- login-card -->
    </div><!-- login-wrapper -->

    <script>
    function togglePass() {
        const inp  = document.getElementById('password');
        const icon = document.getElementById('toggleIcon');
        if (inp.type === 'password') {
            inp.type = 'text';
            icon.classList.replace('fa-eye', 'fa-eye-slash');
        } else {
            inp.type = 'password';
            icon.classList.replace('fa-eye-slash', 'fa-eye');
        }
    }

    const form = document.getElementById('loginForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            const u = document.getElementById('username').value.trim();
            const p = document.getElementById('password').value;
            if (!u || !p) { e.preventDefault(); return; }
            const btn = document.getElementById('submitBtn');
            btn.disabled = true;
            btn.classList.add('loading');
        });
    }

    // Lockout countdown — auto-reloads when expired
    (function () {
        const el = document.getElementById('countdown');
        if (!el) return;
        let secs = <?= (int)$lock_left ?>;
        const tick = setInterval(function () {
            secs--;
            if (secs <= 0) { clearInterval(tick); window.location.reload(); return; }
            const m = Math.floor(secs / 60);
            const s = secs % 60;
            el.textContent = (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
        }, 1000);
    })();
    </script>
</body>
</html>
