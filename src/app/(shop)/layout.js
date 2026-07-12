import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Rendered at request time so the footer (categories) always reflects the live
// database and the build never depends on a reachable DB.
export const dynamic = "force-dynamic";

// Storefront chrome: header + footer + cart. Admin routes don't use this.
export default function ShopLayout({ children }) {
  return (
    <CartProvider>
      <Header />
      <main className="min-h-[60vh]">{children}</main>
      <Footer />
    </CartProvider>
  );
}
