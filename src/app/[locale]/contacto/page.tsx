import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { ContactForm } from "@/components/contact/ContactForm";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return {
    title: `${t("title")} | Rural Cocina Artesanal`,
    description: t("subtitle"),
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contact" });

  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-rural-gold mb-3">
            {t("title")}
          </h1>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 bg-rural-gold/30" />
            <div className="w-1.5 h-1.5 rounded-full bg-rural-gold" />
            <div className="h-px w-12 bg-rural-gold/30" />
          </div>
          <p className="text-rural-white/60 max-w-md mx-auto">
            {t("subtitle")}
          </p>
        </div>
        <ContactForm locale={locale} />
      </div>
    </div>
  );
}
