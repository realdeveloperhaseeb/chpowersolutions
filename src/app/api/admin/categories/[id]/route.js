import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { updateCategory, deleteCategory } from "@/lib/store";
import { slugify } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function PUT(req, { params }) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const b = await req.json();
  const category = await updateCategory(params.id, {
    name: b.name?.trim(),
    slug: b.slug?.trim() || slugify(b.name),
    tagline: b.tagline?.trim() || "",
    description: b.description?.trim() || "",
    metaTitle: b.metaTitle?.trim() || b.name,
    metaDesc: b.metaDesc?.trim() || "",
    image: b.image?.trim() || "",
  });
  if (!category) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ category });
}

export async function DELETE(_req, { params }) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await deleteCategory(params.id);
  return NextResponse.json({ ok: true });
}
