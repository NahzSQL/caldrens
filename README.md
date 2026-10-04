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
- **Contact form.** Submissions are emailed to jonathan@caldrensolutions.online through [FormSubmit](https://formsubmit.co) (no account needed). The first submission sends a one-time activation email to that address; click the link in it, or no inquiries will be delivered. After activating, FormSubmit gives you a random alias you can use in place of the address in `index.html` (both the form's `action` and `data-endpoint`) to keep the address out of the page source. To change the recipient, update those two URLs.
- **Domain metadata.** Once the domain is known, add `<link rel="canonical">`, `og:url`, and a sitemap, and point `og:image` at a self-hosted 1200×630 image.
- **Contact details.** No address, phone number, email, or social accounts are listed. Add them to the contact section and footer when they're confirmed.
