import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/CartContext";
import { getSessionCustomer } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function ShopLayout({ children }) {
  const customer = await getSessionCustomer();

  return (
    <CartProvider>
      <Header customer={customer} />
      {children}
      <Footer />
    </CartProvider>
  );
}
