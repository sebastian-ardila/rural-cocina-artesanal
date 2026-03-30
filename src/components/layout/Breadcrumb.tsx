"use client";

import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Home, ChevronRight } from "lucide-react";
import { getBasePath } from "@/lib/utils";
import { navLinks } from "@/data/nav";

export function Breadcrumb({ locale }: { locale: string }) {
  const pathname = usePathname();
  const t = useTranslations("nav");
  const basePath = getBasePath();

  // Don't show on home page
  const segments = pathname.replace(`/${locale}`, "").split("/").filter(Boolean);
  if (segments.length === 0) return null;

  const currentSlug = segments[0];
  const currentLink = navLinks.find((l) => l.slug === currentSlug);
  if (!currentLink) return null;

  const CurrentIcon = currentLink.Icon;

  return (
    <nav
      aria-label="Breadcrumb"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3"
    >
      <ol className="flex items-center gap-2 text-sm">
        <li>
          <a
            href={`${basePath}/${locale}/`}
            className="flex items-center gap-1.5 text-rural-white/35 hover:text-rural-gold transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>{t("home")}</span>
          </a>
        </li>
        <li className="text-rural-white/20">
          <ChevronRight className="w-4 h-4" />
        </li>
        <li>
          <span className="flex items-center gap-1.5 text-rural-gold font-medium">
            <CurrentIcon className="w-4 h-4" />
            <span>{t(currentLink.label)}</span>
          </span>
        </li>
      </ol>
    </nav>
  );
}
