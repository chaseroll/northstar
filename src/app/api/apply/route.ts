import { NextResponse } from "next/server";

export const runtime = "nodejs";

// Mirrors the flag in src/app/apply/page.tsx. While `false`, every POST
// returns 503 so any client that tries to submit gets a clean rejection
// instead of silently looking like it worked.
const APPLICATIONS_OPEN = false;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const REQUIRED_FIELDS = [
  "name",
  "email",
  "class_year",
  "major",
  "team_structure",
  "company",
  "category",
  "oneliner",
  "what",
  "problem",
  "stage",
] as const;

export async function POST(req: Request) {
  if (!APPLICATIONS_OPEN) {
    return NextResponse.json(
      { error: "Applications are temporarily closed." },
      { status: 503 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  for (const key of REQUIRED_FIELDS) {
    const v = body[key];
    if (typeof v !== "string" || v.trim().length === 0) {
      return NextResponse.json(
        { error: `Missing required field: ${key}` },
        { status: 400 },
      );
    }
  }

  if (!EMAIL.test(String(body.email))) {
    return NextResponse.json(
      { error: "Please provide a valid email address." },
      { status: 400 },
    );
  }

  // TODO: integrate with Resend / Notion / Neon / Google Sheet.
  // For now, log to the server so submissions show up in Vercel logs.
  console.log("[northstar] application received:", {
    ...body,
    _meta: {
      at: new Date().toISOString(),
      ua: req.headers.get("user-agent") ?? null,
      ip: req.headers.get("x-forwarded-for") ?? null,
    },
  });

  return NextResponse.json({ ok: true });
}
