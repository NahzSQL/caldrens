import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { siteConfig } from "@/config/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Clear Cycle Resources | Healthcare Operations & Care Coordination",
    template: "%s | Clear Cycle Resources",
  },
  description:
    "Explore Clear Cycle Resources' proposed healthcare operations, benefits administration support, provider communication, and care coordination services.",
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.owner.name }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
  },
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#07366A",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  email: siteConfig.email,
  slogan: siteConfig.tagline,
  logo: `${siteConfig.url}/icon.svg`,
  ...(siteConfig.phone ? { telephone: siteConfig.phone } : {}),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-US" className={`${inter.variable} ${manrope.variable} antialiased`}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only z-[60] rounded-md bg-navy px-4 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
