import BannerSlider from "@/components/BannerSlider";
import IconStrip from "@/components/IconStrip";
import CategoryRow from "@/components/CategoryRow";
import ProductGrid from "@/components/ProductGrid";
import { FRESH_ITEMS, SNACKS_DRINKS } from "@/lib/siteData";
import { getFeaturedProducts, getGardenProducts } from "@/lib/data";
import { getSettings } from "@/lib/settings";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [popularProducts, gardenProducts, settings] = await Promise.all([
    getFeaturedProducts(),
    getGardenProducts(),
    getSettings(),
  ]);

  return (
    <>
      <div className="page-container">
        <BannerSlider />
        <IconStrip />
        <CategoryRow title="Fresh items" items={FRESH_ITEMS} />
        <CategoryRow title="Snacks & Drinks" items={SNACKS_DRINKS} />
      </div>

      <ProductGrid title="Popular Products" products={popularProducts} />

      <div className="festive-banner">
        <span className="leaf left">🌿</span>
        <span className="leaf right">🌿</span>
        <h2>{settings.festive_banner_text}</h2>
      </div>

      <ProductGrid title="Garden &amp; Plant Care" products={gardenProducts} />
    </>
  );
}
