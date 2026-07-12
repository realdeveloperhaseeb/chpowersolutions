// Node-runtime auth helpers: password hashing, session cookie, current user.
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { signToken, verifyToken, SESSION_COOKIE } from "@/lib/jwt";
import { findUserById } from "@/lib/store";

export const hashPassword = (pw) => bcrypt.hash(pw, 10);
export const verifyPassword = (pw, hash) => bcrypt.compare(pw, hash);

const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

// Create a session for a user and set the cookie.
export async function createSession(user) {
  const token = await signToken({ sub: user.id, role: user.role, name: user.name });
  cookies().set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export function clearSession() {
  cookies().set(SESSION_COOKIE, "", { path: "/", maxAge: 0 });
}

// Returns the full user record (from the store) or null.
export async function getCurrentUser() {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const payload = await verifyToken(token);
  if (!payload?.sub) return null;
  const user = await findUserById(payload.sub);
  if (!user) return null;
  const { passwordHash, ...safe } = user;
  return safe;
}

export async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") return null;
  return user;
}
