# JurisPoint website

Three-page website for JurisPoint, built with Next.js 15 (App Router), TypeScript, Tailwind CSS and Lucide icons.

| Page | Path |
| --- | --- |
| Home | `/` |
| Our Services | `/services` |
| About Us & Contact | `/contact` (enquiry form at `/contact#enquiry`) |

## Run locally

Requires Node.js 18.18 or newer.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production build
npm run lint && npm run typecheck
```

## Project structure

```
src/lib/site.ts            Business details, navigation, disclaimer, photos and all practice-area copy
src/lib/enquiry.ts         Form validation shared by the browser and the server
src/app/page.tsx           Home
src/app/services/page.tsx  Our Services (practice areas + FAQ)
src/app/contact/page.tsx   About Us & Contact (values, contact details, enquiry form)
src/app/api/enquiry/       Server endpoint that emails enquiries
src/components/            Header, Footer, ContactForm, Photo and other shared pieces
```

Phone, email, location and tagline live only in `src/lib/site.ts`; change them there and every page updates.

## Setup still needed before launch

### 1. Contact form email delivery (required)

The form is fully built and validated, but **it does not deliver enquiries until an email service is connected.**
Until then, submitting shows "Your enquiry has not been sent" with buttons to email or call the firm instead. It never shows a success message unless delivery actually succeeded.

To connect it with [Resend](https://resend.com) (free tier available):

1. Create a Resend account and verify the `jurispoint.site` domain (Resend shows the DNS records to add).
2. Create an API key.
3. Set these environment variables in your hosting provider (see `.env.example`):
   - `RESEND_API_KEY`: the API key
   - `ENQUIRY_TO_EMAIL`: `stevensgregs@jurispoint.site`
   - `ENQUIRY_FROM_EMAIL`: e.g. `JurisPoint Website <website@jurispoint.site>` (must be on the verified domain)
4. Redeploy, then send a test enquiry and confirm it arrives.

To use another provider instead, replace the `deliver()` function in `src/app/api/enquiry/route.ts`.

The endpoint needs a Node.js server, so host on a platform that runs Next.js (for example Vercel or Netlify), not as a static export.
The form has a spam honeypot; consider adding rate limiting or a CAPTCHA if spam becomes a problem.

### 2. Site URL

Set `NEXT_PUBLIC_SITE_URL` to the live address (defaults to `https://jurispoint.site`). It is used for canonical links, the sitemap and social previews.

### 3. Photography

Images are royalty-free Unsplash photos (listed in `src/lib/site.ts`), served through Next.js image optimisation. They could not be previewed from the build environment, so check each one on the live site and swap any you don't like. Ideally replace them with the firm's own photography over time. Every photo sits on a styled navy backdrop, so the layout still looks finished if one fails to load.

### 4. Content review

All copy was written to avoid unverified claims: there are no credentials, bar admissions, years of experience, testimonials, results or fees. Please review the wording, especially the disclaimer in `src/lib/site.ts`, with professional-conduct rules in mind (South Carolina has specific rules on lawyer advertising). Add confirmed details such as bar admissions or an office address only once they are verified.
