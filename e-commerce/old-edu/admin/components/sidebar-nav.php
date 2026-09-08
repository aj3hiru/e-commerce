<?php $current_admin_page = basename($_SERVER['PHP_SELF']); ?>
<style>
/* Scoped styles for disabled/coming-soon nav links so this partial looks right
   even on pages that don't already define these classes in their own <style>. */
.sidebar-nav .nav-link.disabled { color: var(--gray-300, #d1d5db); cursor: default; }
.sidebar-nav .nav-link.disabled:hover { background: transparent; color: var(--gray-300, #d1d5db); }
.sidebar-nav .soon-badge { margin-left: auto; font-size: 0.625rem; font-weight: 700; background: var(--gray-100, #f3f4f6); color: var(--gray-400, #9ca3af); padding: 0.15rem 0.5rem; border-radius: 9999px; }
.sidebar-nav .nav-parent-row { display: flex; align-items: center; margin-bottom: 0.25rem; }
.sidebar-nav .nav-parent-row .nav-link { flex: 1; margin-bottom: 0; }
.sidebar-nav .nav-expand-btn { background: none; border: none; color: var(--gray-400, #9ca3af); width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; cursor: pointer; border-radius: var(--radius, 0.5rem); transition: transform 0.2s, background 0.15s; }
.sidebar-nav .nav-expand-btn:hover { background: var(--gray-50, #f9fafb); }
.sidebar-nav .nav-expand-btn.open i { transform: rotate(180deg); }
.sidebar-nav .nav-expand-btn i { transition: transform 0.2s; font-size: 0.75rem; }
.sidebar-nav .nav-submenu { overflow: hidden; max-height: 0; transition: max-height 0.25s ease; }
.sidebar-nav .nav-submenu.open { max-height: 200px; }
.sidebar-nav .nav-submenu .nav-link { padding-left: 2.75rem; font-size: 0.875rem; }
</style>
<aside class="sidebar" id="sidebar">
        <div class="sidebar-header">
            <a href="/admin/dashboard.php" class="brand">
                <div class="brand-icon">
                    <i class="fas fa-cube"></i>
                </div>
                <span><?= htmlspecialchars($site_name) ?></span>
            </a>
            <button class="close-sidebar" onclick="toggleSidebar()">
                <i class="fas fa-times"></i>
            </button>
        </div>

   <nav class="sidebar-nav">

    <div class="nav-section">
        <div class="nav-title">Main</div>

        <a href="/admin/dashboard.php" class="nav-link<?= $current_admin_page === 'dashboard.php' ? ' active' : '' ?>">
            <i class="fas fa-home"></i>
            Dashboard
        </a>

        <a href="/admin/blogs-manager.php" class="nav-link<?= $current_admin_page === 'blogs-manager.php' ? ' active' : '' ?>">
            <i class="fas fa-newspaper"></i>
            Blog Posts
        </a>

        <?php if (!empty($permissions['files']['access_file_manager'])): ?>
        <a href="/admin/file-manager.php" class="nav-link">
            <i class="fas fa-images"></i>
            File Manager
        </a>
        <?php endif; ?>

        <?php if (!empty($permissions['blogs']['manage_comments'])): ?>
        <a href="/admin/comments-manager.php" class="nav-link<?= $current_admin_page === 'comments-manager.php' ? ' active' : '' ?>">
            <i class="fas fa-comments"></i>
            Comments
        </a>
        <?php endif; ?>

        <?php if (!empty(array_filter($permissions['ecommerce'] ?? []))): ?>
        <a href="/admin/ecommerce/ecommerce-dashboard.php" class="nav-link<?= $current_admin_page === 'ecommerce-dashboard.php' ? ' active' : '' ?>">
            <i class="fas fa-chart-line"></i>
            E-commerce Dashboard
        </a>
        <?php endif; ?>

    </div>

    <?php if (!empty($permissions['push_notifications']['send'])): ?>
    <div class="nav-section">
        <div class="nav-title">Marketing</div>

        <a href="/push_notifications/push-manager.php" class="nav-link<?= $current_admin_page === 'push-manager.php' ? ' active' : '' ?>">
            <i class="fas fa-bell"></i>
            Push Notifications
        </a>

    </div>
    <?php endif; ?>

    <?php if (!empty($permissions['ecommerce']['manage_categories'])): ?>
    <?php $cat_group_open = in_array($current_admin_page, ['categories.php', 'subcategories.php'], true); ?>
    <div class="nav-section">
        <div class="nav-title">Manage Category</div>

        <div class="nav-parent-row">
            <a href="/admin/ecommerce/categories.php" class="nav-link<?= $current_admin_page === 'categories.php' ? ' active' : '' ?>">
                <i class="fas fa-list"></i>
                Categories
            </a>
            <button type="button" class="nav-expand-btn<?= $cat_group_open ? ' open' : '' ?>" onclick="toggleNavSubmenu(this, 'submenu-categories')">
                <i class="fas fa-chevron-down"></i>
            </button>
        </div>
        <div class="nav-submenu<?= $cat_group_open ? ' open' : '' ?>" id="submenu-categories">
            <a href="/admin/ecommerce/subcategories.php" class="nav-link<?= $current_admin_page === 'subcategories.php' ? ' active' : '' ?>">
                <i class="fas fa-list-ul"></i>
                Sub Categories
            </a>
        </div>

    </div>
    <?php endif; ?>

    <?php if (!empty($permissions['ecommerce']['manage_products'])): ?>
    <div class="nav-section">
        <div class="nav-title">Manage Products</div>

        <a href="/admin/ecommerce/brands.php" class="nav-link<?= $current_admin_page === 'brands.php' ? ' active' : '' ?>">
            <i class="fas fa-copyright"></i>
            Brands
        </a>

        <a href="/admin/ecommerce/add-product-form.php?type=physical" class="nav-link<?= $current_admin_page === 'add-product-form.php' ? ' active' : '' ?>">
            <i class="fas fa-plus-square"></i>
            Add Product
        </a>

        <a href="/admin/ecommerce/products.php" class="nav-link<?= $current_admin_page === 'products.php' ? ' active' : '' ?>">
            <i class="fas fa-boxes"></i>
            All Products
        </a>

        <a href="/admin/ecommerce/stock-out-products.php" class="nav-link<?= $current_admin_page === 'stock-out-products.php' ? ' active' : '' ?>">
            <i class="fas fa-box-open"></i>
            Stock Out Products
        </a>

        <a href="/admin/ecommerce/campaign-offer.php" class="nav-link<?= $current_admin_page === 'campaign-offer.php' ? ' active' : '' ?>">
            <i class="fas fa-percent"></i>
            Campaign Offer
        </a>

        <a href="/admin/ecommerce/csv-import-export.php" class="nav-link<?= $current_admin_page === 'csv-import-export.php' ? ' active' : '' ?>">
            <i class="fas fa-file-csv"></i>
            CSV Import &amp; Export
        </a>

        <a href="/admin/ecommerce/product-reviews.php" class="nav-link<?= $current_admin_page === 'product-reviews.php' ? ' active' : '' ?>">
            <i class="fas fa-star-half-alt"></i>
            Product Reviews
        </a>

    </div>
    <?php endif; ?>

    <?php if (!empty($permissions['ecommerce']['manage_orders'])): ?>
    <div class="nav-section">
        <div class="nav-title">Manage Orders</div>

        <a href="/admin/ecommerce/orders.php" class="nav-link<?= ($current_admin_page === 'orders.php' && empty($_GET['type'])) ? ' active' : '' ?>">
            <i class="fas fa-receipt"></i>
            All Orders
        </a>

        <a href="/admin/ecommerce/orders.php?type=Pending" class="nav-link<?= ($current_admin_page === 'orders.php' && ($_GET['type'] ?? '') === 'Pending') ? ' active' : '' ?>">
            <i class="fas fa-hourglass-half"></i>
            Pending Orders
        </a>

        <a href="/admin/ecommerce/orders.php?type=In+Progress" class="nav-link<?= ($current_admin_page === 'orders.php' && ($_GET['type'] ?? '') === 'In Progress') ? ' active' : '' ?>">
            <i class="fas fa-truck-loading"></i>
            Progress Orders
        </a>

        <a href="/admin/ecommerce/orders.php?type=Delivered" class="nav-link<?= ($current_admin_page === 'orders.php' && ($_GET['type'] ?? '') === 'Delivered') ? ' active' : '' ?>">
            <i class="fas fa-truck"></i>
            Delivered Orders
        </a>

        <a href="/admin/ecommerce/orders.php?type=Canceled" class="nav-link<?= ($current_admin_page === 'orders.php' && ($_GET['type'] ?? '') === 'Canceled') ? ' active' : '' ?>">
            <i class="fas fa-ban"></i>
            Canceled Orders
        </a>
    </div>
    <?php endif; ?>

    <?php if (!empty($permissions['ecommerce']['manage_customers'])): ?>
    <div class="nav-section">
        <div class="nav-title">Customers</div>

        <a href="/admin/ecommerce/customers.php" class="nav-link<?= $current_admin_page === 'customers.php' ? ' active' : '' ?>">
            <i class="fas fa-user-friends"></i>
            Customer List
        </a>
    </div>
    <?php endif; ?>

    <?php if (!empty($permissions['ecommerce']['manage_coupons'])): ?>
    <div class="nav-section">
        <div class="nav-title">Discounts</div>

        <a href="/admin/ecommerce/coupons.php" class="nav-link<?= $current_admin_page === 'coupons.php' ? ' active' : '' ?>">
            <i class="fas fa-percentage"></i>
            Set Coupons
        </a>
    </div>
    <?php endif; ?>

    <?php if (!empty($permissions['ecommerce']['manage_billing'])): ?>
    <div class="nav-section">
        <div class="nav-title">Billing</div>

        <a href="/admin/ecommerce/billing.php" class="nav-link<?= $current_admin_page === 'billing.php' ? ' active' : '' ?>">
            <i class="fas fa-cash-register"></i>
            Billing / POS
        </a>

        <a href="/admin/ecommerce/barcode-print.php" class="nav-link<?= $current_admin_page === 'barcode-print.php' ? ' active' : '' ?>">
            <i class="fas fa-barcode"></i>
            Print Barcodes
        </a>
    </div>
    <?php endif; ?>

    <?php if (!empty($permissions['ecommerce']['manage_payment'])): ?>
    <div class="nav-section">
        <div class="nav-title">Settings</div>

        <a href="/admin/ecommerce/payment.php" class="nav-link<?= $current_admin_page === 'payment.php' ? ' active' : '' ?>">
            <i class="fas fa-credit-card"></i>
            Payment
        </a>
    </div>
    <?php endif; ?>

    <div class="nav-section">
        <div class="nav-title">Content</div>

        <?php if (!empty($permissions['blogs']['manage_tags'])): ?>
        <a href="/admin/tag-manager.php" class="nav-link<?= $current_admin_page === 'tag-manager.php' ? ' active' : '' ?>">
            <i class="fas fa-tags"></i>
            Tag Manager
        </a>
        <?php endif; ?>
        	
        <?php if (!empty($permissions['blogs']['manage_categories'])): ?>
                <a href="/admin/categories-manager.php" class="nav-link<?= $current_admin_page === 'categories-manager.php' ? ' active' : '' ?>">
                    <i class="fas fa-list"></i>
                    Category Manager
                </a>
                <?php endif; ?>

        <?php if (!empty($permissions['analytics']['view_basic'])): ?>
        <a href="/admin/analytics.php" class="nav-link<?= $current_admin_page === 'analytics.php' ? ' active' : '' ?>">
            <i class="fas fa-chart-line"></i>
            Analytics
        </a>
        <?php endif; ?>

    </div>

    <div class="nav-section">
        <div class="nav-title">System</div>

        <?php if (!empty($permissions['settings']['maintenance_mode'])): ?>
        <a href="/admin/cache-manager.php" class="nav-link<?= $current_admin_page === 'cache-manager.php' ? ' active' : '' ?>">
            <i class="fas fa-bolt"></i>
            Cache Manager
        </a>
        <?php endif; ?>

        <?php if (!empty($permissions['security']['view_logs'])): ?>
        <a href="/admin/activity-logs.php" class="nav-link<?= $current_admin_page === 'activity-logs.php' ? ' active' : '' ?>">
            <i class="fas fa-history"></i>
            Activity Logs
        </a>
        <?php endif; ?>

        <?php if (!empty($permissions['users']['create'])): ?>
        <a href="/admin/user-manager.php" class="nav-link<?= $current_admin_page === 'user-manager.php' ? ' active' : '' ?>">
            <i class="fas fa-user"></i>
            Users Manager
        </a>
        <?php endif; ?>

        <a href="/admin/api/logout.php" class="nav-link">
            <i class="fas fa-sign-out-alt"></i>
            Logout 
        </a>

    </div>

</nav>    

        <div class="sidebar-footer">
            <div class="user-card">
                <div class="user-avatar">
                    <?= strtoupper(substr($username, 0, 1)) ?>
                </div>
                <div class="user-info">
                    <div class="user-name"><?= htmlspecialchars($username) ?></div>
                    <div class="user-role"><?= ucfirst(htmlspecialchars($_SESSION['role'])) ?></div>
                </div>
            </div>
        </div>

        <script>
        // Expand/collapse a nested sidebar submenu (e.g. Categories > Sub Categories)
        function toggleNavSubmenu(btn, submenuId) {
            var submenu = document.getElementById(submenuId);
            if (!submenu) return;
            btn.classList.toggle('open');
            submenu.classList.toggle('open');
        }

        // Keep the current page's nav-link in view inside the sidebar,
        // instead of the sidebar always resetting to its top on page load.
        // Scoped to .sidebar-nav only (block:'nearest'), so it never moves
        // the main page scroll and never touches toggleSidebar()/resize logic.
        document.addEventListener('DOMContentLoaded', function () {
            var activeLink = document.querySelector('.sidebar-nav .nav-link.active');
            if (activeLink) {
                activeLink.scrollIntoView({ block: 'nearest' });
            }
        });
        </script>
    </aside>