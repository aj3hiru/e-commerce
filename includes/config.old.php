<?php
// config.php
// Database Connection
$dhost = '127.0.0.1';
$port = 3306;
$dbname = 'careerdiksha';
$user = 'root';
$pass = 'root'; 

try {
    $pdo = new PDO("mysql:host=$dhost;port=$port;dbname=$dbname", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}

$config = [
    'push_secret' => '7f9c3a1e8b2d4f6g5h7j9k1m3n5p7q9r0s2t4u6v8w0x2y4z',
    'vapid' => [
        'subject'    => 'mailto:admin@edumint24.com',
        'publicKey'  => 'BHE89PpiPS69Y57UhMN4HTkTl16Vm3Pj1OXZ46CMuPiGuLbVE5ndJLSN3YUjGyWN9zpy7Ac08zRhqyCuCWR3wcI',
        'privateKey' => 'agCs58N0PZ6rpIDwFK747qn4b_MhUI2BaeEz_4sWSqI',
    ],
];


// Global Site Variables
$site_name = 'EduMint24';
$site_url = 'https://edumint24.com';
$site_logo = $site_url . '/assets/img/logo.webp';
$seo_image = $site_url . '/assets/img/seo_og_default.png'; // Recommended: 1200x630px for OG, 1200x1200 for Twitter
$contact_email = "contact@edumint24.com";
$company_address = "Begun, Chittorgarh, Rajasthan, India 312023";
$phone_number = "+91730-018-3212";

// Get current URLs dynamically
$scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on') ? 'https' : 'http';
$host = $_SERVER['HTTP_HOST'];
$uri = $_SERVER['REQUEST_URI'];
$current_url = "$scheme://$host$uri";
if (!empty($_GET['page']) && $_GET['page'] > 1) {
    $seo_canonical = $current_url;
} else {
    $path = strtok($uri, '?');
    $seo_canonical = "$scheme://$host$path";
}


// SEO Defaults (these will be used if not overridden on the page)
$seo_title = htmlspecialchars($site_name) . ' | Latest Government Job Updates 2025';
$seo_description = 'Get latest government job updates, sarkari naukri notifications, admit cards, results, and exam alerts. Your trusted source for govt jobs 2025.';
$seo_keywords = 'govt jobs, sarkari naukri, government jobs, job notifications, admit card, result, government recruitment, latest jobs 2025';
$seo_type = 'website'; // Options: website, article, blog, etc
$seo_robots = 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';

$log_ip = $_SERVER['REMOTE_ADDR'] ?? 'UNKNOWN';
            $log_ua = $_SERVER['HTTP_USER_AGENT'] ?? 'UNKNOWN';