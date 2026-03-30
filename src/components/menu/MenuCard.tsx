"use client";

import { useTranslations } from "next-intl";
import { Eye } from "lucide-react";
import { MenuItem } from "@/types/menu";
import { useCartStore } from "@/store/cart-store";
import { formatPrice, getBasePath } from "@/lib/utils";
import { getIngredientIcon, parseIngredients } from "@/lib/ingredients";

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
  const ingredients = parseIngredients(description);

  const quantity = item.requiresMeatChoice ? 0 : getItemQuantity(item.id);
  const meatChoiceTotal = item.requiresMeatChoice
    ? items.filter((i) => i.menuItemId === item.id).reduce((sum, i) => sum + i.quantity, 0)
    : 0;
  const totalInCart = quantity + meatChoiceTotal;

  const handleAdd = () => {
    if (item.requiresMeatChoice) { onMeatChoice(item); return; }
    addItem({ menuItemId: item.id, name: item.name, price: item.price, image: item.image });
  };

  const handleDecrement = () => {
    if (item.requiresMeatChoice) { onMeatChoice(item); return; }
    updateQuantity(item.id, quantity - 1);
  };

  return (
    <div className="relative rounded-2xl overflow-hidden group border border-rural-white/[0.07] hover:border-rural-gold/25 transition-all duration-300 hover:shadow-lg hover:shadow-rural-gold/5 flex flex-col">
      {/* Image area */}
      <div className="relative aspect-[4/3] shrink-0">
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
              width={36}
              height={36}
              className="opacity-15 rounded-full"
            />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-rural-black/70 to-transparent" />

        {/* Top badges */}
        <div className="absolute top-0 inset-x-0 p-2 flex items-start justify-between">
          {item.isVegetarian ? (
            <span className="bg-green-600/90 text-white text-[9px] px-2 py-0.5 rounded-full font-semibold backdrop-blur-sm uppercase">
              {t("vegetarian")}
            </span>
          ) : <span />}
          <button
            onClick={() => onViewDish(item)}
            className="flex items-center gap-1 bg-rural-black/60 backdrop-blur-sm text-rural-white/80 hover:text-rural-gold text-[10px] font-medium px-2 py-1 rounded-full transition-colors"
          >
            <Eye className="w-3 h-3" />
            <span className="hidden sm:inline">{t("viewDish")}</span>
          </button>
        </div>

        {/* Name on image */}
        <div className="absolute bottom-0 inset-x-0 p-2.5 sm:p-3">
          <h3 className="font-display text-sm sm:text-base font-bold text-white leading-tight">
            {name}
          </h3>
        </div>
      </div>

      {/* Content below image */}
      <div className="p-2.5 sm:p-3 flex flex-col flex-1 bg-rural-black">
        {/* Ingredients */}
        <div className="flex flex-wrap gap-1 flex-1">
          {ingredients.map((ing, i) => (
            <span
              key={i}
              className="text-[10px] sm:text-[11px] text-rural-white/50 bg-rural-white/[0.04] px-1.5 py-0.5 rounded-md self-start"
            >
              {getIngredientIcon(ing)} {ing}
            </span>
          ))}
        </div>

        {/* Price + add button — always at bottom */}
        <div className="flex items-center justify-between pt-3 mt-auto border-t border-rural-white/[0.04]">
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
              className="w-8 h-8 rounded-full bg-rural-gold/15 border border-rural-gold/30 text-rural-gold flex items-center justify-center hover:bg-rural-gold hover:text-rural-black transition-all text-lg font-bold"
            >
              +
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
