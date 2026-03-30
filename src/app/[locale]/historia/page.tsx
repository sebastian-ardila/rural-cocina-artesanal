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
  const t = await getTranslations({ locale, namespace: "history" });
  return {
    title: `${t("title")} | Rural Cocina Artesanal`,
    description: t("text"),
  };
}

export default async function HistoriaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "history" });
  const basePath = getBasePath();

  return (
    <div className="relative">
      {/* Hero banner */}
      <div className="relative h-[40vh] sm:h-[50vh] overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={`${basePath}/videos/video3.webm`} type="video/webm" />
          <source src={`${basePath}/videos/video3.mp4`} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-rural-black/60 via-rural-black/50 to-rural-black" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white text-center">
            {t("title")}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-5 sm:px-6 py-16 sm:py-24">
        {/* Origin */}
        <div className="flex flex-col sm:flex-row gap-8 items-start mb-16">
          <div className="shrink-0">
            <img
              src={`${basePath}/images/rural-logo.png`}
              alt="Rural Cocina Artesanal"
              width={100}
              height={100}
              className="rounded-full border-2 border-rural-gold/20 mx-auto sm:mx-0"
            />
          </div>
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-rural-gold mb-4">
              {t("originTitle")}
            </h2>
            <p className="text-rural-white/60 leading-relaxed text-base sm:text-lg">
              {t("originText")}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-16">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-rural-gold/20" />
          <div className="w-2 h-2 rounded-full bg-rural-gold/40" />
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-rural-gold/20" />
        </div>

        {/* Philosophy */}
        <div className="mb-16">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-rural-gold mb-4">
            {t("philosophyTitle")}
          </h2>
          <p className="text-rural-white/60 leading-relaxed text-base sm:text-lg">
            {t("philosophyText")}
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-16">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-rural-gold/20" />
          <div className="w-2 h-2 rounded-full bg-rural-gold/40" />
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-rural-gold/20" />
        </div>

        {/* Today */}
        <div className="mb-16">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-rural-gold mb-4">
            {t("todayTitle")}
          </h2>
          <p className="text-rural-white/60 leading-relaxed text-base sm:text-lg">
            {t("todayText")}
          </p>
        </div>

        {/* CTA */}
        <div className="text-center bg-rural-white/[0.03] border border-rural-white/[0.06] rounded-2xl p-8 sm:p-10">
          <p className="text-rural-white/50 text-base mb-5">
            {t("ctaText")}
          </p>
          <a
            href={`${basePath}/${locale}/#carta`}
            className="inline-flex items-center gap-3 px-8 py-3.5 bg-rural-gold hover:bg-rural-gold-light text-rural-black font-bold rounded-full transition-all text-base"
          >
            {t("ctaButton")}
          </a>
        </div>
      </div>
    </div>
  );
}
