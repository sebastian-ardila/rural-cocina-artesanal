"use client";

import { useTranslations } from "next-intl";
import { useCartStore } from "@/store/cart-store";
import { CartItem as CartItemType } from "@/types/menu";
import { formatPrice } from "@/lib/utils";

export function CartItem({
  item,
  locale,
}: {
  item: CartItemType;
  locale: string;
}) {
  const t = useTranslations("cart");
  const tMenu = useTranslations("menu");
  const { updateQuantity, removeItem } = useCartStore();
  const name = locale === "es" ? item.name.es : item.name.en;

  return (
    <div className="flex gap-4 py-4 border-b border-rural-white/[0.04] group">
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-rural-white leading-tight">
          {name}
        </h4>
        {item.meatChoice && (
          <p className="text-xs text-rural-gold/60 mt-1">
            {tMenu(`meatOptions.${item.meatChoice}`)}
          </p>
        )}
        <p className="text-sm text-rural-gold font-bold mt-1.5">
          {formatPrice(item.price * item.quantity)}
        </p>
      </div>

      <div className="flex items-center gap-2.5 shrink-0">
        <button
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          className="w-8 h-8 rounded-full border border-rural-white/10 flex items-center justify-center text-rural-white/60 hover:text-rural-gold hover:border-rural-gold/30 transition-colors text-sm font-medium"
        >
          -
        </button>
        <span className="text-sm font-bold w-5 text-center text-rural-white">
          {item.quantity}
        </span>
        <button
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="w-8 h-8 rounded-full border border-rural-white/10 flex items-center justify-center text-rural-white/60 hover:text-rural-gold hover:border-rural-gold/30 transition-colors text-sm font-medium"
        >
          +
        </button>
        <button
          onClick={() => removeItem(item.id)}
          className="ml-1 p-1.5 rounded-full text-rural-white/20 hover:text-red-400 hover:bg-red-400/5 transition-colors opacity-0 group-hover:opacity-100"
          aria-label={t("remove")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
