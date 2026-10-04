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

Open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8080
```

## Before launch

- **Photography.** Images are loaded from Unsplash (free license). For production, replace them with Caldrens' own facility and team photography, ideally self-hosted in `assets/img/`. Each image sits on a dark steel background, so the layout still holds if an image fails to load.
- **Contact form.** The form validates input and shows a confirmation, but it does not send anything yet. Set the form's `action` attribute in `index.html` to a form endpoint (your own API, HubSpot, Formspree, etc.). The script will then POST the fields as `FormData` and show an error message if the request fails.
- **Domain metadata.** Once the domain is known, add `<link rel="canonical">`, `og:url`, and a sitemap, and point `og:image` at a self-hosted 1200×630 image.
- **Contact details.** No address, phone number, email, or social accounts are listed. Add them to the contact section and footer when they're confirmed.
