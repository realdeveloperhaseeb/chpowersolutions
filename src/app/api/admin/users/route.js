import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { getUsers } from "@/lib/store";

export const dynamic = "force-dynamic";

// List all registered users (password hashes stripped). No delete endpoint by design.
export async function GET() {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const users = (await getUsers()).map(({ passwordHash, ...safe }) => safe);
  return NextResponse.json({ users });
}
