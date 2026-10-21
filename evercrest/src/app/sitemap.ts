import type { MetadataRoute } from "next";
import { services } from "@/config/services";
import { siteConfig } from "@/config/site";

const paths = ["/", "/about", "/services", "/patient-information", "/contact", "/privacy-policy", "/accessibility"];

export default function sitemap(): MetadataRoute.Sitemap {
  // A sitemap needs absolute URLs, so it stays empty until siteConfig.url is set.
  if (!siteConfig.url) return [];
  const base = siteConfig.url.replace(/\/$/, "");
  return [...paths, ...services.map((s) => `/services/${s.slug}`)].map((path) => ({
    url: `${base}${path === "/" ? "" : path}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
