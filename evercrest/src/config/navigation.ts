export interface NavItem {
  label: string;
  href: string;
}

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Dental Services", href: "/services" },
  { label: "Patient Information", href: "/patient-information" },
  { label: "Contact", href: "/contact" },
];

export const APPOINTMENT_HREF = "/contact#request-appointment";

export const legalNav: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Accessibility", href: "/accessibility" },
];

export function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
