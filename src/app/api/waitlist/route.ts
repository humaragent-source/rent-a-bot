import { NextResponse } from "next/server";

import { validateWaitlistInput } from "@/lib/waitlist";
import { appendWaitlistEntry } from "@/lib/waitlist-store";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Send a JSON body." }, { status: 400 });
  }

  if (body === null || typeof body !== "object") {
    return NextResponse.json({ error: "Send a JSON object." }, { status: 400 });
  }

  const payload = body as Record<string, unknown>;
  const parsed = validateWaitlistInput({
    email: payload.email,
    city: payload.city,
    intent: payload.intent,
  });

  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  try {
    const entry = await appendWaitlistEntry(parsed.value);
    return NextResponse.json({
      ok: true,
      id: entry.id,
    });
  } catch {
    return NextResponse.json(
      { error: "Could not save your spot. Try again." },
      { status: 500 }
    );
  }
}
