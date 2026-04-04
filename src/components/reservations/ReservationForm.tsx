"use client";

import { useState, useMemo, useRef } from "react";
import { useTranslations } from "next-intl";
import { Sun, Sunset, Moon, Calendar } from "lucide-react";
import { buildReservationMessage, openWhatsApp } from "@/lib/whatsapp";

const SCHEDULE: Record<number, { open: number; close: number } | null> = {
  0: { open: 15, close: 23 },
  1: { open: 15, close: 22 },
  2: { open: 15, close: 22 },
  3: { open: 15, close: 22 },
  4: { open: 15, close: 22 },
  5: { open: 15, close: 22 },
  6: { open: 15, close: 23 },
};

function getMinDate(): string {
  return new Date().toISOString().split("T")[0];
}

function getDayOfWeek(dateStr: string): number {
  return new Date(dateStr + "T12:00:00").getDay();
}

function isClosedDay(dateStr: string): boolean {
  if (!dateStr) return false;
  return SCHEDULE[getDayOfWeek(dateStr)] === null;
}

function getTimeSlots(dateStr: string): string[] {
  if (!dateStr) return [];
  const schedule = SCHEDULE[getDayOfWeek(dateStr)];
  if (!schedule) return [];
  const slots: string[] = [];
  for (let h = schedule.open; h < schedule.close; h++) {
    slots.push(`${h}:00`);
    slots.push(`${h}:30`);
  }
  return slots;
}

type Jornada = "morning" | "afternoon" | "evening";

function groupByJornada(slots: string[]): { key: Jornada; slots: string[] }[] {
  const groups: Record<Jornada, string[]> = {
    morning: [],
    afternoon: [],
    evening: [],
  };
  for (const slot of slots) {
    const hour = parseInt(slot.split(":")[0]);
    if (hour < 12) groups.morning.push(slot);
    else if (hour < 18) groups.afternoon.push(slot);
    else groups.evening.push(slot);
  }
  return (["morning", "afternoon", "evening"] as Jornada[])
    .filter((k) => groups[k].length > 0)
    .map((k) => ({ key: k, slots: groups[k] }));
}

const JORNADA_ICONS = { morning: Sun, afternoon: Sunset, evening: Moon };

function formatTimeSlot(slot: string): string {
  const [h, m] = slot.split(":");
  const hour = parseInt(h);
  const ampm = hour >= 12 ? "PM" : "AM";
  const h12 = hour > 12 ? hour - 12 : hour;
  return `${h12}:${m} ${ampm}`;
}

function formatDateDisplay(dateStr: string, locale: string): string {
  const date = new Date(dateStr + "T12:00:00");
  const formatted = date.toLocaleDateString(
    locale === "es" ? "es-CO" : "en-US",
    { weekday: "long", year: "numeric", month: "long", day: "numeric" }
  );
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

export function ReservationForm({ locale }: { locale: string }) {
  const t = useTranslations("reservations");
  const dateInputRef = useRef<HTMLInputElement>(null);
  const [tried, setTried] = useState(false);
  const [form, setForm] = useState({
    name: "",
    people: 2,
    date: "",
    time: "",
    comments: "",
  });

  const timeSlots = useMemo(() => getTimeSlots(form.date), [form.date]);
  const jornadaGroups = useMemo(() => groupByJornada(timeSlots), [timeSlots]);
  const closed = form.date ? isClosedDay(form.date) : false;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTried(true);
    if (!form.name || !form.date || closed || !form.time) return;
    const message = buildReservationMessage(
      { ...form, time: formatTimeSlot(form.time) },
      locale
    );
    openWhatsApp(message);
  };

  const update = (field: string, value: string | number) => {
    if (field === "date") {
      const newDate = value as string;
      if (newDate < getMinDate()) return;
      setForm((prev) => {
        const newSlots = getTimeSlots(newDate);
        const timeStillValid = newSlots.includes(prev.time);
        return { ...prev, date: newDate, time: timeStillValid ? prev.time : "" };
      });
    } else {
      setForm((prev) => ({ ...prev, [field]: value }));
    }
  };

  const openDatePicker = () => {
    dateInputRef.current?.showPicker?.();
    dateInputRef.current?.click();
  };

  const inputClass =
    "w-full px-4 py-3.5 bg-rural-white/[0.04] border border-rural-white/[0.08] rounded-xl text-rural-white text-base placeholder:text-rural-white/25 focus:outline-none focus:border-rural-gold/40 focus:ring-2 focus:ring-rural-gold/10 transition-all";

  const isValid = form.name && form.date && !closed && form.time;

  return (
    <form onSubmit={handleSubmit} noValidate className="max-w-lg mx-auto">
      <div className="space-y-6">
        {/* Name */}
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
          <div className="relative">
            <input
              ref={dateInputRef}
              type="date"
              min={getMinDate()}
              value={form.date}
              onChange={(e) => update("date", e.target.value)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div
              className={`${inputClass} flex items-center gap-3 pointer-events-none ${
                closed
                  ? "border-amber-500"
                  : tried && !form.date
                    ? "border-red-500"
                    : ""
              }`}
            >
              <Calendar className="w-5 h-5 text-rural-gold shrink-0" />
              <span
                className={
                  form.date ? "text-rural-white" : "text-rural-white/25"
                }
              >
                {form.date
                  ? formatDateDisplay(form.date, locale)
                  : t("selectDateBtn")}
              </span>
            </div>
          </div>
          {tried && !form.date && (
            <p className="text-red-400 text-xs mt-1.5">{t("dateRequired")}</p>
          )}
          {closed && (
            <p className="text-amber-400 text-xs mt-1.5">{t("closedDay")}</p>
          )}
        </div>

        {/* Time */}
        <div>
          <label className="block text-sm font-semibold text-rural-white/60 mb-2 uppercase tracking-wider">
            {t("time")}
          </label>
          {!form.date ? (
            <button
              type="button"
              onClick={openDatePicker}
              className="w-full bg-rural-white/[0.02] border border-dashed border-rural-white/[0.06] rounded-xl p-6 text-center opacity-50 cursor-pointer"
            >
              <p className="text-sm text-rural-white/25">{t("selectDate")}</p>
            </button>
          ) : closed ? (
            <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-6 text-center">
              <p className="text-sm text-amber-400">{t("closedDay")}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {jornadaGroups.map(({ key, slots }) => {
                const Icon = JORNADA_ICONS[key];
                return (
                  <div key={key}>
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-4 h-4 text-rural-gold/60" />
                      <span className="text-[11px] font-semibold text-rural-white/40 uppercase tracking-widest">
                        {t(key)}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {slots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => update("time", slot)}
                          className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                            form.time === slot
                              ? "border border-rural-gold bg-rural-gold/10 text-rural-gold shadow-sm"
                              : "bg-rural-white/[0.04] text-rural-white/50 hover:bg-rural-white/[0.08] hover:text-rural-white border border-rural-white/[0.06]"
                          }`}
                        >
                          {formatTimeSlot(slot)}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {tried && !closed && form.date && !form.time && (
            <p className="text-red-400 text-xs mt-1.5">{t("timeRequired")}</p>
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
