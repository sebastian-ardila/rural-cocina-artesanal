"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { buildContactMessage, openWhatsApp } from "@/lib/whatsapp";

export function ContactForm({ locale }: { locale: string }) {
  const t = useTranslations("contact");
  const [tried, setTried] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    interestType: "franchise",
    message: "",
  });

  const isValid = form.name && form.email && form.interestType && form.message;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTried(true);
    if (!isValid) return;
    const interestLabel = t(`interestOptions.${form.interestType}`);
    const message = buildContactMessage(
      { ...form, interestType: interestLabel },
      locale
    );
    openWhatsApp(message);
  };

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const inputClass =
    "w-full px-4 py-3.5 bg-rural-white/[0.04] border border-rural-white/[0.08] rounded-xl text-rural-white text-base placeholder:text-rural-white/25 focus:outline-none focus:border-rural-gold/40 focus:ring-2 focus:ring-rural-gold/10 transition-all";

  return (
    <form onSubmit={handleSubmit} noValidate className="max-w-lg mx-auto">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-rural-white/60 mb-2 uppercase tracking-wider">
            {t("name")}
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder={t("namePlaceholder")}
            className={`${inputClass} ${tried && !form.name ? "border-red-500" : ""}`}
          />
          {tried && !form.name && (
            <p className="text-red-400 text-xs mt-1.5">{t("nameRequired")}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-rural-white/60 mb-2 uppercase tracking-wider">
              {t("email")}
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder={t("emailPlaceholder")}
              className={`${inputClass} ${tried && !form.email ? "border-red-500" : ""}`}
            />
            {tried && !form.email && (
              <p className="text-red-400 text-xs mt-1.5">
                {t("emailRequired")}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-rural-white/60 mb-2 uppercase tracking-wider">
              {t("phone")}
            </label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              placeholder={t("phonePlaceholder")}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-rural-white/60 mb-2 uppercase tracking-wider">
            {t("interestType")}
          </label>
          <select
            value={form.interestType}
            onChange={(e) => update("interestType", e.target.value)}
            className={`${inputClass} appearance-none`}
          >
            {(
              [
                "franchise",
                "supplier",
                "collaboration",
                "events",
                "other",
              ] as const
            ).map((opt) => (
              <option key={opt} value={opt} className="bg-rural-black">
                {t(`interestOptions.${opt}`)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-rural-white/60 mb-2 uppercase tracking-wider">
            {t("message")}
          </label>
          <textarea
            rows={4}
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            placeholder={t("messagePlaceholder")}
            className={`${inputClass} resize-none ${tried && !form.message ? "border-red-500" : ""}`}
          />
          {tried && !form.message && (
            <p className="text-red-400 text-xs mt-1.5">
              {t("messageRequired")}
            </p>
          )}
        </div>
      </div>

      {/* Submit */}
      <div className="mt-8">
        <button
          type="submit"
          className={`w-full py-4 px-6 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-green-600/20 text-base ${
            !isValid ? "opacity-30 cursor-not-allowed shadow-none" : ""
          }`}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          {t("send")}
        </button>
        {tried && !isValid && (
          <p className="text-red-400 text-xs mt-2 text-center">
            {t("requiredFields")}
          </p>
        )}
      </div>
    </form>
  );
}
