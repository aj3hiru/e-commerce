import Link from "next/link";

export default function AccountPage() {
  return (
    <div className="page-container">
      <div className="breadcrumb">
        <Link href="/">Home</Link>
        <span className="sep">/</span>
        <span className="current">My Account</span>
      </div>
      <div className="simple-page">
        <h1>My Account</h1>

        <div className="account-card">
          <h3>Profile</h3>
          <div className="account-row"><span>Name</span><span>Guest User</span></div>
          <div className="account-row"><span>Mobile</span><span>Not set</span></div>
          <div className="account-row"><span>Email</span><span>Not set</span></div>
        </div>

        <div className="account-card">
          <h3>Quick Links</h3>
          <div className="account-row"><Link href="/order">Track an Order</Link><span>→</span></div>
          <div className="account-row"><Link href="/wishlist">My Wishlist</Link><span>→</span></div>
          <div className="account-row"><Link href="/cart">My Cart</Link><span>→</span></div>
        </div>
      </div>
    </div>
  );
}
