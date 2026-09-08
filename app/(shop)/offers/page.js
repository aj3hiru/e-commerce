import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getAllProductsByDiscount } from "@/lib/data";
import { SITE } from "@/lib/siteData";

export const metadata = { title: `Offers & Deals — ${SITE.name}` };
export const dynamic = "force-dynamic";

export default async function OffersPage() {
  const deals = await getAllProductsByDiscount();

  return (
    <div className="page-container">
      <div className="breadcrumb">
        <Link href="/">Home</Link>
        <span className="sep">/</span>
        <span className="current">Offers & Deals</span>
      </div>

      <div className="offers-hero">
        <h1>BIGGEST DEALS OF THE SEASON</h1>
        <p>Handpicked discounts across groceries, home care, and more — updated daily.</p>
      </div>

      <div className="product-grid" style={{ paddingBottom: 50 }}>
        {deals.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </div>
  );
}
