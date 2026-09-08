<?php
// functions.php - Helper Functions

function generateSlug($text) {
    $slug = strtolower($text);
    $slug = preg_replace('/\s+/', '-', $slug);
    $slug = preg_replace('/[^a-z0-9\-]/', '', $slug);
    $slug = preg_replace('/-+/', '-', $slug);
    $slug = trim($slug, '-');
    return $slug;
}

function postUrl($slug, $id) {
    return "/{$slug}-{$id}";
}

function tagUrl($slug, $id) {
    return "/tag/{$slug}-{$id}";
}

function storyUrl($slug, $id) {
    return "/story/{$slug}-{$id}";
}

function formatViews($views) {
    if ($views >= 1000000) {
        return round($views / 1000000, 1) . 'M';
    } elseif ($views >= 1000) {
        return round($views / 1000, 1) . 'K';
    }
    return $views;
}

// Fetch comments (with pagination and total)
function getCommentTree($pdo, $post_id, $offset = 0, $limit = 5) {
    $stmt = $pdo->prepare("SELECT c.id, c.post_id, c.parent_id, c.name, c.content, c.date, p.name AS parent_name, COUNT(*) OVER() AS total_count FROM comments c LEFT JOIN comments p ON c.parent_id = p.id WHERE c.post_id = ? ORDER BY c.date ASC LIMIT ?, ?");
    $stmt->bindValue(1, $post_id, PDO::PARAM_INT);
    $stmt->bindValue(2, $offset, PDO::PARAM_INT);
    $stmt->bindValue(3, $limit, PDO::PARAM_INT);
    $stmt->execute();
    $comments = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if (!$comments) return [[], 0];
    $total = (int)$comments[0]['total_count'];
    $tree = [];
    $map = [];
    foreach ($comments as $c) {
        $c['children'] = [];
        unset($c['total_count']); 
        $map[$c['id']] = $c;
        if ($c['parent_id'] && isset($map[$c['parent_id']])) {
            $map[$c['parent_id']]['children'][] = &$map[$c['id']];
        } else {
            $tree[] = &$map[$c['id']];
        }
    }
    return [$tree, $total];
}

function renderComments($comments, $depth=0) {
    foreach ($comments as $comment) {
        $replyClass = $depth > 0 ? 'blog-comment-item blog-comment-reply' : 'blog-comment-item';
        $date = date('M j, Y \a\t g:i a', strtotime($comment['date']));
        echo "<div class='$replyClass' data-comment-id='{$comment['id']}'>";
        echo "<div class='blog-comment-header'>";
        echo "<span class='blog-comment-author'>".htmlspecialchars($comment['name'])."</span>";
        echo "<span class='blog-comment-date'>$date</span>";
        echo "</div>";
        if ($comment['parent_id'] && $comment['parent_name']) {
            echo "<div style='color:#6c757d;font-size:0.75rem;margin-bottom:5px;'>Replying to <strong>".htmlspecialchars($comment['parent_name'])."</strong></div>";
        }
        echo "<div class='blog-comment-content'>".nl2br(htmlspecialchars($comment['content']))."</div>";
        echo "<div class='blog-comment-actions'>";
       echo "<button class='blog-comment-reply-btn' data-id='{$comment['id']}' data-name='".htmlspecialchars($comment['name'], ENT_QUOTES)."'>Reply</button>"; 
        echo "</div>";
        echo "</div>";
        if (!empty($comment['children'])) {
            renderComments($comment['children'], $depth+1);
        }
    }
}

// TOC Generation
function generateTOC($c){
    if(!$c||!is_string($c))return['toc'=>'','content'=>$c];
    $i=[];$l=2;$t='<div class="toc"><h2>Table of Contents</h2><ol>';
    $c=preg_replace_callback('/<h([2-6])>(.*?)<\/h\1>/i',function($a)use(&$t,&$i,&$l){
        $lev=(int)$a[1];$hPlain=trim(strip_tags($a[2]));$hHTML=trim($a[2]);if(!$hPlain)return $a[0];
        $id=trim(preg_replace('/[^a-zA-Z0-9]+/','-',$hPlain),'-');
        $i[$id]=($i[$id]??0)+1;$uid=$i[$id]>1?"$id-{$i[$id]}":$id;
        while($lev<$l){$t.='</li></ol>'; $l--;}
        while($lev>$l){$t.='<ol>'; $l++;}
        if($lev==$l && $l>2)$t.='</li>';
        $t.="<li><a href='#$uid'>".htmlspecialchars($hPlain)."</a>";
        return "<h$lev id='$uid'>$hHTML</h$lev>";
    },$c);
    while($l>2){$t.='</li></ol>'; $l--;}
    $t.='</li></ol></div>';
    return['toc'=>$t,'content'=>$c];
}

// ────────────────────────────────────────
// CSRF helpers — added for the Comments Manager moderation workflow
// (approve / unapprove / delete / reply). Every function below is wrapped
// in function_exists() so this block is purely additive and can never
// collide with anything already defined in this file.
// ───────────────────────────────────────
if (!function_exists('csrfToken')) {
    function csrfToken(): string {
        if (empty($_SESSION['csrf_token'])) {
            $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
        }
        return $_SESSION['csrf_token'];
    }
}

if (!function_exists('csrfValid')) {
    function csrfValid(): bool {
        $sent = $_POST['csrf_token'] ?? $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';
        return $sent !== '' && !empty($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], $sent);
    }
}

if (!function_exists('requireCsrf')) {
    function requireCsrf(bool $json = false): void {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') return;
        if (csrfValid()) return;
        http_response_code(403);
        if ($json) {
            header('Content-Type: application/json');
            echo json_encode(['success' => false, 'message' => 'Invalid or missing CSRF token. Please refresh the page and try again.']);
        } else {
            echo 'Security error: invalid or missing CSRF token. Please go back, refresh the page, and try again.';
        }
        exit;
    }
}

if (!function_exists('csrfGetValid')) {
    // GET-based token check for simple links (e.g. the comment delete
    // link), where a full POST form isn't practical.
    function csrfGetValid(): bool {
        $sent = $_GET['token'] ?? '';
        return $sent !== '' && !empty($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], $sent);
    }
}
?>