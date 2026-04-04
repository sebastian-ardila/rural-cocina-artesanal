"use client";

import { useEffect, useRef } from "react";
import { DisplayCategory } from "@/types/menu";
import { displayCategories } from "@/data/menu";
import type { Icon } from "@phosphor-icons/react";
import {
  CookingPot,
  Hamburger,
  Package,
  PlusCircle,
  Fire,
  Leaf,
} from "@phosphor-icons/react";

interface CategoryTabsProps {
  activeCategory: DisplayCategory | null;
  onSelect: (category: DisplayCategory) => void;
  locale: string;
}

export const categoryIcons: Record<string, Icon> = {
  arepaburger: CookingPot,
  hamburguesa: Hamburger,
  combo: Package,
  extra: PlusCircle,
  "papas-topping": Fire,
  vegetariano: Leaf,
};

const tabs = displayCategories.map((cat) => ({
  id: cat.id,
  label: cat.label,
  icon: categoryIcons[cat.id],
}));

export function CategoryTabs({
  activeCategory,
  onSelect,
  locale,
}: CategoryTabsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const btnMap = useRef<Map<string, HTMLButtonElement>>(new Map());

  useEffect(() => {
    if (!activeCategory) return;
    const btn = btnMap.current.get(activeCategory);
    if (!btn || !containerRef.current) return;

    const bRect = btn.getBoundingClientRect();
    const cRect = containerRef.current.getBoundingClientRect();

    if (bRect.left < cRect.left || bRect.right > cRect.right) {
      btn.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeCategory]);

  return (
    <div ref={containerRef} className="overflow-x-auto scrollbar-hide">
      <div className="grid grid-rows-3 sm:grid-rows-2 grid-flow-col gap-1 sm:gap-1.5 w-max">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          const isActive = activeCategory === tab.id;

          return (
            <button
              key={tab.id}
              ref={(el) => {
                if (el) btnMap.current.set(tab.id, el);
                else btnMap.current.delete(tab.id);
              }}
              onClick={() => onSelect(tab.id)}
              className={`flex items-center gap-1 sm:gap-2 px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg text-[10px] sm:text-xs font-medium whitespace-nowrap transition-all ${
                isActive
                  ? "bg-rural-gold text-rural-black shadow-lg shadow-rural-gold/20"
                  : "text-rural-white/40 hover:text-rural-white/70 hover:bg-rural-white/[0.04]"
              }`}
            >
              {IconComponent && (
                <IconComponent
                  weight="fill"
                  className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0"
                />
              )}
              {locale === "es" ? tab.label.es : tab.label.en}
            </button>
          );
        })}
      </div>
    </div>
  );
}
