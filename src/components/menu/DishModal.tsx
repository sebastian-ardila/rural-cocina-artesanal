"use client";

import { useTranslations } from "next-intl";
import { X } from "lucide-react";
import { MenuItem } from "@/types/menu";
import { useCartStore } from "@/store/cart-store";
import { formatPrice, getBasePath } from "@/lib/utils";
import { getIngredientIcon, parseIngredients } from "@/lib/ingredients";

export function DishModal({
  item,
  locale,
  onClose,
  onMeatChoice,
}: {
  item: MenuItem;
  locale: string;
  onClose: () => void;
  onMeatChoice: (item: MenuItem) => void;
}) {
  const t = useTranslations("menu");
  const { addItem, getItemQuantity, updateQuantity, items } = useCartStore();
  const basePath = getBasePath();

  const name = locale === "es" ? item.name.es : item.name.en;
  const description = locale === "es" ? item.description.es : item.description.en;

  const quantity = item.requiresMeatChoice ? 0 : getItemQuantity(item.id);
  const meatChoiceTotal = item.requiresMeatChoice
    ? items.filter((i) => i.menuItemId === item.id).reduce((s, i) => s + i.quantity, 0)
    : 0;
  const totalInCart = quantity + meatChoiceTotal;

  const handleAdd = () => {
    if (item.requiresMeatChoice) {
      onClose();
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
      onClose();
      onMeatChoice(item);
      return;
    }
    updateQuantity(item.id, quantity - 1);
  };

  const ingredients = parseIngredients(description);

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        className="bg-rural-black border-t sm:border border-rural-white/[0.08] rounded-t-3xl sm:rounded-2xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag indicator on mobile */}
        <div className="w-10 h-1 rounded-full bg-rural-white/10 mx-auto mt-3 mb-1 sm:hidden" />

        {/* Image */}
        <div className="relative aspect-[16/10] shrink-0">
          {item.image ? (
            <img
              src={`${basePath}${item.image}`}
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-rural-brown/30 via-rural-black/50 to-rural-brown/20 flex items-center justify-center">
              <img
                src={`${basePath}/images/rural-logo.png`}
                alt=""
                width={60}
                height={60}
                className="opacity-20 rounded-full"
              />
            </div>
          )}

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 rounded-full bg-rural-black/60 backdrop-blur-sm text-rural-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Vegetarian badge */}
          {item.isVegetarian && (
            <span className="absolute top-3 left-3 bg-green-600/90 text-white text-[11px] px-2.5 py-1 rounded-full font-semibold backdrop-blur-sm uppercase tracking-wide">
              {t("vegetarian")}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6">
          <h2 className="font-display text-xl sm:text-2xl font-bold text-rural-white">
            {name}
          </h2>
          <p className="text-lg font-bold text-rural-gold mt-1">
            {formatPrice(item.price)}
          </p>

          {/* Ingredients */}
          <div className="mt-5">
            <h3 className="text-xs font-semibold text-rural-white/40 uppercase tracking-wider mb-3">
              {t("ingredients")}
            </h3>
            <div className="flex flex-wrap gap-2">
              {ingredients.map((ingredient, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 bg-rural-white/[0.04] border border-rural-white/[0.06] rounded-full text-sm text-rural-white/60"
                >
                  {getIngredientIcon(ingredient)} {ingredient}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom action */}
        <div className="p-5 border-t border-rural-white/[0.05] shrink-0">
          {totalInCart > 0 ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleDecrement}
                  className="w-10 h-10 rounded-full bg-rural-gold/10 border border-rural-gold/30 flex items-center justify-center text-rural-gold hover:bg-rural-gold/20 transition-colors text-lg font-bold"
                >
                  -
                </button>
                <span className="text-lg font-bold text-rural-gold min-w-[1.5rem] text-center">
                  {totalInCart}
                </span>
                <button
                  onClick={handleAdd}
                  className="w-10 h-10 rounded-full bg-rural-gold text-rural-black flex items-center justify-center hover:bg-rural-gold-dark transition-colors text-lg font-bold"
                >
                  +
                </button>
              </div>
              <span className="text-sm text-rural-gold font-medium">
                {formatPrice(item.price * totalInCart)}
              </span>
            </div>
          ) : (
            <button
              onClick={handleAdd}
              className="w-full py-3.5 bg-rural-gold hover:bg-rural-gold-light text-rural-black font-bold rounded-xl transition-all text-base"
            >
              {t("addToCart")} — {formatPrice(item.price)}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
