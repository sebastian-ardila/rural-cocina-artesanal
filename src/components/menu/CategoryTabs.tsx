"use client";

import { MenuCategory } from "@/types/menu";
import { categories } from "@/data/menu";

export type FilterValue = MenuCategory | "all";

export function CategoryTabs({
  active,
  onSelect,
  locale,
}: {
  active: FilterValue;
  onSelect: (cat: FilterValue) => void;
  locale: string;
}) {
  const allLabel = locale === "es" ? "Todos" : "All";

  const allItems: { id: FilterValue; label: string }[] = [
    { id: "all", label: allLabel },
    ...categories.map((c) => ({
      id: c.id as FilterValue,
      label: locale === "es" ? c.label.es : c.label.en,
    })),
  ];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide sm:flex-wrap sm:justify-center">
      {allItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onSelect(item.id)}
          className={`shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-200 ${
            active === item.id
              ? "bg-rural-gold text-rural-black shadow-lg shadow-rural-gold/20"
              : "bg-rural-white/[0.04] text-rural-white/60 hover:bg-rural-white/[0.08] hover:text-rural-white border border-rural-white/[0.06]"
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
