import {
  UtensilsCrossed,
  CalendarDays,
  Clock,
  BookOpen,
  Mail,
  type LucideIcon,
} from "lucide-react";

export interface NavLink {
  href: string;
  slug: string;
  label: string;
  Icon: LucideIcon;
}

export const navLinks: NavLink[] = [
  { href: "/#carta", slug: "", label: "menu", Icon: UtensilsCrossed },
  { href: "/reservas/", slug: "reservas", label: "reservations", Icon: CalendarDays },
  { href: "/horarios/", slug: "horarios", label: "schedule", Icon: Clock },
  { href: "/historia/", slug: "historia", label: "history", Icon: BookOpen },
  { href: "/contacto/", slug: "contacto", label: "contact", Icon: Mail },
];
