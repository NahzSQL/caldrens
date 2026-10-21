import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/plus-jakarta-sans";
import "./globals.css";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { siteConfig } from "@/config/site";
import { jsonLdString, practiceJsonLd } from "@/lib/seo";

// Used to build absolute URLs for social sharing images.
const metadataBaseUrl =
  siteConfig.url ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : null);

export const metadata: Metadata = {
  ...(metadataBaseUrl ? { metadataBase: new URL(metadataBaseUrl) } : {}),
  title: {
    default: `${siteConfig.name} | Dental Care in Delaware`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Evercrest Dental Practice offers personalized, patient-focused dental care in Delaware, with a focus on preventive care, clear communication, and your long-term smile.",
  applicationName: siteConfig.name,
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#12243f",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-US" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <a
          href="#main-content"
          className="sr-only z-[60] rounded-full bg-navy-900 px-5 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(practiceJsonLd()) }}
        />
      </body>
    </html>
  );
}
