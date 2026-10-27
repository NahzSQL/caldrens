import "server-only";

/**
 * Small in-memory, per-IP rate limiter for the contact form.
 *
 * It is best effort: on serverless hosts each instance keeps its own memory.
 * It works alongside the honeypot, the timing check, and (optionally)
 * Cloudflare Turnstile rather than replacing them.
 */

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 5;
const MAX_TRACKED_KEYS = 5000;

const hits = new Map<string, number[]>();

export function checkRateLimit(key: string, now = Date.now()): { allowed: boolean; retryAfterSeconds: number } {
  const recent = (hits.get(key) ?? []).filter((time) => now - time < WINDOW_MS);

  if (recent.length >= MAX_REQUESTS) {
    hits.set(key, recent);
    const retryAfterSeconds = Math.ceil((WINDOW_MS - (now - recent[0])) / 1000);
    return { allowed: false, retryAfterSeconds };
  }

  recent.push(now);
  hits.set(key, recent);

  if (hits.size > MAX_TRACKED_KEYS) {
    for (const [storedKey, times] of hits) {
      if (times.every((time) => now - time >= WINDOW_MS)) hits.delete(storedKey);
    }
  }

  return { allowed: true, retryAfterSeconds: 0 };
}
