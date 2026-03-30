import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { HeroSection } from "@/components/home/HeroSection";
import { MenuSection } from "@/components/home/MenuSection";
import { RestaurantJsonLd } from "@/components/seo/JsonLd";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isEs = locale === "es";

  return {
    title: isEs
      ? "Rural Cocina Artesanal | Hamburguesas y Arepaburgers Artesanales en Pereira"
      : "Rural Cocina Artesanal | Artisan Burgers & Arepaburgers in Pereira",
    description: isEs
      ? "Cocina artesanal colombiana con raíces en Salento, ahora en Pereira. Arepaburgers, hamburguesas artesanales, papas con topping y más. Domicilios a todo Pereira."
      : "Colombian artisan cuisine with roots in Salento, now in Pereira. Arepaburgers, artisan burgers, loaded fries and more. Delivery across Pereira.",
    openGraph: {
      title: "Rural Cocina Artesanal",
      description: isEs
        ? "Sabores artesanales con alma de campo"
        : "Artisan flavors with a countryside soul",
      type: "website",
      locale: isEs ? "es_CO" : "en_US",
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <RestaurantJsonLd locale={locale} />
      <HeroSection locale={locale} />
      <MenuSection locale={locale} />
    </>
  );
}
