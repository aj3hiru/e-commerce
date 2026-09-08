import Link from "next/link";
import { getCategoriesWithCounts } from "@/lib/data";
import { SITE } from "@/lib/siteData";

export const metadata = { title: `All Categories — ${SITE.name}` };
export const dynamic = "force-dynamic";

const EMOJI = {
  grocery: "🛒",
  "ready-to-cook": "🍳",
  beverages: "🥤",
  "biscuits-cookies": "🍪",
  "bath-body": "🧴",
  "detergent-fabric-care": "🧺",
  cleaners: "🧽",
  "garden-plant-care": "🌱",
};

export default async function CategoriesPage() {
  const categories = await getCategoriesWithCounts();

  return (
    <div className="page-container">
      <div className="breadcrumb">
        <Link href="/">Home</Link>
        <span className="sep">/</span>
        <span className="current">All Categories</span>
      </div>
      <div className="category-header">
        <h1>All Categories</h1>
      </div>

      <div className="categories-grid">
        {categories.map((cat) => (
          <Link href={`/category/${cat.slug}`} className="category-tile" key={cat.slug}>
            <div className="tile-icon">{EMOJI[cat.slug] || "🛍️"}</div>
            <h3>{cat.name}</h3>
            <div className="count">{cat.count} product{cat.count === 1 ? "" : "s"}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
