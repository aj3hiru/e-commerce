import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/CartContext";
import { getSessionCustomer } from "@/lib/auth";
import { getSettings } from "@/lib/settings";

export const dynamic = "force-dynamic";

export default async function ShopLayout({ children }) {
  const [customer, settings] = await Promise.all([getSessionCustomer(), getSettings()]);

  return (
    <CartProvider>
      <Header customer={customer} settings={settings} />
      {children}
      <Footer settings={settings} />
    </CartProvider>
  );
}
