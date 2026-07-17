import PageHeader from "@/components/PageHeader";
import ProductsExplorer from "@/components/ProductsExplorer";
import { getProducts, getCategories } from "@/lib/store";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "All Products — Solar Inverters & Circuits",
  description:
    "Browse all solar inverters, hybrid inverters and repair circuits from CH Power Solutions. 6kW to 20kW models with the best prices in Pakistan.",
};

export default async function ProductsPage({ searchParams }) {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);
  const query = (searchParams?.q || "").trim();

  return (
    <>
      <PageHeader
        eyebrow="Our range"
        title={query ? `Search: “${query}”` : "Solar Inverters & Power Circuits"}
        subtitle={
          query
            ? "Products matching your search."
            : "From compact 6kW home inverters to 20kW industrial units — find the right fit for your load."
        }
      />
      <section className="container-x py-12">
        <ProductsExplorer products={products} categories={categories} query={query} />
      </section>
    </>
  );
}
