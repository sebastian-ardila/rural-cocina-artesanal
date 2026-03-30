import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { ReservationForm } from "@/components/reservations/ReservationForm";
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
  const t = await getTranslations({ locale, namespace: "reservations" });
  return {
    title: `${t("title")} | Rural Cocina Artesanal`,
    description: t("subtitle"),
  };
}

export default async function ReservationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "reservations" });
  const basePath = getBasePath();

  return (
    <div className="py-20 sm:py-28">
      <div className="max-w-3xl mx-auto px-5 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-rural-gold/10 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-rural-gold">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
            </svg>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-rural-gold mb-4">
            {t("title")}
          </h1>
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-rural-gold/40" />
            <div className="w-2 h-2 rounded-full bg-rural-gold/60" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-rural-gold/40" />
          </div>
          <p className="text-rural-white/50 max-w-md mx-auto text-base">
            {t("subtitle")}
          </p>
        </div>

        {/* Info cards row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="bg-rural-white/[0.03] border border-rural-white/[0.06] rounded-2xl p-5 flex items-start gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-rural-gold shrink-0 mt-0.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <div>
              <p className="text-xs text-rural-white/30 uppercase tracking-wider font-medium mb-1">
                {locale === "es" ? "Horario" : "Hours"}
              </p>
              <p className="text-sm text-rural-white/60">{t("scheduleNote")}</p>
            </div>
          </div>
          <div className="bg-rural-white/[0.03] border border-rural-white/[0.06] rounded-2xl p-5 flex items-start gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-rural-gold shrink-0 mt-0.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
            <div>
              <p className="text-xs text-rural-white/30 uppercase tracking-wider font-medium mb-1">
                {locale === "es" ? "Ubicación" : "Location"}
              </p>
              <p className="text-sm text-rural-white/60">Poblado 2, Mz 31, Cs 15, Pereira</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-rural-white/[0.02] border border-rural-white/[0.05] rounded-3xl p-6 sm:p-10">
          <ReservationForm locale={locale} />
        </div>
      </div>
    </div>
  );
}
