import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getCategories } from "@/lib/store";

// Rendered at request time so the header/footer (categories) always reflect the
// live database and the build never depends on a reachable DB.
export const dynamic = "force-dynamic";

// Storefront chrome: header + footer + cart. Admin routes don't use this.
export default async function ShopLayout({ children }) {
  const categories = await getCategories();
  return (
    <CartProvider>
      <Header categories={categories} />
      <main className="min-h-[60vh]">{children}</main>
      <Footer />
    </CartProvider>
  );
}
