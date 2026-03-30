import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getBasePath } from "@/lib/utils";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "schedulePage" });
  return {
    title: `${t("title")} | Rural Cocina Artesanal`,
    description: t("subtitle"),
  };
}

const CLOCK_ICON = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6 text-rural-gold"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  </svg>
);

const MAP_ICON = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6 text-rural-gold"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
    />
  </svg>
);

const TRUCK_ICON = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6 text-rural-gold"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0H21m-3-4.5V10.5a3 3 0 0 0-3-3h-1.5M3 15.75V7.5a2.25 2.25 0 0 1 2.25-2.25h7.5M12 5.25v3.75"
    />
  </svg>
);

export default async function HorariosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "schedulePage" });
  const basePath = getBasePath();

  const scheduleItems = [
    {
      label: t("weekdaysLabel"),
      hours: t("weekdaysHours"),
      days: locale === "es" ? "L M M J V" : "M T W T F",
    },
    {
      label: t("weekendsLabel"),
      hours: t("weekendsHours"),
      days: locale === "es" ? "S D" : "S S",
    },
    {
      label: t("holidaysLabel"),
      hours: t("holidaysHours"),
      days: "",
      isHoliday: true,
    },
  ];

  return (
    <div className="py-20 sm:py-28">
      <div className="max-w-3xl mx-auto px-5 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-rural-gold mb-4">
            {t("title")}
          </h1>
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-rural-gold/40" />
            <div className="w-2 h-2 rounded-full bg-rural-gold/60" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-rural-gold/40" />
          </div>
          <p className="text-rural-white/50 text-base">
            {t("subtitle")}
          </p>
        </div>

        {/* Schedule cards */}
        <div className="space-y-4 mb-14">
          {scheduleItems.map((item, i) => (
            <div
              key={i}
              className="bg-rural-white/[0.03] border border-rural-white/[0.06] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8"
            >
              <div className="flex items-center gap-3 sm:min-w-[200px]">
                {CLOCK_ICON}
                <div>
                  <p className="font-display text-lg font-bold text-rural-white">
                    {item.label}
                  </p>
                  {item.days && (
                    <p className="text-xs text-rural-white/25 tracking-[0.3em] uppercase mt-0.5">
                      {item.days}
                    </p>
                  )}
                  {item.isHoliday && (
                    <p className="text-[11px] text-rural-gold/50 mt-0.5">
                      {locale === "es" ? "Horario especial" : "Special hours"}
                    </p>
                  )}
                </div>
              </div>
              <div className="sm:ml-auto">
                <span className="text-2xl sm:text-3xl font-bold text-rural-gold tracking-tight">
                  {item.hours}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Location */}
        <div className="bg-rural-white/[0.03] border border-rural-white/[0.06] rounded-2xl p-6 sm:p-8 mb-4">
          <div className="flex items-start gap-3">
            {MAP_ICON}
            <div>
              <p className="font-display text-lg font-bold text-rural-white mb-1">
                {locale === "es" ? "Ubicación" : "Location"}
              </p>
              <p className="text-rural-white/50 text-sm leading-relaxed">
                {t("address")}
              </p>
            </div>
          </div>
        </div>

        {/* Delivery */}
        <div className="bg-rural-white/[0.03] border border-rural-white/[0.06] rounded-2xl p-6 sm:p-8 mb-14">
          <div className="flex items-start gap-3">
            {TRUCK_ICON}
            <div>
              <p className="font-display text-lg font-bold text-rural-gold mb-1">
                {t("delivery")}
              </p>
              <p className="text-rural-white/40 text-sm">
                {t("deliveryNote")}
              </p>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href={`${basePath}/${locale}/reservas/`}
            className="flex-1 py-4 px-6 bg-rural-gold hover:bg-rural-gold-light text-rural-black font-bold rounded-xl transition-all text-center text-base"
          >
            {t("ctaReserve")}
          </a>
          <a
            href="https://wa.me/573115719922"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-4 px-6 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-all text-center text-base flex items-center justify-center gap-2.5"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {t("ctaWhatsApp")}
          </a>
        </div>
      </div>
    </div>
  );
}
