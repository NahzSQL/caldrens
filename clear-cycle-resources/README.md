# Clear Cycle Resources — Website

Corporate website for Clear Cycle Resources (clearcycleresources.site), built with
Next.js 16 (App Router), TypeScript and Tailwind CSS 4.

## Pages

Exactly three public pages:

| Route            | Page            |
| ---------------- | --------------- |
| `/`              | Home            |
| `/services`      | Services        |
| `/about-contact` | About & Contact |

Supporting routes (not pages): `/api/contact` (contact form endpoint),
`/sitemap.xml`, `/robots.txt`, `/icon.svg`, Open Graph images, and a 404 page.

## Run locally

Requires Node.js 20.9 or later.

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                   # http://localhost:3000
```

Other scripts: `npm run build`, `npm start`, `npm run lint`.

## Project structure

```
src/
  config/site.ts            All business details, navigation and photo settings
  content/services.ts       Service descriptions used on Home and Services
  app/
    layout.tsx              Fonts, global metadata, header, footer
    page.tsx                Home
    services/page.tsx       Services
    about-contact/page.tsx  About, leadership, contact form, privacy notice
    api/contact/route.ts    Contact form endpoint (server-side checks + email)
    opengraph-image.tsx     Generated social sharing image
    sitemap.ts, robots.ts, icon.svg, not-found.tsx
  components/               Header, Footer, Logo, ContactForm, Photo, shared UI
  lib/contact/              Validation, SMTP mailer, rate limit, Turnstile check
```

## Business details

Edit `src/config/site.ts`. The address, phone number and service area are
`null` by default and are **not shown anywhere** until you set them. Only add
them once they are verified:

```ts
phone: "(555) 123-4567",
address: { street: "...", city: "...", state: "..", postalCode: "....." },
serviceArea: "Serving U.S. healthcare organizations remotely", // only if accurate
```

## Contact form

The form posts to `/api/contact`, which:

1. Accepts only same-origin JSON requests under 16 KB.
2. Rate-limits each IP address (5 requests per 10 minutes, in memory).
3. Rejects bots using a hidden honeypot field and a minimum fill time (3 seconds).
4. Optionally verifies Cloudflare Turnstile (enabled when both Turnstile keys are set).
5. Validates and cleans every field on the server (the same rules give instant feedback in the browser).
6. Emails the inquiry by SMTP to `kevinbrooks@clearcycleresources.site`, with Reply-To set to the sender.

Submissions are not stored in a database. Message content is never written to
server logs.

**If SMTP is not configured, the form does not pretend to work.** It shows a
message asking visitors to email the company directly, and the server logs
`Email delivery is not configured`.

### Required setup before launch

Set these environment variables in your hosting provider (see `.env.example`):

| Variable             | Required | Notes                                                        |
| -------------------- | -------- | ------------------------------------------------------------ |
| `SMTP_HOST`          | Yes      | From the email provider for clearcycleresources.site         |
| `SMTP_PORT`          | No       | Default `587`. Use `465` for implicit TLS                     |
| `SMTP_SECURE`        | No       | `true` for port 465. Defaults from the port                   |
| `SMTP_USER`          | Yes      | SMTP username (often a full mailbox address)                  |
| `SMTP_PASS`          | Yes      | SMTP password or app password                                 |
| `CONTACT_FROM_EMAIL` | No       | Sender address. Defaults to `SMTP_USER`                       |
| `CONTACT_TO_EMAIL`   | No       | Recipient. Defaults to `kevinbrooks@clearcycleresources.site` |
| `NEXT_PUBLIC_SITE_URL` | No     | Defaults to `https://clearcycleresources.site`                |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | No | Turns on Cloudflare Turnstile |

After deploying, send a test inquiry from the live site and confirm it arrives
in the `kevinbrooks@clearcycleresources.site` inbox (check spam the first
time). For reliable delivery, make sure the domain's SPF, DKIM and DMARC
records include your email provider.

## Photography

Photos are free-license Unsplash images configured in `src/config/site.ts`
(`images`) and optimized through `next/image`. Review them on the live site
and swap in different photos if preferred. To self-host, put files in
`public/images/` and set `src: "/images/your-file.jpg"`. If a photo ever fails
to load, a branded navy panel with the logo symbol is shown instead.

## Deployment

Any host that runs Next.js works. Simplest options:

- **Vercel:** import the repository, add the environment variables above, deploy,
  then add `clearcycleresources.site` under Project → Domains.
- **Node server:** `npm ci && npm run build && npm start` behind a reverse proxy
  that sets `X-Forwarded-For` and `X-Forwarded-Host`.

## Before launch checklist

- [ ] SMTP variables set and a live test inquiry received
- [ ] Verified phone/address added to `src/config/site.ts`, or intentionally left out
- [ ] Photos reviewed on the live site
- [ ] Privacy notice wording reviewed by the owner
- [ ] Domain connected with HTTPS
