<footer class="shop-footer">
    <div class="inner">
        <div class="row">
            <div class="col-md-4 mb-3">
                <h6><?= htmlspecialchars($site_name) ?></h6>
                <p style="font-size:0.9rem;">Your one-stop shop — online delivery and in-store pickup available in your area.</p>
            </div>
            <div class="col-md-4 mb-3">
                <h6>Shop</h6>
                <p class="mb-1"><a href="/shop/">Home</a></p>
                <p class="mb-1"><a href="/shop/cart.php">Cart</a></p>
                <p class="mb-1"><a href="/shop/account.php">My Account</a></p>
            </div>
            <div class="col-md-4 mb-3">
                <h6>Account</h6>
                <p class="mb-1"><a href="/shop/login.php">Login</a></p>
                <p class="mb-1"><a href="/shop/register.php">Create Account</a></p>
            </div>
        </div>
        <div class="bottom">&copy; <?= date('Y') ?> <?= htmlspecialchars($site_name) ?>. All rights reserved.</div>
    </div>
</footer>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script>
function addToCart(productId, qty) {
    qty = qty || 1;
    fetch('/shop/ajax.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'action=add_to_cart&product_id=' + productId + '&qty=' + qty
    })
    .then(r => r.json())
    .then(data => {
        if (data.success) {
            updateCartBadge(data.cart_count);
            if (typeof onAddedToCart === 'function') onAddedToCart();
        } else {
            alert(data.message || 'Could not add to cart.');
        }
    });
}

function updateCartBadge(count) {
    document.querySelectorAll('.shop-badge').forEach(el => el.remove());
    if (count > 0) {
        const cartBtn = document.querySelector('a[href="/shop/cart.php"]');
        if (cartBtn) {
            const span = document.createElement('span');
            span.className = 'shop-badge';
            span.textContent = count;
            cartBtn.appendChild(span);
        }
    }
}

function toggleWishlist(productId, btn) {
    fetch('/shop/ajax.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'action=toggle_wishlist&product_id=' + productId
    })
    .then(r => r.json())
    .then(data => {
        if (data.need_login) { window.location.href = '/shop/login.php'; return; }
        if (!data.success) { alert(data.message || 'Something went wrong.'); return; }
        const icon = btn.querySelector('i');
        if (data.wishlisted) {
            btn.classList.add('active');
            icon.classList.remove('far'); icon.classList.add('fas');
        } else {
            btn.classList.remove('active');
            icon.classList.remove('fas'); icon.classList.add('far');
        }
    });
}
</script>
</body>
</html>
