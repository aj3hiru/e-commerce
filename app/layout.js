import "./globals.css";

export const metadata = {
  title: "Cmart Ready — Online Grocery Shopping",
  description: "Your everyday grocery store — fresh produce, daily essentials and household needs, delivered to your doorstep.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
