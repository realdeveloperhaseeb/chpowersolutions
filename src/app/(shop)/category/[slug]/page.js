import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import ProductCard from "@/components/ProductCard";
import {
  getCategoryBySlug,
  getProductsByCategory,
} from "@/lib/store";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const cat = await getCategoryBySlug(params.slug);
  if (!cat) return {};
  return {
    title: cat.metaTitle,
    description: cat.metaDesc,
    alternates: { canonical: `/category/${cat.slug}` },
  };
}

export default async function CategoryPage({ params }) {
  const cat = await getCategoryBySlug(params.slug);
  if (!cat) notFound();

  const products = await getProductsByCategory(cat.slug);

  return (
    <>
      <PageHeader eyebrow="Category" title={cat.name} subtitle={cat.description} />
      <section className="container-x py-12">
        {products.length ? (
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {products.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        ) : (
          <p className="text-center text-slate-500">No products in this category yet.</p>
        )}
      </section>
    </>
  );
}
