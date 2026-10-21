import { NextResponse, type NextRequest } from "next/server";
import { services } from "@/config/services";

const knownSlugs = new Set(services.map((service) => service.slug));

/**
 * Unknown service URLs (e.g. /services/typo) get a true 404 status,
 * rather than a 404 page served with a 200 status.
 */
export function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.split("/")[2];
  if (slug && !knownSlugs.has(decodeURIComponent(slug))) {
    return NextResponse.rewrite(new URL("/page-not-found", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/services/:slug",
};
