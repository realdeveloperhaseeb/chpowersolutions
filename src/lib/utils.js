export function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Normalise a product/category payload coming from the admin forms.
export function normalizeProduct(body) {
  const specs =
    typeof body.specs === "string"
      ? Object.fromEntries(
          body.specs
            .split("\n")
            .map((l) => l.split(":"))
            .filter((p) => p[0] && p[1])
            .map(([k, ...v]) => [k.trim(), v.join(":").trim()])
        )
      : body.specs || {};
  const images = Array.isArray(body.images)
    ? body.images.filter(Boolean)
    : String(body.images || "")
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);

  return {
    name: body.name?.trim(),
    slug: body.slug?.trim() || slugify(body.name),
    categoryId: Number(body.categoryId) || null,
    price: Number(body.price) || 0,
    oldPrice: body.oldPrice ? Number(body.oldPrice) : null,
    stock: Number(body.stock) || 0,
    featured: Boolean(body.featured),
    shortDesc: body.shortDesc?.trim() || "",
    description: body.description?.trim() || "",
    specs,
    metaTitle: body.metaTitle?.trim() || body.name,
    metaDesc: body.metaDesc?.trim() || body.shortDesc || "",
    images,
  };
}

export function specsToText(specs = {}) {
  return Object.entries(specs)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
}
