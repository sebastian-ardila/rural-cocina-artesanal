"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useCartStore } from "@/store/cart-store";
import { CartItem } from "./CartItem";
import { buildOrderMessage, openWhatsApp } from "@/lib/whatsapp";
import { formatPrice } from "@/lib/utils";

type PaymentMethod = "nequi" | "transfer" | "cash";
type OrderType = "table" | "delivery";

export function CartDrawer({ locale }: { locale: string }) {
  const t = useTranslations("cart");
  const { items, isOpen, closeCart, clearCart, getTotalPrice } = useCartStore();
  const total = getTotalPrice();

  const [step, setStep] = useState<1 | 2>(1);
  const [customerName, setCustomerName] = useState("");
  const [payment, setPayment] = useState<PaymentMethod | "">("");
  const [orderType, setOrderType] = useState<OrderType | "">("");
  const [tried, setTried] = useState(false);

  const missingName = !customerName.trim();
  const missingPayment = !payment;
  const missingType = !orderType;
  const isValid = !missingName && !missingPayment && !missingType;

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
      setStep(1);
      setTried(false);
    }
    return () => document.body.classList.remove("no-scroll");
  }, [isOpen]);

  const handleSendOrder = () => {
    setTried(true);
    if (!isValid) return;
    const paymentLabels: Record<PaymentMethod, string> = {
      nequi: t("paymentNequi"),
      transfer: t("paymentTransfer"),
      cash: t("paymentCash"),
    };
    const orderTypeLabels: Record<OrderType, string> = {
      table: t("orderTable"),
      delivery: t("orderDelivery"),
    };
    const message = buildOrderMessage(
      items,
      total,
      locale,
      customerName,
      paymentLabels[payment as PaymentMethod],
      orderTypeLabels[orderType as OrderType]
    );
    openWhatsApp(message);
  };

  const showError = (missing: boolean) => tried && missing;

  const inputClass =
    "w-full px-4 py-3.5 bg-rural-white/[0.04] border border-rural-white/[0.08] rounded-xl text-rural-white text-base placeholder:text-rural-white/25 focus:outline-none focus:border-rural-gold/40 focus:ring-2 focus:ring-rural-gold/10 transition-all";

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-rural-black/95 backdrop-blur-xl border-l border-rural-gold/10 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-rural-white/5">
            <div>
              <h2 className="font-display text-xl text-rural-gold font-bold">
                {step === 1 ? t("title") : t("step2Title")}
              </h2>
              {step === 1 && items.length > 0 && (
                <p className="text-xs text-rural-white/30 mt-0.5">
                  {items.reduce((s, i) => s + i.quantity, 0)} {t("items")}
                </p>
              )}
              {step === 2 && (
                <p className="text-xs text-rural-white/30 mt-0.5">
                  {formatPrice(total)}
                </p>
              )}
            </div>
            <button
              onClick={closeCart}
              className="p-2 rounded-full hover:bg-rural-white/5 text-rural-white/50 hover:text-rural-white transition-colors"
              aria-label={t("close")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {step === 1 ? (
            <>
              {/* Step 1: Cart items */}
              <div className="flex-1 overflow-y-auto px-6 py-4">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="w-20 h-20 rounded-full bg-rural-white/[0.03] flex items-center justify-center mb-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={0.8}
                        stroke="currentColor"
                        className="w-10 h-10 text-rural-white/15"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                        />
                      </svg>
                    </div>
                    <p className="text-rural-white/40 font-medium">
                      {t("empty")}
                    </p>
                    <p className="text-rural-white/20 text-sm mt-1.5 max-w-[220px]">
                      {t("emptyMessage")}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {items.map((item) => (
                      <CartItem key={item.id} item={item} locale={locale} />
                    ))}
                  </div>
                )}
              </div>

              {/* Step 1 Footer */}
              {items.length > 0 && (
                <div className="px-6 py-5 border-t border-rural-white/5 space-y-4 bg-rural-black/50">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-rural-white/50 uppercase tracking-wider font-medium">
                      {t("total")}
                    </span>
                    <span className="text-xl font-bold text-rural-gold">
                      {formatPrice(total)}
                    </span>
                  </div>
                  <button
                    onClick={() => setStep(2)}
                    className="w-full py-3.5 px-6 bg-rural-gold hover:bg-rural-gold-light text-rural-black font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    {t("continue")}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={clearCart}
                    className="w-full py-2 text-xs text-rural-white/25 hover:text-rural-white/50 transition-colors uppercase tracking-wider"
                  >
                    {t("remove")} {t("title").toLowerCase()}
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              {/* Step 2: Customer info */}
              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-rural-white/60 mb-2 uppercase tracking-wider">
                    {t("customerName")}
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder={t("customerNamePlaceholder")}
                    className={`${inputClass} ${showError(missingName) ? "border-red-500" : ""}`}
                  />
                  {showError(missingName) && (
                    <p className="text-red-400 text-xs mt-1.5">
                      {t("nameRequired")}
                    </p>
                  )}
                </div>

                {/* Payment method */}
                <div>
                  <label
                    className={`block text-sm font-semibold mb-3 uppercase tracking-wider ${
                      showError(missingPayment)
                        ? "text-red-400"
                        : "text-rural-white/60"
                    }`}
                  >
                    {t("paymentMethod")}
                  </label>
                  <div
                    className={`grid grid-cols-3 gap-2 rounded-xl ${
                      showError(missingPayment)
                        ? "ring-1 ring-red-500/30 p-0.5"
                        : ""
                    }`}
                  >
                    {(["nequi", "transfer", "cash"] as PaymentMethod[]).map(
                      (method) => (
                        <button
                          key={method}
                          type="button"
                          onClick={() => setPayment(method)}
                          className={`py-3 px-3 rounded-xl text-sm font-medium transition-all text-center border ${
                            payment === method
                              ? "bg-rural-gold text-rural-black shadow-md shadow-rural-gold/20 border-rural-gold"
                              : showError(missingPayment)
                                ? "bg-rural-white/[0.04] text-rural-white/60 border-red-500/30"
                                : "bg-rural-white/[0.04] text-rural-white/60 hover:bg-rural-white/[0.08] border-rural-white/[0.06]"
                          }`}
                        >
                          {method === "nequi" && "📱 "}
                          {method === "transfer" && "🏦 "}
                          {method === "cash" && "💵 "}
                          {t(
                            `payment${method.charAt(0).toUpperCase() + method.slice(1)}` as
                              | "paymentNequi"
                              | "paymentTransfer"
                              | "paymentCash"
                          )}
                        </button>
                      )
                    )}
                  </div>
                  {showError(missingPayment) && (
                    <p className="text-red-400 text-xs mt-1.5">
                      {t("paymentRequired")}
                    </p>
                  )}
                </div>

                {/* Order type */}
                <div>
                  <label
                    className={`block text-sm font-semibold mb-3 uppercase tracking-wider ${
                      showError(missingType)
                        ? "text-red-400"
                        : "text-rural-white/60"
                    }`}
                  >
                    {t("orderType")}
                  </label>
                  <div
                    className={`grid grid-cols-2 gap-3 rounded-xl ${
                      showError(missingType)
                        ? "ring-1 ring-red-500/30 p-0.5"
                        : ""
                    }`}
                  >
                    {(["table", "delivery"] as OrderType[]).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setOrderType(type)}
                        className={`py-4 px-4 rounded-xl text-sm font-medium transition-all text-center border ${
                          orderType === type
                            ? "bg-rural-gold text-rural-black shadow-md shadow-rural-gold/20 border-rural-gold"
                            : showError(missingType)
                              ? "bg-rural-white/[0.04] text-rural-white/60 border-red-500/30"
                              : "bg-rural-white/[0.04] text-rural-white/60 hover:bg-rural-white/[0.08] border-rural-white/[0.06]"
                        }`}
                      >
                        {type === "table" ? "🍽️" : "🛵"}{" "}
                        {t(type === "table" ? "orderTable" : "orderDelivery")}
                      </button>
                    ))}
                  </div>
                  {showError(missingType) && (
                    <p className="text-red-400 text-xs mt-1.5">
                      {t("orderTypeRequired")}
                    </p>
                  )}
                </div>

                {/* Order summary */}
                <div className="bg-rural-white/[0.03] border border-rural-white/[0.05] rounded-2xl p-4">
                  <p className="text-xs text-rural-white/30 uppercase tracking-wider font-medium mb-3">
                    {t("title")}
                  </p>
                  <div className="space-y-1.5">
                    {items.map((item) => {
                      const name =
                        locale === "es" ? item.name.es : item.name.en;
                      return (
                        <div
                          key={item.id}
                          className="flex justify-between text-sm"
                        >
                          <span className="text-rural-white/60">
                            {item.quantity}x {name}
                          </span>
                          <span className="text-rural-white/40">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex justify-between mt-3 pt-3 border-t border-rural-white/[0.05]">
                    <span className="font-semibold text-rural-white/70">
                      {t("total")}
                    </span>
                    <span className="font-bold text-rural-gold">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Step 2 Footer */}
              <div className="px-6 py-5 border-t border-rural-white/5 space-y-3 bg-rural-black/50">
                <button
                  onClick={handleSendOrder}
                  className={`w-full py-3.5 px-6 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-green-600/20 ${
                    !isValid
                      ? "opacity-30 cursor-not-allowed shadow-none"
                      : ""
                  }`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  {t("sendWhatsApp")}
                </button>
                {tried && !isValid && (
                  <p className="text-red-400 text-xs text-center">
                    {t("requiredFields")}
                  </p>
                )}
                <button
                  onClick={() => {
                    setStep(1);
                    setTried(false);
                  }}
                  className="w-full py-2.5 text-sm text-rural-white/40 hover:text-rural-white/70 transition-colors"
                >
                  ← {t("back")}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
