import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return siteConfig.nav.map((item) => ({
    url: new URL(item.href, siteConfig.url).toString(),
    changeFrequency: "monthly",
    priority: item.href === "/" ? 1 : 0.8,
  }));
}
