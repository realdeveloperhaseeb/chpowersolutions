import { NextResponse } from "next/server";
import { verifyToken, SESSION_COOKIE } from "@/lib/jwt";

// Gate /admin behind an admin session. Runs on the edge; only reads the JWT
// (role claim) — no DB access here.
export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const payload = token ? await verifyToken(token) : null;

  if (pathname.startsWith("/admin") && payload?.role !== "admin") {
    const url = new URL("/login", req.url);
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
