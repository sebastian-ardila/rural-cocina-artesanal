"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { MenuItem, MeatOption } from "@/types/menu";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";

export function MeatChoiceModal({
  item,
  locale,
  onClose,
}: {
  item: MenuItem;
  locale: string;
  onClose: () => void;
}) {
  const t = useTranslations("menu");
  const [selected, setSelected] = useState<MeatOption | null>(null);
  const addItem = useCartStore((s) => s.addItem);
  const name = locale === "es" ? item.name.es : item.name.en;

  const handleConfirm = () => {
    if (!selected) return;
    addItem({
      menuItemId: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      meatChoice: selected,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        className="bg-rural-black border-t sm:border border-rural-gold/20 rounded-t-3xl sm:rounded-2xl max-w-sm w-full p-6 sm:p-7 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag indicator on mobile */}
        <div className="w-10 h-1 rounded-full bg-rural-white/10 mx-auto mb-5 sm:hidden" />

        <h3 className="font-display text-xl text-rural-gold font-bold mb-1">
          {t("chooseMeat")}
        </h3>
        <p className="text-sm text-rural-white/40 mb-1">{name}</p>
        <p className="text-sm text-rural-gold/80 font-semibold mb-5">
          {formatPrice(item.price)}
        </p>

        <div className="space-y-2">
          {(item.meatOptions ?? []).map((option) => (
            <button
              key={option}
              onClick={() => setSelected(option)}
              className={`w-full text-left px-5 py-3.5 rounded-xl transition-all text-sm font-medium ${
                selected === option
                  ? "bg-rural-gold text-rural-black shadow-md shadow-rural-gold/20"
                  : "bg-rural-white/[0.04] text-rural-white/70 hover:bg-rural-white/[0.08] border border-rural-white/[0.06]"
              }`}
            >
              {t(`meatOptions.${option}`)}
            </button>
          ))}
        </div>

        <div className="flex gap-3 mt-7">
          <button
            onClick={onClose}
            className="flex-1 py-3 text-sm text-rural-white/40 hover:text-rural-white border border-rural-white/[0.06] rounded-xl transition-colors"
          >
            {t("cancel")}
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selected}
            className="flex-1 py-3 text-sm font-bold bg-rural-gold text-rural-black rounded-xl hover:bg-rural-gold-dark transition-colors disabled:opacity-25 disabled:cursor-not-allowed"
          >
            {t("confirm")}
          </button>
        </div>
      </div>
    </div>
  );
}
