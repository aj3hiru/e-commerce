import Link from "next/link";
import { CATEGORIES, getCategoryProducts, SITE } from "@/lib/siteData";

export const metadata = { title: `All Categories — ${SITE.name}` };

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

export default function CategoriesPage() {
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
        {CATEGORIES.map((cat) => {
          const count = getCategoryProducts(cat.slug).length;
          return (
            <Link href={`/category/${cat.slug}`} className="category-tile" key={cat.slug}>
              <div className="tile-icon">{EMOJI[cat.slug] || "🛍️"}</div>
              <h3>{cat.name}</h3>
              <div className="count">{count} product{count === 1 ? "" : "s"}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
