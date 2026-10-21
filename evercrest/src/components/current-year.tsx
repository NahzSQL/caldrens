import { cacheLife } from "next/cache";

/** The current year for the copyright notice. Cached and refreshed daily, so the static page never goes stale. */
export async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
