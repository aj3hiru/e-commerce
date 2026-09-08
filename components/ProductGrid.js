import ProductCard from "./ProductCard";

export default function ProductGrid({ title, products }) {
  return (
    <section className="section">
      <h2>{title}</h2>
      <div className="product-grid">
        {products.map((p) => (
          <ProductCard key={p.title} product={p} />
        ))}
      </div>
    </section>
  );
}
