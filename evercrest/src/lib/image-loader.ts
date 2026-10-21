/**
 * Image loader for next/image.
 *
 * Unsplash images are resized by Unsplash's CDN, so the browser downloads a
 * correctly sized, compressed (WebP/AVIF) file for each screen. Local images
 * in /public are returned as-is.
 */
export default function imageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  if (src.startsWith("https://images.unsplash.com/")) {
    const url = new URL(src);
    url.searchParams.set("auto", "format");
    url.searchParams.set("fit", "crop");
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(quality ?? 75));
    return url.toString();
  }
  return src;
}
