# Caldrens Solutions — Corporate Website

A one-page corporate website for Caldrens Solutions, built with semantic HTML, CSS, and vanilla JavaScript. There is no build step and no dependencies.

## Structure

```
index.html              Page markup, SEO and Open Graph metadata
assets/css/styles.css   Design tokens, layout, and components
assets/js/main.js       Header, mobile menu, scroll reveal, counters, contact form
assets/img/favicon.svg  Favicon
robots.txt
```

## Run locally

Run `npm run dev` (Node 18+) and open http://localhost:3000. Set `PORT` to change the port. You can also open `index.html` directly, or serve the folder with any static server:

```
python3 -m http.server 8080
```

## Before launch

- **Photography.** Images are loaded from Unsplash (free license). For production, replace them with Caldrens' own facility and team photography, ideally self-hosted in `assets/img/`. Each image sits on a dark steel background, so the layout still holds if an image fails to load.
- **Contact form.** Submissions are emailed to jonathan@caldrensystems.online through [FormSubmit](https://formsubmit.co) (no account needed). **The form must be activated once:** the first submission sends an email titled "Action Required: Activate FormSubmit" to that address (check spam). Click its activation link, or no inquiries will be delivered. The form only works from a real website (http/https), not from a file opened directly in the browser or from the Claude preview page. The form first sends in the background; if that fails, it falls back to a standard post handled on FormSubmit's own page, which then returns the visitor to the site. After activating, FormSubmit gives you a random alias you can use in place of the address in `index.html` (both the form's `action` and `data-endpoint`) to keep the address out of the page source.
- **Domain metadata.** Once the domain is known, add `<link rel="canonical">`, `og:url`, and a sitemap, and point `og:image` at a self-hosted 1200×630 image.
- **Contact details.** No address, phone number, email, or social accounts are listed. Add them to the contact section and footer when they're confirmed.
