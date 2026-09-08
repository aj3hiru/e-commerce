"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SITE, NAV_LINKS, SIDEBAR_LINKS } from "@/lib/siteData";
import { useCart } from "./CartContext";
import {
  CartIcon,
  UserIcon,
  HeartIcon,
  PinIcon,
  ChevronDownIcon,
  ClockIcon,
  SearchIcon,
  HamburgerIcon,
} from "./Icons";

export default function Header({ customer }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { count, total, wishlist } = useCart();
  const firstName = customer?.name?.split(" ")[0] || "";

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/";
  };

  return (
    <>
      {/* ============ DESKTOP HEADER ============ */}
      <header className="topbar">
        <Link href="/" className="logo" aria-label={`${SITE.name} home`}>
          <Image className="mark" src={SITE.logo} alt={`${SITE.name} logo`} width={150} height={44} priority />
        </Link>

        <div className="location">
          <PinIcon width={18} height={18} />
          <div>
            <span className="addr">
              Banjara...
              <ChevronDownIcon width={12} height={12} />
            </span>
            <span className="city">na, India</span>
          </div>
        </div>

        <div className="delivery-info">
          Earliest <span className="hl">Home Delivery</span> available
          <div className="slot">
            <ClockIcon width={14} height={14} />
            Today 12:00 PM - 03:00 PM
          </div>
        </div>

        <form className="search-wrap" onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Search for Agarbatti" />
          <button type="submit">SEARCH</button>
        </form>

        <div className="header-actions">
          {customer ? (
            <div className="item" style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <Link href="/account" className="item" style={{ gap: 7 }}>
                <UserIcon className="icon" />
                <span className="label">Hi, {firstName}</span>
              </Link>
              <button type="button" onClick={handleLogout} style={{ fontSize: 13, fontWeight: 600, color: "#c62828" }}>
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login" className="item">
              <UserIcon className="icon" />
              <span className="label">Sign In / Register</span>
            </Link>
          )}
          <Link href="/wishlist" className="item cart-badge">
            <HeartIcon className="icon" />
            {wishlist.length > 0 && <span className="count">{wishlist.length}</span>}
          </Link>
          <Link href="/cart" className="item cart-badge">
            <CartIcon className="icon" fill="none" stroke="currentColor" strokeWidth="1.8" />
            <span className="count">{count}</span>
            <span className="label">₹{total}</span>
          </Link>
        </div>
      </header>

      <nav className="navbar">
        {NAV_LINKS.map((link) => (
          <Link key={link.label} href={link.href} className={link.active ? "active" : ""}>
            {link.label}
          </Link>
        ))}
      </nav>

      {/* ============ MOBILE HEADER ============ */}
      <div className="mobile-topbar">
        <HamburgerIcon className="hamburger-mobile" onClick={() => setSidebarOpen(true)} />
        <Link href="/" className="logo" aria-label={`${SITE.name} home`}>
          <Image className="mark" src={SITE.logo} alt={`${SITE.name} logo`} width={110} height={34} />
        </Link>
        <div className="mobile-actions">
          <Link href="/wishlist" className="cart-badge">
            <HeartIcon className="icon" />
            {wishlist.length > 0 && <span className="count">{wishlist.length}</span>}
          </Link>
          <Link href="/cart" className="cart-badge">
            <CartIcon className="icon" fill="none" stroke="currentColor" strokeWidth="1.8" />
            <span className="count">{count}</span>
          </Link>
          <Link href="/login">
            <UserIcon className="icon" />
          </Link>
        </div>
      </div>
      <div className="mobile-search">
        <div className="box">
          <SearchIcon />
          <span>
            Search for <b>Sugar</b>
          </span>
        </div>
      </div>

      {/* ============ MOBILE NAV DRAWER ============ */}
      <div id="overlay" className={sidebarOpen ? "active" : ""} onClick={() => setSidebarOpen(false)} />
      <aside id="sidebar" className={sidebarOpen ? "active" : ""} aria-hidden={!sidebarOpen}>
        <div className="sidebar-top">
          <div className="sidebar-actions">
            <button className="sidebar-icon-btn" type="button" aria-label="Close Menu" onClick={() => setSidebarOpen(false)}>
              <svg viewBox="0 0 24 24" width="20" height="20"><path d="M6 6l12 12M18 6 6 18" /></svg>
            </button>
            <span className="sidebar-icon-btn sidebar-icon-btn--badge" aria-hidden="true">
              <HeartIcon width={18} height={18} fill="#fff" stroke="none" />
            </span>
            <span className="sidebar-weather">
              <span>Weather</span>
            </span>
            <button className="sidebar-icon-btn sidebar-icon-btn--search" type="button" aria-label="Search">
              <SearchIcon width={20} height={20} />
            </button>
          </div>

          <div className="sidebar-account">
            <div className="sidebar-welcome">
              <span className="sidebar-avatar">
                <UserIcon width={22} height={22} />
              </span>
              <span>{customer ? `Hi, ${firstName}!` : `Welcome to ${SITE.name}!`}</span>
            </div>
            {customer ? (
              <div style={{ display: "flex", gap: 8 }}>
                <Link href="/account" className="sidebar-signin" style={{ flex: 1 }}>My Account</Link>
                <button type="button" onClick={handleLogout} className="sidebar-signin" style={{ flex: 1, background: "#c62828" }}>Logout</button>
              </div>
            ) : (
              <Link href="/login" className="sidebar-signin">Sign In / Register</Link>
            )}
          </div>
        </div>

        <nav className="sidebar-nav" role="navigation" aria-label="Mobile Menu">
          {SIDEBAR_LINKS.map((link) => (
            <Link key={link.label} className="sidebar-nav-item" href={link.href} onClick={() => setSidebarOpen(false)}>
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>

        <div className="sidebar-social">
          <p className="sidebar-social-title">Follow Us on Social Media</p>
          <div className="sidebar-social-row">
            <a href="#" target="_blank" rel="noopener noreferrer" className="sidebar-social-link" aria-label="WhatsApp">
              <svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 4a8 8 0 0 0-6.9 12l-1 3.6 3.7-1A8 8 0 1 0 12 4Zm4.6 11.4c-.2.6-1.1 1.1-1.6 1.2-.4.05-1 .07-1.6-.1-.35-.1-.8-.25-1.4-.5-2.4-1.05-4-3.5-4.1-3.65-.12-.16-1-1.3-1-2.5 0-1.2.6-1.8.85-2.05.2-.4.35-.4.5-.4h.4c.15 0 .3 0 .45.35.15.35.55 1.35.6 1.45.05.1.1.2 0 .35s-.15.25-.25.4c-.1.1-.2.25-.3.35-.1.1-.2.25-.1.45.15.25.6 1 1.3 1.6.9.8 1.6 1.05 1.9 1.15.25.1.4.1.55-.05.15-.15.6-.7.75-.95.15-.25.3-.2.5-.1.2.1 1.35.65 1.6.75.25.1.4.15.45.25.05.1.05.6-.15 1.15Z" /></svg>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="sidebar-social-link" aria-label="Instagram">
              <svg viewBox="0 0 24 24" width="20" height="20"><rect x="4.5" y="4.5" width="15" height="15" rx="4.5" fill="none" stroke="#fff" strokeWidth="1.6" /><circle cx="12" cy="12" r="3.4" fill="none" stroke="#fff" strokeWidth="1.6" /><circle cx="16.3" cy="7.7" r="1" fill="#fff" /></svg>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="sidebar-social-link" aria-label="X / Twitter">
              <svg viewBox="0 0 24 24" width="20" height="20"><rect x="11" y="4" width="2" height="16" rx="1" transform="rotate(45 12 12)" /><rect x="11" y="4" width="2" height="16" rx="1" transform="rotate(-45 12 12)" /></svg>
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
