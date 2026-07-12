import { NextResponse } from "next/server";
import { findUserByEmail, createUser } from "@/lib/store";
import { hashPassword, createSession } from "@/lib/auth";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }
    if (String(password).length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters." }, { status: 400 });
    }
    const existing = await findUserByEmail(email);
    if (existing) {
      return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
    }
    const passwordHash = await hashPassword(password);
    const user = await createUser({ name, email, passwordHash, role: "user" });
    await createSession(user);
    return NextResponse.json({ user: { id: user.id, name: user.name, role: user.role } });
  } catch (e) {
    return NextResponse.json({ error: "Registration failed." }, { status: 500 });
  }
}
