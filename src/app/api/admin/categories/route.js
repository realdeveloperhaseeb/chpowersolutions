import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { getCategories, createCategory } from "@/lib/store";
import { slugify } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ categories: await getCategories() });
}

export async function POST(req) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const b = await req.json();
  if (!b.name) return NextResponse.json({ error: "Name is required." }, { status: 400 });
  const category = await createCategory({
    name: b.name.trim(),
    slug: b.slug?.trim() || slugify(b.name),
    tagline: b.tagline?.trim() || "",
    description: b.description?.trim() || "",
    metaTitle: b.metaTitle?.trim() || b.name,
    metaDesc: b.metaDesc?.trim() || "",
    image: b.image?.trim() || "",
  });
  return NextResponse.json({ category });
}
