import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { getOrders } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ orders: await getOrders() });
}
