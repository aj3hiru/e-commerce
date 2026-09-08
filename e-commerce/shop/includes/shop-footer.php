<?php
// Uses $shop_biz, $shop_biz_name from shop-header.php (already included on every page before this)
$footer_biz = $shop_biz ?? ($pdo->query("SELECT * FROM ecom_business_settings ORDER BY id ASC LIMIT 1")->fetch(PDO::FETCH_ASSOC) ?: []);
$footer_biz_name = $shop_biz_name ?? ($footer_biz['business_name'] ?: $site_name);
$footer_numbers = !empty($footer_biz['contact_numbers']) ? (json_decode($footer_biz['contact_numbers'], true) ?: []) : [];
$footer_social = !empty($footer_biz['social_media_json']) ? (json_decode($footer_biz['social_media_json'], true) ?: []) : [];
$SOCIAL_ICON_SVG = [
    'facebook'  => '<path d="M13.5 21v-7.2h2.4l.35-2.8h-2.75V9.2c0-.8.22-1.35 1.38-1.35H16.4V5.35C16.1 5.32 15.1 5.2 13.9 5.2c-2.4 0-4.05 1.47-4.05 4.15v2.65H7.4v2.8h2.45V21h3.65Z"/>',
    'instagram' => '<rect x="4.5" y="4.5" width="15" height="15" rx="4.5" fill="none" stroke="#fff" stroke-width="1.6"/><circle cx="12" cy="12" r="3.4" fill="none" stroke="#fff" stroke-width="1.6"/><circle cx="16.3" cy="7.7" r="1"/>',
    'youtube'   => '<rect x="3.5" y="6.5" width="17" height="11" rx="3" fill="none" stroke="#fff" stroke-width="1.6"/><path fill="#fff" d="M10.3 9.6v4.8l4.3-2.4-4.3-2.4Z"/>',
    'x'         => '<rect x="11" y="4" width="2" height="16" rx="1" transform="rotate(45 12 12)"/><rect x="11" y="4" width="2" height="16" rx="1" transform="rotate(-45 12 12)"/>',
    'linkedin'  => '<rect x="5.3" y="10.2" width="2.6" height="8"/><circle cx="6.6" cy="6.9" r="1.5"/><path d="M10.5 10.2h2.5v1.3c.5-.85 1.5-1.5 2.8-1.5 2.1 0 3.3 1.4 3.3 4v4.2h-2.6v-3.8c0-1-.4-1.8-1.4-1.8-.85 0-1.4.6-1.6 1.1-.1.25-.1.55-.1.85v3.65h-2.6v-8Z"/>',
    'whatsapp'  => '<path d="M12 4a8 8 0 0 0-6.9 12l-1 3.6 3.7-1A8 8 0 1 0 12 4Zm4.6 11.4c-.2.6-1.1 1.1-1.6 1.2-.4.05-1 .07-1.6-.1-.35-.1-.8-.25-1.4-.5-2.4-1.05-4-3.5-4.1-3.65-.12-.16-1-1.3-1-2.5 0-1.2.6-1.8.85-2.05.2-.4.35-.4.5-.4h.4c.15 0 .3 0 .45.35.15.35.55 1.35.6 1.45.05.1.1.2 0 .35s-.15.25-.25.4c-.1.1-.2.25-.3.35-.1.1-.2.25-.1.45.15.25.6 1 1.3 1.6.9.8 1.6 1.05 1.9 1.15.25.1.4.1.55-.05.15-.15.6-.7.75-.95.15-.25.3-.2.5-.1.2.1 1.35.65 1.6.75.25.1.4.15.45.25.05.1.05.6-.15 1.15Z"/>',
];
?>
  </div><!-- /.page-container -->

  <!-- ============ MOBILE NAV DRAWER ============ -->
  <div id="overlay"></div>
  <aside id="sidebar" aria-label="Mobile Navigation" aria-hidden="true">
    <div class="sidebar-top">
      <div class="sidebar-actions">
        <button class="sidebar-icon-btn" id="closeBtn" type="button" aria-label="Close Menu">
          <svg viewBox="0 0 24 24" width="20" height="20"><path d="M6 6l12 12M18 6 6 18"/></svg>
        </button>
      </div>

      <div class="sidebar-account">
        <div class="sidebar-welcome">
          <span class="sidebar-avatar">
            <svg viewBox="0 0 24 24" width="22" height="22"><circle cx="12" cy="8" r="4"/><path d="M4 20c1.5-4.5 5-6 8-6s6.5 1.5 8 6"/></svg>
          </span>
          <span><?php if ($shop_customer): ?>Welcome, <?= htmlspecialchars(explode(' ', $shop_customer['name'])[0]) ?>!<?php else: ?>Welcome to <?= htmlspecialchars($footer_biz_name) ?>!<?php endif; ?></span>
        </div>
        <?php if (!$shop_customer): ?>
        <a href="/shop/login.php" class="sidebar-signin">Sign In / Register</a>
        <?php else: ?>
        <a href="/shop/logout.php" class="sidebar-signin">Logout</a>
        <?php endif; ?>
      </div>
    </div>

    <nav class="sidebar-nav" role="navigation" aria-label="Mobile Menu">
      <a class="sidebar-nav-item" href="/shop/">
        <span class="sidebar-nav-icon"><svg viewBox="0 0 24 24"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M9 21v-6h6v6"/></svg></span>
        <span>Home</span>
      </a>
      <a class="sidebar-nav-item" href="/shop/index.php#categories">
        <span class="sidebar-nav-icon"><svg viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M3 13h18"/></svg></span>
        <span>All Categories</span>
      </a>
      <?php if ($shop_customer): ?>
      <a class="sidebar-nav-item" href="/shop/account.php#orders">
        <span class="sidebar-nav-icon"><svg viewBox="0 0 24 24"><path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2V6z"/><path d="M9 4v14M15 6v14"/></svg></span>
        <span>My Orders</span>
      </a>
      <a class="sidebar-nav-item" href="/shop/wishlist.php">
        <span class="sidebar-nav-icon"><svg viewBox="0 0 24 24"><path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 01-3.4 0"/></svg></span>
        <span>Wishlist</span>
      </a>
      <?php endif; ?>
      <a class="sidebar-nav-item" href="/shop/cart.php">
        <span class="sidebar-nav-icon"><svg viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2 3h2l2.6 12.4a2 2 0 002 1.6h9.7a2 2 0 002-1.6L22 7H6"/></svg></span>
        <span>My Cart</span>
      </a>
    </nav>

    <?php if (!empty($footer_social)): ?>
    <div class="sidebar-social">
      <p class="sidebar-social-title">Follow Us on Social Media</p>
      <div class="sidebar-social-row">
        <?php foreach ($footer_social as $s): $icon = $SOCIAL_ICON_SVG[$s['platform']] ?? null; if (!$icon) continue; ?>
        <a href="<?= htmlspecialchars($s['url']) ?>" target="_blank" rel="noopener noreferrer" class="sidebar-social-link" aria-label="<?= htmlspecialchars(ucfirst($s['platform'])) ?>">
          <svg viewBox="0 0 24 24" width="20" height="20"><?= $icon ?></svg>
        </a>
        <?php endforeach; ?>
      </div>
    </div>
    <?php endif; ?>
  </aside>

  <!-- ============ FOOTER ============ -->
  <footer class="site-footer" role="contentinfo">
    <div class="footer-inner">

      <div class="footer-main">

        <div class="footer-col footer-about">
          <div class="f-logo">
            <?php if (!empty($footer_biz['logo'])): ?>
              <img src="/<?= htmlspecialchars($footer_biz['logo']) ?>" alt="<?= htmlspecialchars($footer_biz_name) ?>">
            <?php else: ?>
              <span><?= htmlspecialchars($footer_biz_name) ?></span>
            <?php endif; ?>
          </div>
          <p><?= htmlspecialchars($footer_biz['tagline'] ?: 'Your everyday store — fresh products and daily essentials, delivered to your doorstep.') ?></p>
          <?php if (!empty($footer_social)): ?>
          <div class="footer-social-row">
            <?php foreach ($footer_social as $s): $icon = $SOCIAL_ICON_SVG[$s['platform']] ?? null; if (!$icon) continue; ?>
            <a href="<?= htmlspecialchars($s['url']) ?>" target="_blank" rel="noopener noreferrer" aria-label="<?= htmlspecialchars(ucfirst($s['platform'])) ?>">
              <svg viewBox="0 0 24 24"><?= $icon ?></svg>
            </a>
            <?php endforeach; ?>
          </div>
          <?php endif; ?>
        </div>

        <div class="footer-col">
          <h4>Quick Links</h4>
          <ul class="footer-links">
            <li><a href="/shop/">Home</a></li>
            <li><a href="/shop/index.php#categories">All Categories</a></li>
            <li><a href="/shop/cart.php">My Cart</a></li>
            <li><a href="/shop/account.php">My Account</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Get in Touch</h4>
          <ul class="footer-contact-list">
            <?php if (!empty($footer_numbers[0])): ?>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.4 2.1L8.1 9.7a16 16 0 0 0 6.2 6.2l1.2-1.2a2 2 0 0 1 2.1-.4c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2Z"/></svg>
              <span><?= htmlspecialchars($footer_numbers[0]) ?></span>
            </li>
            <?php endif; ?>
            <?php if (!empty($footer_biz['email'])): ?>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>
              <span><?= htmlspecialchars($footer_biz['email']) ?></span>
            </li>
            <?php endif; ?>
            <?php if (!empty($footer_biz['address'])): ?>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s6-6.2 6-10.5A6 6 0 0 0 6 10.5C6 14.8 12 21 12 21zM12 12.5a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/></svg>
              <span><?= htmlspecialchars($footer_biz['address']) ?></span>
            </li>
            <?php endif; ?>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Customer Service</h4>
          <ul class="footer-links">
            <li><a href="/shop/account.php">My Account</a></li>
            <li><a href="/shop/order.php">Track Order</a></li>
            <?php if (!empty($footer_biz['return_policy'])): ?><li><a href="/shop/index.php#returns">Returns &amp; Refunds</a></li><?php endif; ?>
          </ul>
        </div>

      </div>

      <div class="footer-bottom">
        <p class="footer-copy">&copy; <?= date('Y') ?> <?= htmlspecialchars($footer_biz_name) ?>. All rights reserved.</p>
      </div>
    </div>
  </footer>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

  <script>
    const bannerEl = document.getElementById('bannerSlider');
    if (bannerEl) {
      const slides = document.querySelectorAll('#bannerSlider .slide');
      const dots = document.querySelectorAll('.slider-dots .dot');
      const counter = document.getElementById('slideCounter');
      let current = 0;
      let autoTimer = null;

      function goTo(i){
        i = (i + slides.length) % slides.length;
        slides[current].classList.remove('active');
        dots[current].classList.remove('active');
        current = i;
        slides[current].classList.add('active');
        dots[current].classList.add('active');
        if (counter) counter.textContent = (current+1) + '/' + slides.length;
      }

      function startAuto(){
        clearInterval(autoTimer);
        autoTimer = setInterval(()=> goTo(current+1), 4000);
      }

      dots.forEach((dot,i)=> dot.addEventListener('click', ()=>{ goTo(i); startAuto(); }));
      if (slides.length) { goTo(0); startAuto(); }

      let touchStartX = 0, touchEndX = 0;
      bannerEl.addEventListener('touchstart', e=>{
        touchStartX = e.changedTouches[0].screenX;
      }, {passive:true});
      bannerEl.addEventListener('touchend', e=>{
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 40 && slides.length){
          if (diff > 0) goTo(current+1); else goTo(current-1);
          startAuto();
        }
      }, {passive:true});
    }
  </script>

  <script>
    (()=>{
      const m = document.getElementById("menuToggle"),
            c = document.getElementById("closeBtn"),
            s = document.getElementById("sidebar"),
            o = document.getElementById("overlay");
      if(!m||!s||!o) return;
      const setMenu = open=>{
        s.classList.toggle("active", open);
        o.classList.toggle("active", open);
        s.setAttribute("aria-hidden", String(!open));
        document.body.style.overflow = open ? "hidden" : "";
      };
      m.addEventListener("click", ()=> setMenu(true));
      c && c.addEventListener("click", ()=> setMenu(false));
      o.addEventListener("click", ()=> setMenu(false));
      document.addEventListener("keydown", e=>{ if(e.key==="Escape") setMenu(false); });
      s.addEventListener("click", e=>{
        if(e.target.closest(".sidebar-nav-item")) setMenu(false);
      });
    })();
  </script>

  <script>
    document.querySelectorAll('.img-wrap img, .thumb img, .img2 img, .f-logo img, .logo .mark').forEach(img => {
      img.addEventListener('error', function(){
        this.style.objectFit = 'contain';
        this.style.padding = '20%';
        this.style.background = '#f0f0f0';
        this.onerror = null;
        this.src = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%236b7280" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>'
        );
      });
    });
  </script>

  <!-- ── Add-to-cart wiring (shared across storefront) ── -->
  <script>
    document.addEventListener('click', function (e) {
      const btn = e.target.closest('.add-cart');
      if (!btn) return;
      e.preventDefault();
      const productId = btn.dataset.productId;
      if (!productId) return;
      const original = btn.innerHTML;
      btn.disabled = true;
      fetch('/shop/ajax.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'action=add_to_cart&product_id=' + encodeURIComponent(productId) + '&qty=1'
      })
      .then(r => r.json())
      .then(data => {
        btn.disabled = false;
        if (data.success) {
          document.querySelectorAll('.cart-badge .count').forEach(el => el.textContent = data.cart_count);
          const totalEls = document.querySelectorAll('.cart-badge .label');
          totalEls.forEach(el => { if (el.textContent.trim().startsWith('₹')) el.textContent = '₹' + Number(data.cart_total).toLocaleString('en-IN'); });
          btn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>ADDED';
          setTimeout(() => { btn.innerHTML = original; }, 1200);
        } else {
          btn.innerHTML = original;
          alert(data.message || 'Could not add to cart.');
        }
      })
      .catch(() => { btn.disabled = false; btn.innerHTML = original; });
    });
  </script>

</body>
</html>
