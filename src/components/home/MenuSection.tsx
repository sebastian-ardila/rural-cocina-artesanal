"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslations } from "next-intl";
import { MenuItem, DisplayCategory } from "@/types/menu";
import { menuItems, displayCategories } from "@/data/menu";
import { CategoryTabs, categoryIcons } from "../menu/CategoryTabs";
import { MenuCard } from "../menu/MenuCard";
import { MeatChoiceModal } from "../menu/MeatChoiceModal";
import { DishModal } from "../menu/DishModal";

/* ── Data ── */

function buildSections() {
  return displayCategories
    .map((cat) => ({
      ...cat,
      items:
        cat.id === "vegetariano"
          ? menuItems.filter((i) => i.isVegetarian)
          : menuItems.filter((i) => i.category === cat.id),
    }))
    .filter((g) => g.items.length > 0);
}

const sections = buildSections();
const allCatIds = sections.map((s) => s.id);

function getNavbarHeight(): number {
  return document.querySelector("header")?.offsetHeight ?? 64;
}

/* ── Component ── */

export function MenuSection({ locale }: { locale: string }) {
  const t = useTranslations("menu");
  const [activeCategory, setActiveCategory] =
    useState<DisplayCategory | null>(null);
  const [meatChoiceItem, setMeatChoiceItem] = useState<MenuItem | null>(null);
  const [viewDishItem, setViewDishItem] = useState<MenuItem | null>(null);

  const stickyBarRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);

  /* ── 1 & 2. Scroll spy via scroll listener on scroll-root ── */
  useEffect(() => {
    const scrollRoot = document.getElementById('scroll-root');
    if (!scrollRoot) return;

    const onScroll = () => {
      if (isScrollingRef.current) return;

      const barH = stickyBarRef.current?.offsetHeight ?? 80;
      const rootTop = scrollRoot.getBoundingClientRect().top;
      const detectionLine = rootTop + barH + 60;

      // Check if menu section is in view
      const menuEl = document.getElementById('carta');
      if (menuEl) {
        const menuTop = menuEl.getBoundingClientRect().top;
        const menuBottom = menuEl.getBoundingClientRect().bottom;
        if (menuBottom < rootTop || menuTop > rootTop + scrollRoot.clientHeight) {
          setActiveCategory(null);
          return;
        }
      }

      let best: DisplayCategory | null = null;
      let bestTop = -Infinity;

      for (const id of allCatIds) {
        const el = document.getElementById(`cat-${id}`);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= detectionLine && top > bestTop) {
          bestTop = top;
          best = id as DisplayCategory;
        }
      }

      if (!best) {
        setActiveCategory(null);
        return;
      }

      setActiveCategory(best);
    };

    scrollRoot.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => scrollRoot.removeEventListener("scroll", onScroll);
  }, []);

  /* ── 3. Click category → scroll to section ── */
  const scrollToCategory = useCallback((category: DisplayCategory) => {
    isScrollingRef.current = true;
    setActiveCategory(category);

    const el = document.getElementById(`cat-${category}`);
    if (el) {
      const barH = stickyBarRef.current?.offsetHeight ?? 80;
      const scrollRoot = document.getElementById('scroll-root') || document.documentElement;
      const y =
        el.getBoundingClientRect().top - scrollRoot.getBoundingClientRect().top + scrollRoot.scrollTop - barH - 16;
      scrollRoot.scrollTo({ top: y, behavior: "smooth" });
    }

    setTimeout(() => {
      isScrollingRef.current = false;
    }, 1000);
  }, []);

  const gridClass =
    "grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5";

  return (
    <section id="carta" className="py-20 sm:py-28 relative">
      <div className="absolute inset-0 wood-texture opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section title */}
        <div className="text-center mb-12">
          <p className="text-rural-gold/60 text-sm font-medium uppercase tracking-[0.25em] mb-3">
            {locale === "es" ? "Descubre" : "Discover"}
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-rural-gold mb-4">
            {t("title")}
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-rural-gold/40" />
            <div className="w-2 h-2 rounded-full bg-rural-gold/60" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-rural-gold/40" />
          </div>
        </div>

        {/* Sticky category bar */}
        <div
          ref={stickyBarRef}
          className="sticky top-0 z-30 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-3 bg-rural-black border-b border-rural-white/[0.06]"
        >
          <CategoryTabs
            activeCategory={activeCategory}
            onSelect={scrollToCategory}
            locale={locale}
          />
        </div>

        {/* All sections — no lazy loading */}
        <div className="mt-10 space-y-16">
          {sections.map((section) => {
            const Icon = categoryIcons[section.id];
            return (
              <div key={section.id} id={`cat-${section.id}`}>
                <div className="flex items-center gap-5 mb-6">
                  {Icon && (
                    <Icon
                      weight="fill"
                      className="w-6 h-6 text-rural-white/40 shrink-0"
                    />
                  )}
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-rural-white whitespace-nowrap">
                    {locale === "es" ? section.label.es : section.label.en}
                  </h3>
                  <div className="h-px flex-1 bg-gradient-to-r from-rural-gold/20 to-transparent" />
                </div>
                <div className={gridClass}>
                  {section.items.map((item) => (
                    <MenuCard
                      key={item.id}
                      item={item}
                      locale={locale}
                      onMeatChoice={setMeatChoiceItem}
                      onViewDish={setViewDishItem}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Modals */}
        {meatChoiceItem && (
          <MeatChoiceModal
            item={meatChoiceItem}
            locale={locale}
            onClose={() => setMeatChoiceItem(null)}
          />
        )}
        {viewDishItem && (
          <DishModal
            item={viewDishItem}
            locale={locale}
            onClose={() => setViewDishItem(null)}
            onMeatChoice={setMeatChoiceItem}
          />
        )}
      </div>
    </section>
  );
}
