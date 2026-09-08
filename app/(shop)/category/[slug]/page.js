import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import SortSelect from "@/components/SortSelect";
import { getCategoryBySlug, getCategoryProducts } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return {};
  return { title: `${category.name} — Cmart Ready` };
}

export default async function CategoryPage({ params, searchParams }) {
  const { slug } = await params;
  const sp = await searchParams;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const activeSub = sp?.sub || "";
  const sort = sp?.sort || "";
  const products = await getCategoryProducts(category.slug, activeSub || undefined, sort);

  const buildHref = (subVal, sortVal) => {
    const q = new URLSearchParams();
    if (subVal) q.set("sub", subVal);
    if (sortVal) q.set("sort", sortVal);
    const qs = q.toString();
    return `/category/${category.slug}${qs ? `?${qs}` : ""}`;
  };

  return (
    <div className="page-container">
      <nav className="breadcrumb" aria-label="breadcrumb">
        <Link href="/">Home</Link>
        <span className="sep">/</span>
        <span className="current">{category.name}</span>
      </nav>

      <div className="category-header">
        <h1>{category.name}</h1>
      </div>

      <div className="category-toolbar">
        {category.subcategories.length > 0 ? (
          <div className="cat-chips">
            <Link href={buildHref("", sort)} className={`cat-chip ${!activeSub ? "active" : ""}`}>
              All
            </Link>
            {category.subcategories.map((sc) => (
              <Link
                key={sc.slug}
                href={buildHref(sc.slug, sort)}
                className={`cat-chip ${activeSub === sc.slug ? "active" : ""}`}
              >
                {sc.name}
              </Link>
            ))}
          </div>
        ) : (
          <div />
        )}

        <SortSelect categorySlug={category.slug} activeSub={activeSub} sort={sort} />
      </div>

      {products.length === 0 ? (
        <div className="empty-state">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 7l1.5-3h15L21 7M3 7v12a1 1 0 001 1h16a1 1 0 001-1V7M3 7h18M9 11a3 3 0 006 0" />
          </svg>
          <p>No products in this category yet.</p>
        </div>
      ) : (
        <div className="product-grid" style={{ paddingBottom: "40px" }}>
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
