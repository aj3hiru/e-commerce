import Link from "next/link";
import { SITE } from "@/lib/siteData";

export const metadata = { title: `Shipping Info — ${SITE.name}` };

export default function ShippingPage() {
  return (
    <div className="page-container">
      <div className="breadcrumb">
        <Link href="/">Home</Link>
        <span className="sep">/</span>
        <span className="current">Shipping Info</span>
      </div>
      <div className="category-header">
        <h1>Shipping Information</h1>
      </div>

      <div className="policy-body">
        <h2>Delivery Areas</h2>
        <p>
          {SITE.name} currently delivers to 120+ cities across India. Enter your address at checkout to instantly
          check if we deliver to your location.
        </p>

        <h2>Delivery Timing</h2>
        <ul>
          <li>Standard delivery: same-day for orders placed before 6:00 PM.</li>
          <li>Express delivery slots: within 2–3 hours in select cities.</li>
          <li>Delivery hours: 8:00 AM – 10:00 PM, every day.</li>
        </ul>

        <h2>Delivery Charges</h2>
        <p>
          Orders of <strong>₹500 or more</strong> qualify for <strong>free delivery</strong>. A flat delivery fee of{" "}
          <strong>₹40</strong> applies to orders below ₹500.
        </p>

        <h2>Order Tracking</h2>
        <p>
          Once your order is packed and out for delivery, you can track its live status anytime from the{" "}
          <Link href="/order" style={{ color: "var(--green-dark)", fontWeight: 700 }}>Track Order</Link> page.
        </p>

        <h2>Delivery Attempts</h2>
        <p>
          Our delivery partner will make up to 2 attempts to deliver your order. If unsuccessful, the order will be
          returned and a refund initiated as per our Returns & Refunds policy.
        </p>

        <p>
          For shipping questions, contact us at <strong>{SITE.supportEmail}</strong> or{" "}
          <strong>{SITE.supportPhone}</strong>.
        </p>
      </div>
    </div>
  );
}
