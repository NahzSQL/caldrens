import { cacheLife } from "next/cache";

/**
 * Renders the current year. Cached for a day so the static pages pick up
 * the new year automatically without a redeploy.
 */
export async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
