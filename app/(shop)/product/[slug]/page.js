import Link from "next/link";
import { notFound } from "next/navigation";
import ProductGallery from "@/components/ProductGallery";
import PdpActions from "@/components/PdpActions";
import StarRating from "@/components/StarRating";
import ReviewsSection from "@/components/ReviewsSection";
import ProductGrid from "@/components/ProductGrid";
import { getProductBySlug, getRelatedProducts } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.title} — Cmart Ready`,
    description: product.description,
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = await getRelatedProducts(product);
  const off = product.mrp - product.sp;
  const outOfStock = product.stock <= 0;

  return (
    <div className="page-container">
      <nav className="breadcrumb" aria-label="breadcrumb">
        <Link href="/">Home</Link>
        <span className="sep">/</span>
        <span className="current">{product.title}</span>
      </nav>

      <div className="pdp-grid">
        <div>
          <ProductGallery images={product.images} title={product.title} />
        </div>

        <div>
          <div className="pdp-brand">{product.brand}</div>
          <h1 className="pdp-title">{product.title}</h1>

          {product.reviews.length > 0 && (
            <div className="pdp-rating">
              <StarRating value={product.rating} />
              <span className="count">
                ({product.reviews.length} review{product.reviews.length === 1 ? "" : "s"})
              </span>
            </div>
          )}

          <div className="pdp-price-row">
            <span className="sp">₹{product.sp}</span>
            <span className="mrp">₹{product.mrp}</span>
            <span className="off">₹{off} OFF</span>
          </div>
          {product.perUnit && <div className="pdp-qtylabel">{product.qty} ({product.perUnit})</div>}

          <p className="pdp-desc">{product.description}</p>

          <p className={`pdp-stock ${outOfStock ? "out" : "in"}`}>
            {outOfStock ? "Out of Stock" : `In Stock (${product.stock} available)`}
          </p>

          <PdpActions product={product} />
        </div>
      </div>

      <ReviewsSection reviews={product.reviews} />

      {related.length > 0 && (
        <div style={{ margin: "0 -32px" }}>
          <ProductGrid title="You May Also Like" products={related} />
        </div>
      )}
    </div>
  );
}
