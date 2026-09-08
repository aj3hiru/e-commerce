<?php
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;

// Cache settings (Start/Stop toggle, TTL, Never-Cache list) are managed from
// /admin/cache-manager.php and stored in includes/cache_settings.json.
$__cs_file = __DIR__ . '/includes/cache_settings.json';
$__cs = ['disabled' => false, 'ttl_homepage' => 3600, 'exclude_urls' => ''];
if (file_exists($__cs_file)) {
    $__loaded = json_decode((string)@file_get_contents($__cs_file), true);
    if (is_array($__loaded)) { $__cs = array_merge($__cs, $__loaded); }
}
$__cache_excluded = false;
if (trim((string)$__cs['exclude_urls']) !== '') {
    $__req_path = strtok($_SERVER['REQUEST_URI'] ?? '/', '?');
    foreach (preg_split('/\r\n|\r|\n/', $__cs['exclude_urls']) as $__line) {
        $__line = trim($__line);
        if ($__line !== '' && strpos($__req_path, $__line) === 0) { $__cache_excluded = true; break; }
    }
}

$cf="cache/index_$page.html";
if(!$__cs['disabled'] && !$__cache_excluded && file_exists($cf)&&time()-filemtime($cf)<(int)$__cs['ttl_homepage']){readfile($cf);exit;}
ob_start();

require_once __DIR__ . '/includes/config.php';
require_once INCLUDES_PATH . '/minify.php';
require_once INCLUDES_PATH . '/functions.php';


// SEO SECTION ARRAY
$seo = [
    'title' => 'New Vacancy 2026 – Latest Government Bharti 2026 Apply Online | EduMint24',

    'description' => 'Check all New Vacancy 2026 updates including latest government bharti.',

    'image' => SEO_DEFAULT_IMAGE,

    'type' => SEO_DEFAULT_TYPE,
    
    'robots' => SEO_DEFAULT_ROBOTS
];


// FAQ SECTION ARRAY
$faqs = [

    [
        'question' =>
            'How can I apply for new government jobs online in 2026?',

        'answer_html' =>
            'To apply for <strong>new government jobs 2026 online</strong>, just click the official link we shared in the post. You’ll go on the application page click on “Apply Online” button, fill in your basic details, upload the required documents, and submit. It’s a easy process.',
    ],

    [
        'question' =>
            'Which government jobs are available for 12th pass students?',

        'answer_html' =>
            'Many job openings exist for <strong>12th-pass candidates</strong> like SSC, Railways, Police, Army, Post Office, and various state departments. We update new vacancies every day on our <a href="/categories/12th-pass-govt-jobs">12th Pass Govt Jobs</a> page, so save it and check regularly.',
    ],

    [
        'question' =>
            'What documents do I need to apply for government jobs online?',

        'answer_html' =>
            'Most applications ask for your 10th/12th mark sheets, a recent passport size photo, signature, Aadhaar or ID proof, and caste/category certificate (if applicable). Some posts also need a domicile certificate or experience letter. The exact list is always in the official notification check it on <a href="' . SITE_URL . '">' . APP_NAME . '</a> before you filling the form.',
    ],

    [
        'question' =>
            'How will I know the exam date and when the admit card is released?',

        'answer_html' =>
            'Once you’ve applied, keep an eye on the official website or our <a href="/categories/admit-card">Admit Cards</a> section. We post the admit cards information and share confirmed exam dates so you never miss it.',
    ],

    [
        'question' =>
            'Can I directly apply online for new government jobs 2026 from your website?',

        'answer_html' =>
            'No, we don’t host the application forms but we give you the <strong>official apply online link</strong> for every <strong>new government job 2026</strong> when it’s released. Just click the link in the post, and you’ll be taken straight to the real government portal (like <a href="https://ssc.gov.in/">ssc.gov.in</a>, <a href="https://upsconline.nic.in">upsconline.nic.in</a>, etc.) to fill and submit your form safely.',
    ],

];




// Fetch posts by category slug, limit 10
function getPostsByCategory(PDO $pdo, string $slug, int $limit = 10): array {
    $stmt = $pdo->prepare("
        SELECT p.id, p.title, p.slug, p.date
        FROM posts p
        JOIN categories c ON p.category_id = c.id
        WHERE c.slug = :slug AND p.status = 'published'
        ORDER BY p.date DESC
        LIMIT :limit
    ");
    $stmt->bindValue(':slug', $slug);
    $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function getRecentPosts(PDO $pdo, int $limit = 10): array {
    $stmt = $pdo->prepare("
        SELECT p.id, p.title, p.slug, p.date
        FROM posts p
        WHERE p.status = 'published'
        ORDER BY p.date DESC
        LIMIT :limit
    ");
    $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

// "New" badge – posts within last 3 days
function isNew(string $dateStr): bool {
    return (time() - strtotime($dateStr)) < (3 * 86400);
}

$recentPosts = getRecentPosts($pdo);
$admitCards  = getPostsByCategory($pdo, 'admit-card'); 
$answerKeys  = getPostsByCategory($pdo, 'answer-key');   
$results     = getPostsByCategory($pdo, 'result');       
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
<title><?= htmlspecialchars($seo['title'], ENT_QUOTES, 'UTF-8') ?></title>
<?php require_once ROOT_PATH . '/components/head_script.php'; ?>

	
<style id="home-sls">
 /* ── Hero Search Section ───────────────────────── */
.hero-search-section {
  padding: var(--space-4) 0;
}

.hero-search-card {
  background: var(--gradient-primary);
  border-radius: var(--border-radius-lg);
  padding: var(--space-10) var(--space-8);
  text-align: center;
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}

.hero-search-card::before,
.hero-search-card::after {
  content: "";
  position: absolute;
  border-radius: 50%;
  opacity: 0.15;
  pointer-events: none;
}
.hero-search-card::before {
  width: 300px; height: 300px;
  background: #fff;
  top: -80px; right: -60px;
}
.hero-search-card::after {
  width: 200px; height: 200px;
  background: #fff;
  bottom: -60px; left: -40px;
}

.hero-search-label {
  font-family: var(--font-heading);
  font-size: var(--text-2xl);
  font-weight: var(--weight-bold);
  color: var(--text-white);
  margin-bottom: var(--space-2);
  line-height: var(--leading-tight);
}

.hero-search-sub {
  font-size: var(--text-base);
  color: rgba(255, 255, 255, 0.75);
  margin-bottom: var(--space-6);
}

.hero-search-form {
  display: flex;
  align-items: center;
  max-width: 560px;
  margin: 0 auto;
  background: var(--bg-card);
  border-radius: var(--border-radius-full);
  padding: 5px 5px 5px var(--space-5);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
  gap: var(--space-2);
}

.hero-search-input {
  flex: 1;
  border: none;
  outline: none;
  font-family: var(--font-body);
  font-size: var(--text-base);
  color: var(--text-body);
  background: transparent;
  min-width: 0;
}

.hero-search-input::placeholder {
  color: var(--text-faint);
}

.hero-search-btn {
  background: var(--gradient-dark);
  color: var(--text-white);
  border: none;
  border-radius: var(--border-radius-full);
  padding: 0 var(--space-6);
  height: 38px;
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
  cursor: pointer;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: var(--space-2);
  flex-shrink: 0;
  transition: opacity var(--ease-fast);
}

.hero-search-btn:hover { opacity: 0.88; }

/* ── Category Buttons ──────────────────────────── */
.hero-categories {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: var(--space-3);
  margin-top: var(--space-5);
  list-style: none;
  padding: 0;
}

.hc-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-4) var(--space-2);
  background: var(--bg-card);
  border: var(--border-width) solid var(--border-light);
  border-radius: var(--border-radius-md);
  text-decoration: none;
  color: var(--text-secondary);
  box-shadow: var(--shadow-sm);
  transition:
    background var(--ease-fast),
    border-color var(--ease-fast),
    color var(--ease-fast),
    box-shadow var(--ease-fast),
    transform var(--ease-fast);
}

.hc-item:hover {
  background: var(--color-primary-soft);
  border-color: var(--color-primary-light);
  color: var(--color-primary);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.hc-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hc-icon svg {
  width: 28px;
  height: 28px;
  stroke: var(--text-muted);
  fill: none;
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: stroke var(--ease-fast);
}

.hc-item:hover .hc-icon svg {
  stroke: var(--color-primary);
}

.hc-name {
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  text-align: center;
  line-height: var(--leading-tight);
}

/* ── Responsive ────────────────────────────────── */
@media (max-width: 900px) {
  .hero-categories { grid-template-columns: repeat(4, 1fr); }
}

@media (max-width: 560px) {
  .hero-search-card { padding: var(--space-8) var(--space-5); }
  .hero-search-label { font-size: var(--text-xl); }
  .hero-categories { grid-template-columns: repeat(4, 1fr); gap: var(--space-2); }
  .hc-item { padding: var(--space-3) var(--space-1); }
}




/* ── Home Tables Section ───────────────────────── */

.home-tables-section {
  padding: var(--space-4) 0;
}

/* ── 4-Column Grid ─────────────────────────────── */
.home-tables-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-5);
}

/* ── Table Card ────────────────────────────────── */
.ht-card {
  background: var(--bg-card);
  border-radius: var(--border-radius-sm);
  border: var(--border-width) solid var(--border-light);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.ht-card.recent { --ht-accent: var(--color-primary); }
.ht-card.admit  { --ht-accent: #0ea5e9;  }
.ht-card.answer { --ht-accent: #10b981; }
.ht-card.result { --ht-accent: #f59e0b; }

/* ── Card Header ───────────────────────────────── */
.ht-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-3) var(--space-4);
  border-bottom: var(--border-width) solid var(--border-light);
  border-left: 3px solid var(--ht-accent);
  background: var(--bg-subtle);
}

.ht-card-title {
  font-family: var(--font-heading);
  font-size: var(--text-md);
  font-weight: var(--weight-bold);
  color: var(--text-primary);
}

.ht-view-all {
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  color: var(--ht-accent);
  text-decoration: none;
  transition: opacity var(--ease-fast);
}
.ht-view-all:hover { opacity: 0.7; }

/* ── Table ─────────────────────────────────────── */
.ht-table {
  width: 100%;
  border-collapse: collapse;
  flex: 1;
}

.ht-table thead tr {
  background: #f8f6ff;
}

.ht-table th {
  padding: var(--space-2) var(--space-3);
  text-align: left;
  font-size: 11px;
  font-weight: var(--weight-semibold);
  color: var(--text-muted);
  border-bottom: var(--border-width) solid var(--border-light);
  text-transform: uppercase;
  letter-spacing: var(--letter-wide);
  white-space: nowrap;
}

.ht-table tbody tr {
  border-bottom: var(--border-width) solid var(--border-light);
  transition: background var(--ease-fast);
}
.ht-table tbody tr:last-child { border-bottom: none; }
.ht-table tbody tr:hover { background: var(--color-primary-soft); }

.ht-table td {
  padding: var(--space-2) var(--space-3);
  vertical-align: middle;
}

/* ── Column: Date ──────────────────────────────── */
.col-date {
  width: 52px;
  white-space: nowrap;
  color: var(--text-muted);
  font-size: 11px;
  line-height: var(--leading-tight);
}

/* ── Column: Title ─────────────────────────────── */
.col-title { max-width: 0; }

.col-title-inner {
  display: flex;
  align-items: center;
  overflow: hidden;
}

.col-title-inner a {
  display: block;
  overflow: hidden;
/*  white-space: nowrap;
  text-overflow: ellipsis; */
  color: var(--text-body);
  font-size: var(--text-xs);
  text-decoration: none;
  min-width: 0;
  transition: color var(--ease-fast);
}
.col-title-inner a:hover { color: var(--color-primary); }

/* ── Column: Action ────────────────────────────── */
.col-action {
  width: 44px;
  text-align: center;
}

/* ── View Button ───────────────────────────────── */
.ht-btn {
  display: inline-block;
  background: var(--ht-accent);
  color: var(--text-white);
  font-size: 10px;
  font-weight: var(--weight-semibold);
  padding: 2px var(--space-2);
  border-radius: var(--border-radius-full);
  text-decoration: none;
  transition: opacity var(--ease-fast);
}
.ht-btn:hover { opacity: 0.82; }

/* ── New Badge ─────────────────────────────────── */
.ht-new {
  display: inline-block;
  background: #ef4444;
  color: var(--text-white);
  font-size: 9px;
  font-weight: var(--weight-bold);
  padding: 1px var(--space-1);
  border-radius: var(--border-radius-xs);
  margin-right: var(--space-1);
  line-height: 1.4;
  flex-shrink: 0;
}

/* ── Responsive ────────────────────────────────── */
@media (max-width: 1100px) {
  .home-tables-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 600px) {
  .home-tables-grid { grid-template-columns: 1fr; }
}
</style>


    <!-- Breadcrumbs Schema MARKUP SEO -->
    	<script type="application/ld+json">
{  
 "@context": "https://schema.org",
 "@type": "BreadcrumbList",
 "itemListElement": [
  {
   "@type": "ListItem",
   "position": 1,
   "name": "Home",
   "item": <?= json_encode(SITE_URL) ?>
  }
 ]
}
</script>

<!-- Recent Posts Schema MARKUP SEO -->
<script type="application/ld+json">
<?= json_encode([
    '@context' => 'https://schema.org',
    '@type'    => 'ItemList',

    'name' =>
        'Recent Posts - ' . SITE_NAME,

    'url' =>
        SITE_URL,

    'numberOfItems' =>
        count($recentPosts),

    'itemListElement' => array_map(
        static function ($post, $index) {

            return [
                '@type'    => 'ListItem',

                'position' =>
                    $index + 1,

                'url' =>
                    SITE_URL . postUrl($post['slug'], $post['id']),

                'item' => [
                    '@type' => 'BlogPosting',

                    'headline' =>
                        $post['title'],

                    'datePublished' =>
                        date('c', strtotime($post['date'])),

                    'mainEntityOfPage' => [
                        '@type' => 'WebPage',

                        '@id' =>
                            SITE_URL . postUrl($post['slug'], $post['id']),
                    ],
                ],
            ];

        },
        $recentPosts,
        array_keys($recentPosts)
    ),

], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) ?>
</script>


</head>
<body>
<?php require_once ROOT_PATH . '/components/header.php'; ?>
    <main>    	
        <div class="container">
<section class="hero-search-section">

  <!-- Gradient Search Card -->
  <form class="hero-search-card" action="/search" method="get">
  <h1 class="hero-search-label">Find Government Jobs 2026</h1>

  <p class="hero-search-sub">
    Search from thousands of latest sarkari naukri updates
  </p>

  <div class="hero-search-form">
    <input
      class="hero-search-input"
      name="q"
      type="search"
      placeholder="Search jobs, exams, results…"
      autocomplete="off"
      required
    />

    <button type="submit" class="hero-search-btn">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
      Search
    </button>
  </div>
</form>

  <!-- Category Buttons -->
  <nav class="hero-categories" aria-label="Job Categories">

    <a href="/categories/government-jobs" class="hc-item">
      <span class="hc-icon">
        <svg viewBox="0 0 24 24"><path d="M3 21h18M3 10h18M12 3L3 10h18L12 3z"/><rect x="5" y="10" width="3" height="11"/><rect x="10.5" y="10" width="3" height="11"/><rect x="16" y="10" width="3" height="11"/></svg>
      </span>
      <span class="hc-name">Govt Jobs</span>
    </a>

    <a href="/categories/ssc-jobs" class="hc-item">
      <span class="hc-icon">
        <svg viewBox="0 0 24 24"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7h8M8 11h8M8 15h5"/></svg>
      </span>
      <span class="hc-name">SSC</span>
    </a>

    <a href="/categories/railway-jobs" class="hc-item">
      <span class="hc-icon">
        <svg viewBox="0 0 24 24"><rect x="4" y="3" width="16" height="13" rx="3"/><path d="M4 10h16M8 16l-2 5M16 16l2 5M12 16v5"/><circle cx="8" cy="13" r="1" fill="currentColor" stroke="none"/><circle cx="16" cy="13" r="1" fill="currentColor" stroke="none"/></svg>
      </span>
      <span class="hc-name">Railway</span>
    </a>

    <a href="/categories/banking-jobs" class="hc-item">
      <span class="hc-icon">
        <svg viewBox="0 0 24 24"><path d="M3 21h18M3 10h18M12 3L3 10h18L12 3z"/><line x1="6" y1="10" x2="6" y2="21"/><line x1="10" y1="10" x2="10" y2="21"/><line x1="14" y1="10" x2="14" y2="21"/><line x1="18" y1="10" x2="18" y2="21"/></svg>
      </span>
      <span class="hc-name">Banking</span>
    </a>

    <a href="/categories/upsc-jobs" class="hc-item">
      <span class="hc-icon">
        <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
      </span>
      <span class="hc-name">UPSC</span>
    </a>

    <a href="/categories/10th-pass-govt-jobs" class="hc-item">
      <span class="hc-icon">
        <svg viewBox="0 0 24 24"><path d="M4 19V7a2 2 0 012-2h12a2 2 0 012 2v12"/><path d="M4 19a2 2 0 002 2h12a2 2 0 002-2"/><path d="M9 11h1V9H9v2zm0 0v4"/><path d="M13 9v6m0-6a1.5 1.5 0 011.5 1.5v3A1.5 1.5 0 0113 15"/></svg>
      </span>
      <span class="hc-name">10th Pass</span>
    </a>

    <a href="/categories/12th-pass-govt-jobs" class="hc-item">
      <span class="hc-icon">
        <svg viewBox="0 0 24 24"><path d="M22 9L12 5 2 9l10 4 10-4z"/><path d="M6 11v5c0 2 2.5 4 6 4s6-2 6-4v-5"/></svg>
      </span>
      <span class="hc-name">12th Pass</span>
    </a>

    <a href="/categories" class="hc-item">
      <span class="hc-icon">
        <svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
      </span>
      <span class="hc-name">All Jobs</span>
    </a>

  </nav>

</section>
 
<h2 class="m-h2">Latest New Vacancy 2026 - Sarkari Jobs & Government Bharti</h2>   
            <?php
// Reusable table renderer
function renderHtTable(array $posts, string $cardClass, string $title, string $viewAllUrl): void {
    ?>
    <div class="ht-card <?= $cardClass ?>">
      <div class="ht-card-header">
        <span class="ht-card-title"><?= htmlspecialchars($title) ?></span>
        <a href="<?= $viewAllUrl ?>" class="ht-view-all">View All »</a>
      </div>
      <table class="ht-table">
        <thead>
          <tr>
            <th class="col-date">Date</th>
            <th class="col-title">Post Title</th>
            <th class="col-action">Link</th>
          </tr>
        </thead>
        <tbody>
          <?php foreach ($posts as $post): ?>
          <tr>
            <td class="col-date"><?= date('d M', strtotime($post['date'])) ?></td>
            <td class="col-title">
              <div class="col-title-inner">
                <?php if (isNew($post['date'])): ?>
                  <span class="ht-new">New</span>
                <?php endif; ?>
                <a href="<?= postUrl($post['slug'], $post['id']) ?>">
                  <?= htmlspecialchars($post['title']) ?>
                </a>
              </div>
            </td>
            <td class="col-action">
              <a href="<?= postUrl($post['slug'], $post['id']) ?>" class="ht-btn">View</a>
            </td>
          </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
    </div>
    <?php
}
?>

<section class="home-tables-section">
    <div class="home-tables-grid">
      <?php
        renderHtTable($recentPosts, 'recent', 'Recent Updates',    '/latest-updates');
        renderHtTable($admitCards,  'admit', 'Admit Card',         '/categories/admit-card');
        renderHtTable($answerKeys,  'answer', 'Answer Key',          '/categories/answer-key');
        renderHtTable($results,     'result', 'Result',              '/categories/result');
      ?>
    </div>
</section>
            
        </div> <!-- container closer -->
    

<?php require_once ROOT_PATH . '/components/faq.php'; ?>

    </main>
    <?php require_once ROOT_PATH . '/components/footer.php'; ?>
    
</body>
</html>
<?php
$minified = minifyHTML(ob_get_clean());
if (!$__cs['disabled'] && !$__cache_excluded) {
    file_put_contents($cf, $minified) or error_log("Failed to write cache: $cf");
}
echo $minified;
?>