import Link from "next/link";
import { SITE } from "@/lib/siteData";

export const metadata = { title: `Returns & Refunds — ${SITE.name}` };

export default function ReturnsPage() {
  return (
    <div className="page-container">
      <div className="breadcrumb">
        <Link href="/">Home</Link>
        <span className="sep">/</span>
        <span className="current">Returns & Refunds</span>
      </div>
      <div className="category-header">
        <h1>Returns & Refunds Policy</h1>
      </div>

      <div className="policy-body">
        <h2>Perishable Items</h2>
        <p>
          Fruits, vegetables, dairy, and other perishable items can be returned within <strong>24 hours</strong> of
          delivery if they arrive damaged, spoiled, or different from what you ordered. Please raise a request from
          the "Track Order" page or contact our support team with photos of the item.
        </p>

        <h2>Non-Perishable Items</h2>
        <p>
          Packaged groceries, home care, and personal care products can be returned within <strong>7 days</strong> of
          delivery, provided the item is unopened, unused, and in its original packaging.
        </p>

        <h2>How to Request a Return</h2>
        <ul>
          <li>Go to "Track Order" and select the relevant order.</li>
          <li>Choose "Request Return" and select the item(s) and reason.</li>
          <li>Our team will schedule a pickup within 24–48 hours.</li>
        </ul>

        <h2>Refunds</h2>
        <p>
          Once the returned item is received and inspected, refunds are processed within <strong>5–7 business days</strong>
          {" "}to your original payment method. Cash on Delivery refunds are issued as {SITE.name} wallet credit or
          bank transfer.
        </p>

        <h2>Items That Cannot Be Returned</h2>
        <ul>
          <li>Opened or partially used personal care products, for hygiene reasons.</li>
          <li>Items marked as "non-returnable" on the product page.</li>
          <li>Products damaged due to misuse after delivery.</li>
        </ul>

        <p>
          For any questions, reach us at <strong>{SITE.supportEmail}</strong> or call <strong>{SITE.supportPhone}</strong>.
        </p>
      </div>
    </div>
  );
}
