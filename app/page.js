import BannerSlider from "@/components/BannerSlider";
import IconStrip from "@/components/IconStrip";
import CategoryRow from "@/components/CategoryRow";
import ProductGrid from "@/components/ProductGrid";
import {
  FRESH_ITEMS,
  SNACKS_DRINKS,
  POPULAR_PRODUCTS,
  GARDEN_PRODUCTS,
} from "@/lib/siteData";

export default function HomePage() {
  return (
    <>
      <div className="page-container">
        <BannerSlider />
        <IconStrip />
        <CategoryRow title="Fresh items" items={FRESH_ITEMS} />
        <CategoryRow title="Snacks & Drinks" items={SNACKS_DRINKS} />
      </div>

      <ProductGrid title="Popular Products" products={POPULAR_PRODUCTS} />

      <div className="festive-banner">
        <span className="leaf left">🌿</span>
        <span className="leaf right">🌿</span>
        <h2>FESTIVE CELEBRATIONS</h2>
      </div>

      <ProductGrid title="Garden &amp; Plant Care" products={GARDEN_PRODUCTS} />
    </>
  );
}
