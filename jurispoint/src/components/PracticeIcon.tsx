import { Building2, FileSignature, Home, MessagesSquare, Scale, Users, type LucideProps } from "lucide-react";
import type { PracticeArea } from "@/lib/site";

const icons = {
  building: Building2,
  file: FileSignature,
  scale: Scale,
  home: Home,
  users: Users,
  message: MessagesSquare,
} as const;

export function PracticeIcon({ name, ...props }: { name: PracticeArea["icon"] } & LucideProps) {
  const Icon = icons[name];
  return <Icon aria-hidden="true" strokeWidth={1.5} {...props} />;
}
