import { NextResponse } from "next/server";
import { sendContactMessage } from "@/lib/email";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const { name, email, phone, message } = await req.json();
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email and message are required." }, { status: 400 });
    }
    await sendContactMessage({ name, email, phone, message });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: "Could not send your message. Please try again." }, { status: 500 });
  }
}
