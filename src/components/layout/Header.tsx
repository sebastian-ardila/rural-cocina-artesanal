"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { Menu, X, Home } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { CartButton } from "../cart/CartButton";
import { Breadcrumb } from "./Breadcrumb";
import { getBasePath } from "@/lib/utils";
import { navLinks } from "@/data/nav";

export function Header({ locale }: { locale: string }) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartaSectionVisible, setCartaSectionVisible] = useState(false);
  const basePath = getBasePath();

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => document.body.classList.remove("no-scroll");
  }, [menuOpen]);

  // Track if #carta section is in view
  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    function tryObserve() {
      const section = document.getElementById("carta");
      if (!section) {
        // Section not mounted yet, retry
        setTimeout(tryObserve, 500);
        return;
      }
      const scrollRoot = document.getElementById('scroll-root') || null;
      observer = new IntersectionObserver(
        ([entry]) => setCartaSectionVisible(entry.isIntersecting),
        { threshold: 0, rootMargin: "-80px 0px 0px 0px", root: scrollRoot }
      );
      observer.observe(section);
    }

    tryObserve();
    return () => observer?.disconnect();
  }, [pathname]);

  const buildHref = useCallback(
    (link: (typeof navLinks)[number]) => {
      if (link.href.startsWith("/#"))
        return `${basePath}/${locale}/${link.href.substring(1)}`;
      return `${basePath}/${locale}${link.href}`;
    },
    [basePath, locale]
  );

  function isActive(link: (typeof navLinks)[number]) {
    // For the carta/menu link, check if the section is visible
    if (link.href === "/#carta") {
      const isHomePage =
        pathname === `/${locale}` || pathname === `/${locale}/`;
      return isHomePage && cartaSectionVisible;
    }
    // For subpages, match the slug
    if (link.slug) {
      return pathname.startsWith(`/${locale}/${link.slug}`);
    }
    return false;
  }

  return (
    <>
      <header className="z-40 bg-rural-black shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <a
              href={`${basePath}/${locale}/`}
              className="flex items-center gap-3 shrink-0"
            >
              <img
                src={`${basePath}/images/rural-logo.png`}
                alt="Rural Cocina Artesanal"
                width={44}
                height={44}
                className="rounded-full"
              />
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-7">
              {navLinks.map((link) => {
                const IconComponent = link.Icon;
                const active = isActive(link);
                return (
                  <a
                    key={link.label}
                    href={buildHref(link)}
                    className={`nav-link flex items-center gap-1.5 text-sm font-medium tracking-wide uppercase transition-colors hover:text-rural-gold ${
                      active ? "text-rural-gold active" : "text-rural-white/70"
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    {t(link.label)}
                  </a>
                );
              })}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <div className="hidden md:block">
                <LanguageSwitcher locale={locale} />
              </div>
              <CartButton />

              {/* Hamburger */}
              <button
                onClick={() => setMenuOpen(true)}
                className="md:hidden p-2 text-rural-white/80 hover:text-rural-gold transition-colors"
                aria-label="Menu"
              >
                <Menu className="w-7 h-7" />
              </button>
            </div>
          </div>
        </div>
        <Breadcrumb locale={locale} />
      </header>

      {/* Fullscreen Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-rural-black/[0.97] backdrop-blur-xl mobile-menu-enter">
          <div className="flex flex-col h-full">
            {/* Top bar */}
            <div className="flex items-center justify-between px-6 py-5">
              <a
                href={`${basePath}/${locale}/`}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3"
              >
                <img
                  src={`${basePath}/images/rural-logo.png`}
                  alt="Rural Cocina Artesanal"
                  width={44}
                  height={44}
                  className="rounded-full"
                />
                <span
                  className="text-2xl text-rural-gold font-bold tracking-wider uppercase"
                  style={{ fontFamily: "var(--font-brand)" }}
                >
                  RURAL
                </span>
              </a>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 text-rural-white/60 hover:text-rural-white transition-colors"
                aria-label="Close menu"
              >
                <X className="w-8 h-8" />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 flex flex-col items-center justify-center gap-1 px-6">
              {navLinks.map((link, i) => {
                const IconComponent = link.Icon;
                return (
                  <a
                    key={link.label}
                    href={buildHref(link)}
                    onClick={() => setMenuOpen(false)}
                    className={`w-full flex items-center justify-center gap-4 py-4 text-2xl font-display font-bold tracking-wide transition-colors border-b border-rural-white/5 ${
                      isActive(link)
                        ? "text-rural-gold"
                        : "text-rural-white/80"
                    } hover:text-rural-gold`}
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    <IconComponent className="w-6 h-6 shrink-0" />
                    {t(link.label)}
                  </a>
                );
              })}
            </nav>

            {/* Bottom */}
            <div className="px-6 pb-8 pt-4 flex flex-col items-center gap-5">
              <LanguageSwitcher locale={locale} />
              <div className="flex items-center gap-6">
                <a
                  href="https://wa.me/573115719922"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-rural-white/40 hover:text-rural-gold transition-colors"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </a>
                <a
                  href="https://instagram.com/ruralpereira"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-rural-white/40 hover:text-rural-gold transition-colors"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
                <a
                  href="https://facebook.com/rural.salento/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-rural-white/40 hover:text-rural-gold transition-colors"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
