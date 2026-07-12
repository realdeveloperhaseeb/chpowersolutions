// Edge-safe JWT helpers (jose only — no Node-specific deps). Safe to import from
// middleware AND server code.
import { SignJWT, jwtVerify } from "jose";

const secret = () =>
  new TextEncoder().encode(
    process.env.JWT_SECRET || "chps-dev-secret-change-me-in-production"
  );

export async function signToken(payload, expiresIn = "7d") {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secret());
}

export async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, secret());
    return payload;
  } catch {
    return null;
  }
}

export const SESSION_COOKIE = "chps_session";
