"use client";

import { usePathname } from "next/navigation";
import { getBasePath } from "@/lib/utils";

export function LanguageSwitcher({ locale }: { locale: string }) {
  const pathname = usePathname();
  const basePath = getBasePath();

  const switchLocale = locale === "es" ? "en" : "es";
  const newPath = pathname.replace(`/${locale}`, `/${switchLocale}`);
  const href = basePath ? `${basePath}${newPath}` : newPath;

  return (
    <a
      href={href}
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-rural-gold/30 hover:border-rural-gold text-xs font-bold uppercase transition-colors hover:bg-rural-gold/10"
      title={locale === "es" ? "Switch to English" : "Cambiar a Español"}
    >
      <span className={locale === "es" ? "text-rural-gold" : "text-rural-white/50"}>
        ES
      </span>
      <span className="text-rural-white/30">/</span>
      <span className={locale === "en" ? "text-rural-gold" : "text-rural-white/50"}>
        EN
      </span>
    </a>
  );
}
