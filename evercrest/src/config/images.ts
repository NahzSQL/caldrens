/**
 * Photography used across the site.
 *
 * Images are served from Unsplash (free to use under the Unsplash License,
 * https://unsplash.com/license) through its image CDN, which resizes and
 * compresses them for each screen size (see src/lib/image-loader.ts).
 *
 * BEFORE LAUNCH: review each photo, and ideally replace them with the
 * practice's own photography. To use a self-hosted photo, put the file in
 * /public/images and set `src` to its path, e.g. "/images/reception.jpg".
 *
 * Every image sits on a branded background, so the layout still holds if a
 * photo fails to load.
 */

export interface SiteImage {
  src: string;
  alt: string;
  /** CSS object-position, for cropping. */
  position?: string;
}

const unsplash = (id: string) => `https://images.unsplash.com/${id}`;

export const images = {
  heroConsultation: {
    src: unsplash("photo-1629909613654-28e377c37b09"),
    alt: "A dentist talking with a patient in a modern treatment room",
    position: "center",
  },
  treatmentRoom: {
    src: unsplash("photo-1629909615184-74f495363b67"),
    alt: "A bright, modern dental treatment room with a patient chair",
  },
  reception: {
    src: unsplash("photo-1606811971618-4486d14f3f99"),
    alt: "A clean, welcoming dental office interior",
  },
  dentistWithPatient: {
    src: unsplash("photo-1588776814546-1ffcf47267a5"),
    alt: "A dental professional examining a patient's teeth",
  },
  consultation: {
    src: unsplash("photo-1598256989800-fe5f95da9787"),
    alt: "A dental professional explaining treatment to a patient",
  },
  equipment: {
    src: unsplash("photo-1606265752439-1f18756aa5fc"),
    alt: "Professional dental instruments arranged on a tray",
  },
  clinic: {
    src: unsplash("photo-1609840114035-3c981b782dfe"),
    alt: "A dental clinic with modern equipment",
  },
  smile: {
    src: unsplash("photo-1570612861542-284f4c12e75f"),
    alt: "A smiling patient at a dental appointment",
  },
} satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof images;
