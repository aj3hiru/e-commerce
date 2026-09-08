import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/CartContext";

export const metadata = {
  title: "Cmart Ready — Online Grocery Shopping",
  description: "Your everyday grocery store — fresh produce, daily essentials and household needs, delivered to your doorstep.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
