import Link from "next/link";
import Image from "next/image";
import { SITE, FOOTER_QUICK_LINKS, FOOTER_SERVICE_LINKS } from "@/lib/siteData";

export default function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-inner">
        <div className="footer-main">
          <div className="footer-col footer-about">
            <div className="f-logo">
              <Image src={SITE.logo} alt={`${SITE.name} logo`} width={130} height={38} />
            </div>
            <p>Your everyday grocery store — fresh produce, daily essentials and household needs, delivered to your doorstep.</p>
            <div className="footer-social-row">
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <svg viewBox="0 0 24 24"><path d="M12 4a8 8 0 0 0-6.9 12l-1 3.6 3.7-1A8 8 0 1 0 12 4Zm4.6 11.4c-.2.6-1.1 1.1-1.6 1.2-.4.05-1 .07-1.6-.1-.35-.1-.8-.25-1.4-.5-2.4-1.05-4-3.5-4.1-3.65-.12-.16-1-1.3-1-2.5 0-1.2.6-1.8.85-2.05.2-.4.35-.4.5-.4h.4c.15 0 .3 0 .45.35.15.35.55 1.35.6 1.45.05.1.1.2 0 .35s-.15.25-.25.4c-.1.1-.2.25-.3.35-.1.1-.2.25-.1.45.15.25.6 1 1.3 1.6.9.8 1.6 1.05 1.9 1.15.25.1.4.1.55-.05.15-.15.6-.7.75-.95.15-.25.3-.2.5-.1.2.1 1.35.65 1.6.75.25.1.4.15.45.25.05.1.05.6-.15 1.15Z" /></svg>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg viewBox="0 0 24 24"><path d="M13.5 21v-7.2h2.4l.35-2.8h-2.75V9.2c0-.8.22-1.35 1.38-1.35H16.4V5.35C16.1 5.32 15.1 5.2 13.9 5.2c-2.4 0-4.05 1.47-4.05 4.15v2.65H7.4v2.8h2.45V21h3.65Z" /></svg>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg viewBox="0 0 24 24"><rect x="4.5" y="4.5" width="15" height="15" rx="4.5" fill="none" stroke="#fff" strokeWidth="1.6" /><circle cx="12" cy="12" r="3.4" fill="none" stroke="#fff" strokeWidth="1.6" /><circle cx="16.3" cy="7.7" r="1" /></svg>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="X / Twitter">
                <svg viewBox="0 0 24 24"><rect x="11" y="4" width="2" height="16" rx="1" transform="rotate(45 12 12)" /><rect x="11" y="4" width="2" height="16" rx="1" transform="rotate(-45 12 12)" /></svg>
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              {FOOTER_QUICK_LINKS.map((l) => (
                <li key={l.label}><Link href={l.href}>{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>Get in Touch</h4>
            <ul className="footer-contact-list">
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.4 2.1L8.1 9.7a16 16 0 0 0 6.2 6.2l1.2-1.2a2 2 0 0 1 2.1-.4c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2Z" /></svg>
                <span>{SITE.supportPhone}</span>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg>
                <span>{SITE.supportEmail}</span>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 21s6-6.2 6-10.5A6 6 0 0 0 6 10.5C6 14.8 12 21 12 21zM12 12.5a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" /></svg>
                <span>{SITE.address}</span>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Customer Service</h4>
            <ul className="footer-links">
              {FOOTER_SERVICE_LINKS.map((l) => (
                <li key={l.label}><Link href={l.href}>{l.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">&copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
