import { BookOpen, Crown, Droplets, HeartPulse, Search, ShieldCheck, Sparkles, Wrench, type LucideProps } from "lucide-react";
import type { ServiceIcon as ServiceIconName } from "@/config/services";

const icons = {
  shield: ShieldCheck,
  search: Search,
  wrench: Wrench,
  sparkles: Sparkles,
  droplets: Droplets,
  crown: Crown,
  "heart-pulse": HeartPulse,
  "book-open": BookOpen,
} satisfies Record<ServiceIconName, unknown>;

export function ServiceIcon({ name, ...props }: { name: ServiceIconName } & LucideProps) {
  const Icon = icons[name];
  return <Icon aria-hidden="true" {...props} />;
}
