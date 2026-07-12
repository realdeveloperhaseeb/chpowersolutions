import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { updateUserPassword } from "@/lib/store";
import { hashPassword } from "@/lib/auth";

export const dynamic = "force-dynamic";

// Admin sets a user's password (on request). No user deletion is offered.
export async function PUT(req, { params }) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { password } = await req.json();
  if (!password || String(password).length < 6) {
    return NextResponse.json({ error: "Password must be at least 6 characters." }, { status: 400 });
  }
  const hash = await hashPassword(password);
  const user = await updateUserPassword(params.id, hash);
  if (!user) return NextResponse.json({ error: "User not found." }, { status: 404 });
  return NextResponse.json({ ok: true });
}
