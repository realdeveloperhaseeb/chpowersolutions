import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { getProducts, createProduct } from "@/lib/store";
import { normalizeProduct } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ products: await getProducts() });
}

export async function POST(req) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const data = normalizeProduct(body);
  if (!data.name) return NextResponse.json({ error: "Name is required." }, { status: 400 });
  const product = await createProduct(data);
  return NextResponse.json({ product });
}
