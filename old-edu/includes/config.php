<?php
declare(strict_types=1);
session_start();

// ======================================
// ROOT PATHS
// ======================================

define('ROOT_PATH', dirname(__DIR__));

const INCLUDES_PATH = ROOT_PATH . '/includes';
const ADMIN_PATH    = ROOT_PATH . '/admin';
const ASSETS_PATH   = ROOT_PATH . '/assets';
const UPLOADS_PATH  = ROOT_PATH . '/uploads';


// ======================================
// APP CONFIGURATION
// ======================================

const APP_NAME           = 'EduMint24';
const APP_URL            = 'https://edumint24.com';
const APP_ENV            = 'production';
const APP_DEBUG          = false;
const APP_TIMEZONE       = 'Asia/Kolkata';
const APP_VERSION        = '1.0.0';
const THEME_COLOR = '#7c3aed';

date_default_timezone_set(APP_TIMEZONE);

// ======================================
// DATABASE CONFIGURATION
// ======================================

const DB_HOST            = '127.0.0.1';
const DB_PORT            = 3306;
const DB_NAME            = 'edumint24';
const DB_USER            = 'edumint24';
const DB_PASS            = 'edumint24@aj3';
const DB_CHARSET         = 'utf8mb4';



// ======================================
// PUSH NOTIFICATION CONFIG
// ======================================

const PUSH_SECRET        = '7f9c3a1e8b2d4f6g5h7j9k1m3n5p7q9r0s2t4u6v8w0x2y4z';

const VAPID_SUBJECT      = 'mailto:admin@edumint24.com';
const VAPID_PUBLIC_KEY   = 'BHE89PpiPS69Y57UhMN4HTkTl16Vm3Pj1OXZ46CMuPiGuLbVE5ndJLSN3YUjGyWN9zpy7Ac08zRhqyCuCWR3wcI';
const VAPID_PRIVATE_KEY  = 'agCs58N0PZ6rpIDwFK747qn4b_MhUI2BaeEz_4sWSqI';

// ======================================
// SITE INFORMATION
// ======================================

const SITE_NAME          = APP_NAME;
const SITE_URL           = APP_URL;

const SITE_LOGO          = SITE_URL . '/assets/img/logo.webp';
const SEO_DEFAULT_IMAGE  = SITE_URL . '/assets/img/seo_og_default.png';

const CONTACT_EMAIL      = 'contact@edumint24.com';
const COMPANY_ADDRESS    = 'Begun, Chittorgarh, Rajasthan, India 312023';
const PHONE_NUMBER       = '+917300183212';

const FOUNDING_YEAR      = '2026';

const SITE_FOOTER_TAGLINE = 'Trusted platform for government job updates, exams, results & career resources.';


// ======================================
// SOCIAL MEDIA
// ======================================

const SOCIAL_INSTAGRAM   = '';
const SOCIAL_THREADS     = '';
const SOCIAL_LINKEDIN    = '';
const SOCIAL_FACEBOOK    = '';
const SOCIAL_TWITTER     = '';
const SOCIAL_WHATSAPP    = '';
const SOCIAL_TELEGRAM    = '';
const SOCIAL_ARATT       = '';



// ======================================
// BACKWARD COMPATIBILITY VARIABLES
// ======================================

$site_name       = SITE_NAME;
$site_url        = SITE_URL;
$site_logo       = SITE_LOGO;
$seo_image       = SEO_DEFAULT_IMAGE;

$contact_email   = CONTACT_EMAIL;
$company_address = COMPANY_ADDRESS;
$phone_number    = PHONE_NUMBER;

// ======================================
// DATABASE CONNECTION
// ======================================

try {
    $dsn = sprintf(
        'mysql:host=%s;port=%d;dbname=%s;charset=%s',
        DB_HOST,
        DB_PORT,
        DB_NAME,
        DB_CHARSET
    );

    $pdo = new PDO(
        $dsn,
        DB_USER,
        DB_PASS,
        [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ]
    );
} catch (PDOException $e) {
    http_response_code(500);

    if (APP_DEBUG) {
        die('Database Connection Failed: ' . $e->getMessage());
    }

    die('Database connection failed.');
}

// ======================================
// PUSH CONFIG ARRAY
// ======================================

$config = [
    'push_secret' => PUSH_SECRET,
    'vapid' => [
        'subject'    => VAPID_SUBJECT,
        'publicKey'  => VAPID_PUBLIC_KEY,
        'privateKey' => VAPID_PRIVATE_KEY,
    ],
];

// ======================================
// DYNAMIC URLS
// ======================================

$scheme = (
    !empty($_SERVER['HTTPS']) &&
    $_SERVER['HTTPS'] !== 'off'
) ? 'https' : 'http';

$host = $_SERVER['HTTP_HOST'] ?? parse_url(SITE_URL, PHP_URL_HOST);
$uri  = $_SERVER['REQUEST_URI'] ?? '/';

$current_url = $scheme . '://' . $host . $uri;

if (
    !empty($_GET['page']) &&
    (int) $_GET['page'] > 1
) {
    $seo_canonical = $current_url;
} else {
    $path = strtok($uri, '?');
    $seo_canonical = $scheme . '://' . $host . $path;
}

// ======================================
// REQUEST LOGGING VARIABLES
// ======================================

$log_ip = $_SERVER['REMOTE_ADDR'] ?? 'UNKNOWN';
$log_ua = $_SERVER['HTTP_USER_AGENT'] ?? 'UNKNOWN';


// ======================================
// SEO DEFAULTS
// ====================================== 

const SEO_DEFAULT_TITLE =
    SITE_NAME . ' | Latest Government Job Updates 2025';

const SEO_DEFAULT_DESCRIPTION =
    'Get latest government job updates, sarkari naukri notifications, admit cards, results, and exam alerts. Your trusted source for govt jobs 2025.';

const SEO_DEFAULT_TYPE    = 'website';

const SEO_DEFAULT_ROBOTS  =
    'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';
    

// ======================================
// PAGE SEO DEFAULT VARIABLES
// ======================================

$seo = [
    'title' => SEO_DEFAULT_TITLE,

    'description' => SEO_DEFAULT_DESCRIPTION,

    'image' => SEO_DEFAULT_IMAGE,

    'type' => SEO_DEFAULT_TYPE,
    
    'robots' => SEO_DEFAULT_ROBOTS
];


// ======================================
// PAGINATION
// ======================================

const POSTS_PER_PAGE            = 9;
const COMMENTS_PER_PAGE         = 20;