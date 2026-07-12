import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
