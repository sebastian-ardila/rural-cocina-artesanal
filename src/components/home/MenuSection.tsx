"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { MenuItem } from "@/types/menu";
import { menuItems, categories } from "@/data/menu";
import { CategoryTabs, FilterValue } from "../menu/CategoryTabs";
import { MenuCard } from "../menu/MenuCard";
import { MeatChoiceModal } from "../menu/MeatChoiceModal";

export function MenuSection({ locale }: { locale: string }) {
  const t = useTranslations("menu");
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");
  const [meatChoiceItem, setMeatChoiceItem] = useState<MenuItem | null>(null);

  return (
    <section id="carta" className="py-20 sm:py-28 relative">
      {/* Subtle background texture */}
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

        {/* Category tabs */}
        <div className="mb-10 sticky top-16 sm:top-20 z-30 bg-rural-black/80 backdrop-blur-xl py-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:bg-transparent sm:backdrop-blur-none sm:static">
          <CategoryTabs
            active={activeFilter}
            onSelect={setActiveFilter}
            locale={locale}
          />
        </div>

        {/* Content */}
        {activeFilter === "all" ? (
          <div className="space-y-16">
            {categories.map((cat) => {
              const items = menuItems.filter((i) => i.category === cat.id);
              if (items.length === 0) return null;
              return (
                <div key={cat.id}>
                  {/* Category header */}
                  <div className="flex items-center gap-5 mb-8">
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-rural-white whitespace-nowrap">
                      {locale === "es" ? cat.label.es : cat.label.en}
                    </h3>
                    <div className="h-px flex-1 bg-gradient-to-r from-rural-gold/20 to-transparent" />
                  </div>
                  {/* Products grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                    {items.map((item) => (
                      <MenuCard
                        key={item.id}
                        item={item}
                        locale={locale}
                        onMeatChoice={setMeatChoiceItem}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {menuItems
              .filter((item) => item.category === activeFilter)
              .map((item) => (
                <MenuCard
                  key={item.id}
                  item={item}
                  locale={locale}
                  onMeatChoice={setMeatChoiceItem}
                />
              ))}
          </div>
        )}

        {/* Meat choice modal */}
        {meatChoiceItem && (
          <MeatChoiceModal
            item={meatChoiceItem}
            locale={locale}
            onClose={() => setMeatChoiceItem(null)}
          />
        )}
      </div>
    </section>
  );
}
