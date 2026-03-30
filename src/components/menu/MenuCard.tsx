"use client";

import { useTranslations } from "next-intl";
import { MenuItem } from "@/types/menu";
import { useCartStore } from "@/store/cart-store";
import { formatPrice, getBasePath } from "@/lib/utils";

export function MenuCard({
  item,
  locale,
  onMeatChoice,
}: {
  item: MenuItem;
  locale: string;
  onMeatChoice: (item: MenuItem) => void;
}) {
  const t = useTranslations("menu");
  const { addItem, getItemQuantity, updateQuantity, items } = useCartStore();
  const basePath = getBasePath();

  const name = locale === "es" ? item.name.es : item.name.en;
  const description =
    locale === "es" ? item.description.es : item.description.en;

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
    <div className="relative bg-gradient-to-b from-rural-white/[0.04] to-rural-white/[0.01] border border-rural-white/[0.07] rounded-2xl overflow-hidden hover:border-rural-gold/25 transition-all duration-300 group hover:shadow-lg hover:shadow-rural-gold/5">
      {/* Image placeholder */}
      <div className="aspect-[16/10] relative overflow-hidden">
        {item.image ? (
          <img
            src={`${basePath}${item.image}`}
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-rural-brown/20 via-rural-black/30 to-rural-brown/10">
            <img
              src={`${basePath}/images/rural-logo.png`}
              alt=""
              width={40}
              height={40}
              className="opacity-15 rounded-full"
            />
          </div>
        )}

        {/* Vegetarian badge */}
        {item.isVegetarian && (
          <span className="absolute top-3 left-3 bg-green-600/90 text-white text-[11px] px-2.5 py-1 rounded-full font-semibold backdrop-blur-sm tracking-wide uppercase">
            {t("vegetarian")}
          </span>
        )}

        {/* Price overlay on image */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-rural-black/80 to-transparent pt-8 pb-3 px-4">
          <span className="text-base font-bold text-rural-gold drop-shadow-lg">
            {formatPrice(item.price)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        <h3 className="font-display text-base sm:text-lg font-bold text-rural-white group-hover:text-rural-gold transition-colors leading-tight">
          {name}
        </h3>
        <p className="text-xs sm:text-sm text-rural-white/45 mt-2 line-clamp-2 leading-relaxed">
          {description}
        </p>

        <div className="mt-4 pt-3 border-t border-rural-white/5">
          {totalInCart > 0 ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleDecrement}
                  className="w-9 h-9 rounded-full bg-rural-gold/10 border border-rural-gold/30 flex items-center justify-center text-rural-gold hover:bg-rural-gold/20 transition-colors text-base font-bold"
                >
                  -
                </button>
                <span className="text-base font-bold text-rural-gold min-w-[1.5rem] text-center">
                  {totalInCart}
                </span>
                <button
                  onClick={handleAdd}
                  className="w-9 h-9 rounded-full bg-rural-gold text-rural-black flex items-center justify-center hover:bg-rural-gold-dark transition-colors text-base font-bold"
                >
                  +
                </button>
              </div>
              <span className="text-xs text-rural-white/30 font-medium uppercase tracking-wider">
                {t("added")}
              </span>
            </div>
          ) : (
            <button
              onClick={handleAdd}
              className="w-full py-2.5 bg-rural-gold/10 border border-rural-gold/25 text-rural-gold text-sm font-semibold rounded-xl hover:bg-rural-gold hover:text-rural-black transition-all duration-200"
            >
              {t("addToCart")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
