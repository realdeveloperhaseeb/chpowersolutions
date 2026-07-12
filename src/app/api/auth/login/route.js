import { NextResponse } from "next/server";
import { findUserByEmail } from "@/lib/store";
import { verifyPassword, createSession } from "@/lib/auth";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }
    const user = await findUserByEmail(email);
    if (!user || !(await verifyPassword(password, user.passwordHash))) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }
    await createSession(user);
    return NextResponse.json({ user: { id: user.id, name: user.name, role: user.role } });
  } catch (e) {
    return NextResponse.json({ error: "Login failed." }, { status: 500 });
  }
}
