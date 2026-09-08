import Link from "next/link";
import FaqAccordion from "@/components/FaqAccordion";
import { SITE } from "@/lib/siteData";

export const metadata = { title: `FAQs — ${SITE.name}` };

const FAQS = [
  {
    q: "What are your delivery hours?",
    a: "We deliver every day from 8:00 AM to 10:00 PM. Most orders placed before 6:00 PM are delivered the same day.",
  },
  {
    q: "Is there a minimum order value?",
    a: "No minimum order value to shop, but orders below ₹500 attract a small delivery fee of ₹40. Orders ₹500 and above get free delivery.",
  },
  {
    q: "How do I track my order?",
    a: `Head to the "Track Order" page from your account or the footer, and enter your Order ID to see live status.`,
  },
  {
    q: "What is your return policy?",
    a: "Perishable items (fruits, vegetables, dairy) can be returned within 24 hours if damaged or incorrect. Non-perishables can be returned within 7 days, unopened. See our Returns & Refunds page for full details.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept Cash on Delivery, UPI (Google Pay, PhonePe, Paytm), and all major credit/debit cards.",
  },
  {
    q: "Do you deliver to my area?",
    a: `We currently serve 120+ cities. Enter your address at checkout and we'll let you know instantly if we deliver there.`,
  },
];

export default function FaqsPage() {
  return (
    <div className="page-container">
      <div className="breadcrumb">
        <Link href="/">Home</Link>
        <span className="sep">/</span>
        <span className="current">FAQs</span>
      </div>
      <div className="category-header">
        <h1>Frequently Asked Questions</h1>
      </div>

      <FaqAccordion items={FAQS} />
    </div>
  );
}
