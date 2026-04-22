import { NextResponse } from "next/server";

export const runtime = "nodejs";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const email =
    body && typeof body === "object" && "email" in body
      ? String((body as { email: unknown }).email ?? "").trim()
      : "";

  if (!email || !EMAIL.test(email)) {
    return NextResponse.json(
      { error: "Please provide a valid email address." },
      { status: 400 },
    );
  }

  // TODO: integrate with Resend / Notion / Supabase / Google Sheet.
  // For now, log the interest so it shows up in the Vercel / dev logs.
  console.log("[northstar] interest captured:", {
    email,
    at: new Date().toISOString(),
    ua: req.headers.get("user-agent") ?? null,
  });

  return NextResponse.json({ ok: true });
}
