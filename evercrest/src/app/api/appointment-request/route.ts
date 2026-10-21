import { NextResponse, type NextRequest } from "next/server";
import { appointmentRequestSchema, toFieldErrors } from "@/lib/appointment-schema";
import { deliverAppointmentRequest, isDeliveryConfigured } from "@/lib/appointment-delivery";

/**
 * Receives appointment requests from the contact page.
 * Patient details are never written to logs.
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
// Best-effort rate limit per server instance.
const recent = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const hits = (recent.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  recent.set(key, hits);
  if (recent.size > 5000) recent.clear();
  return hits.length > MAX_REQUESTS;
}

export async function POST(request: NextRequest) {
  if (!isDeliveryConfigured()) {
    return NextResponse.json(
      { ok: false, code: "not_configured", message: "Unable to send request." },
      { status: 503 },
    );
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, code: "rate_limited", message: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, code: "invalid", message: "Invalid request." }, { status: 400 });
  }

  const parsed = appointmentRequestSchema.safeParse(body);
  if (!parsed.success) {
    // A filled honeypot means a bot: respond as if accepted, but send nothing.
    if (typeof body === "object" && body && "website" in body && (body as { website?: unknown }).website) {
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json(
      { ok: false, code: "invalid", message: "Please check the form.", fieldErrors: toFieldErrors(parsed.error) },
      { status: 422 },
    );
  }

  try {
    await deliverAppointmentRequest(parsed.data);
  } catch (error) {
    // Log only the failure reason, never the request contents.
    console.error("Appointment request delivery failed:", error instanceof Error ? error.message : "unknown error");
    return NextResponse.json(
      { ok: false, code: "delivery_failed", message: "We could not send your request." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
