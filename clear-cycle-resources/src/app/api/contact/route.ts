import { siteConfig } from "@/config/site";
import { getMailConfig, sendContactEmail } from "@/lib/contact/mailer";
import { checkRateLimit } from "@/lib/contact/rate-limit";
import { isTurnstileEnabled, verifyTurnstile } from "@/lib/contact/turnstile";
import { validateContact } from "@/lib/contact/validation";

const MAX_BODY_BYTES = 16 * 1024;
/** Submissions completed faster than this are treated as automated. */
const MIN_FILL_TIME_MS = 3000;
/** Form sessions older than this must reload the page. */
const MAX_FILL_TIME_MS = 24 * 60 * 60 * 1000;

const fallback = `Please email us directly at ${siteConfig.email}.`;

function json(status: number, body: Record<string, unknown>, headers?: HeadersInit) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...headers },
  });
}

function clientIp(request: Request): string | null {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || null;
  return request.headers.get("x-real-ip");
}

/** Only accept submissions sent from this website's own pages. */
function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return json(403, { ok: false, error: "forbidden", message: "This request could not be accepted." });
  }

  if (!request.headers.get("content-type")?.includes("application/json")) {
    return json(415, { ok: false, error: "unsupported_media_type", message: "Unsupported request format." });
  }

  const ip = clientIp(request);
  const limit = checkRateLimit(ip ?? "unknown");
  if (!limit.allowed) {
    return json(
      429,
      {
        ok: false,
        error: "rate_limited",
        message: `You've sent several messages in a short time. Please try again in a few minutes, or email us directly at ${siteConfig.email}.`,
      },
      { "Retry-After": String(limit.retryAfterSeconds) },
    );
  }

  const raw = await request.text();
  if (new TextEncoder().encode(raw).byteLength > MAX_BODY_BYTES) {
    return json(413, { ok: false, error: "too_large", message: "Your message is too long. Please shorten it and try again." });
  }

  let payload: Record<string, unknown>;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Invalid body");
    payload = parsed as Record<string, unknown>;
  } catch {
    return json(400, { ok: false, error: "bad_request", message: "The form data could not be read. Please try again." });
  }

  // Spam protection 1: hidden honeypot field that people never see or fill in.
  if (typeof payload.website === "string" && payload.website.trim() !== "") {
    return json(400, { ok: false, error: "rejected", message: `Your message could not be sent. ${fallback}` });
  }

  // Spam protection 2: time between the form loading and being submitted.
  const startedAt = Number(payload.startedAt);
  const elapsed = Date.now() - startedAt;
  if (!Number.isFinite(startedAt) || elapsed < MIN_FILL_TIME_MS || elapsed > MAX_FILL_TIME_MS) {
    return json(400, {
      ok: false,
      error: "timing",
      message: "Please take a moment to review your message, then submit again. If the page has been open for a long time, refresh it first.",
    });
  }

  // Spam protection 3 (optional): Cloudflare Turnstile.
  if (isTurnstileEnabled()) {
    const token = typeof payload.turnstileToken === "string" ? payload.turnstileToken : "";
    if (!(await verifyTurnstile(token, ip))) {
      return json(400, {
        ok: false,
        error: "verification_failed",
        message: "We couldn't verify that this submission came from a person. Please complete the verification and try again.",
      });
    }
  }

  const result = validateContact(payload);
  if (!result.ok) {
    return json(422, {
      ok: false,
      error: "validation",
      message: "Please correct the highlighted fields.",
      fieldErrors: result.errors,
    });
  }

  const mailConfig = getMailConfig();
  if (!mailConfig) {
    console.error("[contact] Email delivery is not configured. Set SMTP_HOST, SMTP_USER and SMTP_PASS.");
    return json(503, {
      ok: false,
      error: "not_configured",
      message: `Our contact form is not accepting messages right now. ${fallback}`,
    });
  }

  try {
    await sendContactEmail(result.data, mailConfig);
  } catch (error) {
    const code = error && typeof error === "object" && "code" in error ? String(error.code) : "unknown";
    console.error(`[contact] Email delivery failed (code: ${code}).`);
    return json(502, {
      ok: false,
      error: "delivery_failed",
      message: `We couldn't send your message just now. Please try again later, or email us directly at ${siteConfig.email}.`,
    });
  }

  return json(200, { ok: true });
}
