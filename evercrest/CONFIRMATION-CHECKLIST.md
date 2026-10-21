# Confirmed Practice Details

A record of the practice's decisions on each website detail. Every item is now settled, and nothing on the site is marked as "to be confirmed".

To change a detail later, edit the file listed. Most items are in `src/config/site.ts`.

| # | Item | Decision | Set in |
| --- | --- | --- | --- |
| 1 | Location | **Delaware, USA.** No street address, city, ZIP code, or map is shown. | `siteConfig.location` |
| 1 | Phone and email | **(251) 520-4334** · **wellsmuffle@evercrest.fit** | `siteConfig.contact` |
| 2 | Office hours | **Standard hours:** Monday–Friday, 9:00 AM – 5:00 PM; Saturday and Sunday closed | `siteConfig.officeHours` |
| 3 | Dentist | **Not named.** The dentist profile section has been removed. | — |
| 4 | Services | **Confirmed:** all eight services | `src/config/services.ts` |
| 5 | Insurance | **"We accept dental insurance."** Patients are asked to contact the office to verify coverage. | `siteConfig.insurance.acceptsInsurance` |
| 5 | Payment and policies | General wording only. No specific payment methods, financing, or cancellation terms are listed. | `siteConfig.insurance`, `siteConfig.policies` |
| 7 | Photography | Approved | `src/config/images.ts` |
| 8 | Legal pages | Approved. The Privacy Policy shows "Last updated: October 2026". | `src/app/privacy-policy/page.tsx`, `src/app/accessibility/page.tsx` |
| 9 | Website and listings | Approved | `siteConfig.url`, `siteConfig.social` |

## Optional additions

Each of these appears on the site automatically once it is filled in. Nothing shows until then.

- Street address, city, ZIP code, and directions link (`siteConfig.location`)
- A list of specific insurance plans, payment methods, or financing (`siteConfig.insurance`)
- Cancellation or late-arrival policy text (`siteConfig.policies`)
- Social media links (`siteConfig.social`)
- Website domain, for canonical URLs and the sitemap (`siteConfig.url`)
