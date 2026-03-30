"use client";

import { useTranslations } from "next-intl";
import { Eye } from "lucide-react";
import { MenuItem } from "@/types/menu";
import { useCartStore } from "@/store/cart-store";
import { formatPrice, getBasePath } from "@/lib/utils";

export function MenuCard({
  item,
  locale,
  onMeatChoice,
  onViewDish,
}: {
  item: MenuItem;
  locale: string;
  onMeatChoice: (item: MenuItem) => void;
  onViewDish: (item: MenuItem) => void;
}) {
  const t = useTranslations("menu");
  const { addItem, getItemQuantity, updateQuantity, items } = useCartStore();
  const basePath = getBasePath();

  const name = locale === "es" ? item.name.es : item.name.en;
  const description = locale === "es" ? item.description.es : item.description.en;

  const quantity = item.requiresMeatChoice ? 0 : getItemQuantity(item.id);
  const meatChoiceTotal = item.requiresMeatChoice
    ? items
        .filter((i) => i.menuItemId === item.id)
        .reduce((sum, i) => sum + i.quantity, 0)
    : 0;
  const totalInCart = quantity + meatChoiceTotal;

  const handleAdd = () => {
    if (item.requiresMeatChoice) {
      onMeatChoice(item);
      return;
    }
    addItem({
      menuItemId: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    });
  };

  const handleDecrement = () => {
    if (item.requiresMeatChoice) {
      onMeatChoice(item);
      return;
    }
    updateQuantity(item.id, quantity - 1);
  };

  return (
    <div className="relative rounded-2xl overflow-hidden group border border-rural-white/[0.07] hover:border-rural-gold/25 transition-all duration-300 hover:shadow-lg hover:shadow-rural-gold/5">
      {/* Background image / placeholder */}
      <div className="relative aspect-[3/4] sm:aspect-[4/5]">
        {item.image ? (
          <img
            src={`${basePath}${item.image}`}
            alt={name}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-rural-brown/30 via-rural-black/50 to-rural-brown/20 flex items-center justify-center">
            <img
              src={`${basePath}/images/rural-logo.png`}
              alt=""
              width={40}
              height={40}
              className="opacity-15 rounded-full"
            />
          </div>
        )}

        {/* Full overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-rural-black via-rural-black/50 to-rural-black/20" />

        {/* Top row: vegetarian badge + view dish button */}
        <div className="absolute top-0 inset-x-0 p-2.5 flex items-start justify-between">
          {item.isVegetarian ? (
            <span className="bg-green-600/90 text-white text-[10px] px-2 py-0.5 rounded-full font-semibold backdrop-blur-sm uppercase tracking-wide">
              {t("vegetarian")}
            </span>
          ) : (
            <span />
          )}
          <button
            onClick={() => onViewDish(item)}
            className="flex items-center gap-1 bg-rural-black/60 backdrop-blur-sm text-rural-white/80 hover:text-rural-gold text-[11px] font-medium px-2.5 py-1.5 rounded-full transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t("viewDish")}</span>
          </button>
        </div>

        {/* Bottom content overlay */}
        <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4">
          <h3 className="font-display text-sm sm:text-base font-bold text-white leading-tight line-clamp-2">
            {name}
          </h3>
          <p className="text-[10px] sm:text-xs text-rural-white/40 mt-1 line-clamp-2 leading-relaxed">
            {description}
          </p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm sm:text-base font-bold text-rural-gold">
              {formatPrice(item.price)}
            </span>

            {totalInCart > 0 ? (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleDecrement}
                  className="w-7 h-7 rounded-full bg-rural-gold/20 border border-rural-gold/40 flex items-center justify-center text-rural-gold text-sm font-bold"
                >
                  -
                </button>
                <span className="text-sm font-bold text-rural-gold min-w-[1.2rem] text-center">
                  {totalInCart}
                </span>
                <button
                  onClick={handleAdd}
                  className="w-7 h-7 rounded-full bg-rural-gold text-rural-black flex items-center justify-center text-sm font-bold"
                >
                  +
                </button>
              </div>
            ) : (
              <button
                onClick={handleAdd}
                className="px-3 py-1.5 bg-rural-gold/15 border border-rural-gold/30 text-rural-gold text-xs sm:text-sm font-semibold rounded-full hover:bg-rural-gold hover:text-rural-black transition-all"
              >
                +
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
