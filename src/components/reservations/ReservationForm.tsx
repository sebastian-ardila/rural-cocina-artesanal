"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { buildReservationMessage, openWhatsApp } from "@/lib/whatsapp";

function getMinDate(): string {
  const d = new Date();
  return d.toISOString().split("T")[0];
}

function getTimeSlots(dateStr: string): string[] {
  if (!dateStr) return [];
  const date = new Date(dateStr + "T12:00:00");
  const day = date.getDay();
  const isWeekend = day === 0 || day === 6;
  const endHour = isWeekend ? 23 : 22;

  const slots: string[] = [];
  for (let h = 15; h < endHour; h++) {
    slots.push(`${h}:00`);
    slots.push(`${h}:30`);
  }
  return slots;
}

function formatTimeSlot(slot: string): string {
  const [h, m] = slot.split(":");
  const hour = parseInt(h);
  const ampm = hour >= 12 ? "PM" : "AM";
  const h12 = hour > 12 ? hour - 12 : hour;
  return `${h12}:${m} ${ampm}`;
}

export function ReservationForm({ locale }: { locale: string }) {
  const t = useTranslations("reservations");
  const [form, setForm] = useState({
    name: "",
    people: 2,
    date: "",
    time: "",
    comments: "",
  });

  const timeSlots = useMemo(() => getTimeSlots(form.date), [form.date]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = buildReservationMessage(
      { ...form, time: form.time ? formatTimeSlot(form.time) : "" },
      locale
    );
    openWhatsApp(message);
  };

  const update = (field: string, value: string | number) => {
    if (field === "date") {
      setForm((prev) => ({ ...prev, date: value as string, time: "" }));
    } else {
      setForm((prev) => ({ ...prev, [field]: value }));
    }
  };

  const inputClass =
    "w-full px-4 py-3.5 bg-rural-white/[0.04] border border-rural-white/[0.08] rounded-xl text-rural-white text-base placeholder:text-rural-white/25 focus:outline-none focus:border-rural-gold/40 focus:ring-2 focus:ring-rural-gold/10 transition-all";

  const isValid = form.name && form.date && form.time;

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
      <div className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-semibold text-rural-white/60 mb-2 uppercase tracking-wider">
            {t("name")}
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder={t("namePlaceholder")}
            className={inputClass}
          />
        </div>

        {/* Number of people */}
        <div>
          <label className="block text-sm font-semibold text-rural-white/60 mb-3 uppercase tracking-wider">
            {t("people")}
          </label>
          <div className="bg-rural-white/[0.03] border border-rural-white/[0.06] rounded-2xl p-5 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={() => update("people", Math.max(1, form.people - 1))}
              className="w-12 h-12 rounded-full border-2 border-rural-gold/30 flex items-center justify-center text-rural-gold hover:bg-rural-gold/10 hover:border-rural-gold/50 transition-all text-xl font-bold"
            >
              -
            </button>
            <div className="text-center min-w-[5rem]">
              <span className="text-4xl font-bold text-rural-gold block">
                {form.people}
              </span>
              <span className="text-xs text-rural-white/35 mt-1 block uppercase tracking-wider">
                {form.people === 1 ? t("person") : t("persons")}
              </span>
            </div>
            <button
              type="button"
              onClick={() => update("people", Math.min(20, form.people + 1))}
              className="w-12 h-12 rounded-full border-2 border-rural-gold/30 flex items-center justify-center text-rural-gold hover:bg-rural-gold/10 hover:border-rural-gold/50 transition-all text-xl font-bold"
            >
              +
            </button>
          </div>
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-semibold text-rural-white/60 mb-2 uppercase tracking-wider">
            {t("date")}
          </label>
          <input
            type="date"
            required
            min={getMinDate()}
            value={form.date}
            onChange={(e) => update("date", e.target.value)}
            className={`${inputClass} [color-scheme:dark]`}
          />
        </div>

        {/* Time */}
        <div>
          <label className="block text-sm font-semibold text-rural-white/60 mb-2 uppercase tracking-wider">
            {t("time")}
          </label>
          {!form.date ? (
            <div className="bg-rural-white/[0.02] border border-dashed border-rural-white/[0.06] rounded-xl p-6 text-center">
              <p className="text-sm text-rural-white/25">{t("selectDate")}</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => update("time", slot)}
                  className={`px-3 py-3 rounded-xl text-sm font-medium transition-all ${
                    form.time === slot
                      ? "bg-rural-gold text-rural-black shadow-md shadow-rural-gold/20"
                      : "bg-rural-white/[0.04] text-rural-white/50 hover:bg-rural-white/[0.08] hover:text-rural-white border border-rural-white/[0.06]"
                  }`}
                >
                  {formatTimeSlot(slot)}
                </button>
              ))}
            </div>
          )}
          <p className="text-[11px] text-rural-white/20 mt-3 tracking-wide">
            {t("scheduleNote")}
          </p>
        </div>

        {/* Comments */}
        <div>
          <label className="block text-sm font-semibold text-rural-white/60 mb-2 uppercase tracking-wider">
            {t("comments")}
          </label>
          <textarea
            rows={3}
            value={form.comments}
            onChange={(e) => update("comments", e.target.value)}
            placeholder={t("commentsPlaceholder")}
            className={`${inputClass} resize-none`}
          />
        </div>
      </div>

      {/* Submit */}
      <div className="mt-8">
        <button
          type="submit"
          disabled={!isValid}
          className="w-full py-4 px-6 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-green-600/20 disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none text-base"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          {t("send")}
        </button>
      </div>
    </form>
  );
}
