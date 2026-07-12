import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { updateProduct, deleteProduct } from "@/lib/store";
import { normalizeProduct } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function PUT(req, { params }) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const data = normalizeProduct(body);
  const product = await updateProduct(params.id, data);
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ product });
}

export async function DELETE(_req, { params }) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await deleteProduct(params.id);
  return NextResponse.json({ ok: true });
}
