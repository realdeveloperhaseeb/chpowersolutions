import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { getSettings, updateSettings } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ settings: await getSettings() });
}

export async function PUT(req) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const settings = await updateSettings(body);
  return NextResponse.json({ settings });
}
