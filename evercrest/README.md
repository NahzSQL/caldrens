# Evercrest Dental Practice — Website

The website for Evercrest Dental Practice, a dental practice in Delaware, USA.
Built with Next.js 16 (App Router), TypeScript, and Tailwind CSS 4.

## Quick start

Requires Node.js 20.9 or later.

```bash
npm install
npm run dev          # development server at http://localhost:3000
npm run build        # production build
npm start            # serve the production build
npm run lint         # ESLint
npm run test:e2e     # browser tests (run against a started server; see below)
```

## Pages

| Page | Path |
| --- | --- |
| Home | `/` |
| About Us | `/about` |
| Dental Services | `/services` and one page per service at `/services/<slug>` |
| Patient Information | `/patient-information` |
| Contact and appointment request | `/contact` (the form is at `/contact#request-appointment`) |
| Privacy Policy | `/privacy-policy` |
| Accessibility Statement | `/accessibility` |
| 404 page | any unknown URL |

Also generated: `sitemap.xml`, `robots.txt`, `manifest.webmanifest`, favicon (`src/app/icon.svg`), and a social sharing image (`src/app/opengraph-image.tsx`).

## Updating practice details

**All practice details live in [`src/config/site.ts`](src/config/site.ts).** Optional details set to `null` (or an empty list) are simply not shown, and are left out of search metadata and structured data. Fill in a field and every page that uses it updates.

| What | Where |
| --- | --- |
| Address, city, ZIP | `siteConfig.location` |
| Phone, email | `siteConfig.contact` |
| Office hours | `siteConfig.officeHours` |
| Dentist name, biography, education, licensure, photo | `siteConfig.dentist` |
| Accepted insurance, payment methods, financing | `siteConfig.insurance` |
| Cancellation and late-arrival policies | `siteConfig.policies` |
| Dentrix Ascend online scheduling and patient forms links | `siteConfig.practiceManagement` |
| Social media links | `siteConfig.social` |
| Website address (for canonical URLs, sitemap) | `siteConfig.url` |
| Services list and text | [`src/config/services.ts`](src/config/services.ts) |
| Photos | [`src/config/images.ts`](src/config/images.ts) |
| Navigation | [`src/config/navigation.ts`](src/config/navigation.ts) |

### Confirmed details

See **[CONFIRMATION-CHECKLIST.md](CONFIRMATION-CHECKLIST.md)** for the practice's decisions on each detail, and the optional details that can be added later.

Once the city and address are confirmed, update `siteConfig.location`. The contact details, footer, structured data (schema.org `Dentist`), and page metadata all pick them up automatically. Consider adding the city to the page descriptions in each `page.tsx` too.

## Photography

Photos are loaded from Unsplash (free to use under the [Unsplash License](https://unsplash.com/license)) through its image CDN. A custom loader in `src/lib/image-loader.ts` requests a correctly sized, compressed image for each screen.

**Review every photo before launch.** The photo IDs in `src/config/images.ts` could not be previewed from the build environment, so check that each one loads and suits the page, and that the alt text matches. Better still, replace them with the practice's own photography: put files in `public/images/` and set `src` to, for example, `/images/reception.jpg`.

Every photo sits on a branded navy and teal background with the Evercrest crest. If an image fails to load, the layout still looks finished.

## Appointment request form

The form collects only what is needed to schedule a visit: the patient's name, preferred contact method, phone and/or email, preferred date and time, a general reason chosen from a list, and an optional scheduling note. It does not ask for medical history or insurance details, and it tells visitors not to include them.

- Validation runs in the browser and again on the server (`src/lib/appointment-schema.ts`), with accessible error messages and an error summary.
- **Delivery must be set up for requests to reach the practice.** The form always looks and works like a normal form. Until delivery is configured, every submission gets a general "Sorry, we couldn't send your request right now" message. Visitors are never told a request was received unless it was actually delivered.
- **Live mode.** Set the environment variables in `.env.example`. The form then posts to `src/app/api/appointment-request/route.ts`, which validates the request, applies a basic rate limit and a spam honeypot, and delivers it by webhook or by email through Resend. Patient details are never written to logs. The visitor sees a confirmation only after delivery succeeds, and it says the practice must still confirm the appointment. If delivery fails, the visitor is told the request was **not** sent.

Whether the form is live is decided when the site is **built**, so set the environment variables before running `npm run build` (on Vercel, add them in Project Settings, then redeploy).

> **Healthcare privacy.** Appointment requests may be protected health information. Before going live, confirm the delivery provider is appropriate for healthcare data (for example, that it signs a Business Associate Agreement if HIPAA applies), and review the end-to-end workflow with the practice. The site does not claim HIPAA compliance.

## Privacy and security

- No analytics, tracking pixels, or third-party scripts. Fonts are self-hosted from npm packages.
- No patient data in browser storage, cookies, or logs.
- Secrets are read only on the server, from environment variables.
- Security headers (`X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`) are set in `next.config.ts`.
- Serve the site over HTTPS. Vercel and most hosts do this by default.

## Accessibility

Semantic landmarks and headings, a skip link, visible focus indicators, labelled form fields with linked error messages, keyboard-operable mobile menu (Radix Dialog), alt text, reduced-motion support, and WCAG AA color contrast. `npm run test:e2e` runs axe-core WCAG 2.1 A/AA checks on every page.

## Testing

`tests/e2e.mjs` uses Playwright to check, against a running server:

- every page at phone, tablet, and desktop widths (status, one `h1`, title, no horizontal scrolling, no console errors)
- axe-core accessibility rules
- every internal link and anchor
- keyboard navigation (skip link, focus ring)
- the mobile menu
- form validation and the submission result

```bash
npm run build && npm start &
npm run test:e2e                      # or BASE_URL=http://localhost:3100 npm run test:e2e
SCREENSHOTS=./screenshots npm run test:e2e   # also save full-page screenshots
```

## Deployment

**Vercel (recommended):** import the repository, set the **Root Directory** to `evercrest`, add any environment variables from `.env.example`, and deploy. Then set `siteConfig.url` to the live domain and redeploy, so canonical URLs and the sitemap use it.

**Any Node.js host:** `npm ci && npm run build && npm start` (set `PORT` as needed), behind HTTPS.

The appointment endpoint needs a Node.js server, so a purely static export is not supported unless the form is pointed at an external service.
