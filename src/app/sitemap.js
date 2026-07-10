import { site } from "@/lib/site";
import { getProducts, getCategories } from "@/lib/data";

export default function sitemap() {
  const base = site.url;
  const staticRoutes = ["", "/products", "/about", "/contact"].map((r) => ({
    url: `${base}${r}`,
    changeFrequency: "weekly",
    priority: r === "" ? 1 : 0.8,
  }));

  const categoryRoutes = getCategories().map((c) => ({
    url: `${base}/category/${c.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const productRoutes = getProducts().map((p) => ({
    url: `${base}/products/${p.slug}`,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
