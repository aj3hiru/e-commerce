import ContactForm from "@/components/ContactForm";
import { SITE } from "@/lib/siteData";
import { getSettings } from "@/lib/settings";

export const metadata = { title: `Contact Us — ${SITE.name}` };

export default async function ContactUsPage() {
  const settings = await getSettings();
  return (
    <div>
      <div className="static-hero">
        <h1>Get in Touch</h1>
        <p>Questions, feedback, or need help with an order? We're here for you.</p>
      </div>

      <div className="page-container">
        <div className="contact-grid">
          <div>
            <div className="contact-info-list">
              <div className="contact-info-item">
                <span className="icon-box">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.4 2.1L8.1 9.7a16 16 0 0 0 6.2 6.2l1.2-1.2a2 2 0 0 1 2.1-.4c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2Z" /></svg>
                </span>
                <div>
                  <h4>Call Us</h4>
                  <p>{settings.support_phone}</p>
                  <p>Mon–Sat, 9:00 AM – 8:00 PM</p>
                </div>
              </div>
              <div className="contact-info-item">
                <span className="icon-box">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg>
                </span>
                <div>
                  <h4>Email Us</h4>
                  <p>{settings.support_email}</p>
                  <p>We reply within 24 hours</p>
                </div>
              </div>
              <div className="contact-info-item">
                <span className="icon-box">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 21s6-6.2 6-10.5A6 6 0 0 0 6 10.5C6 14.8 12 21 12 21zM12 12.5a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" /></svg>
                </span>
                <div>
                  <h4>Visit Us</h4>
                  <p>{settings.address}</p>
                </div>
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </div>
  );
}
