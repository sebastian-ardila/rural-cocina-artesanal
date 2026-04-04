import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Sora, Space_Grotesk, Karantina } from "next/font/google";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import "../globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const sora = Sora({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-lato",
  display: "swap",
});

const karantina = Karantina({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-karantina",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${spaceGrotesk.variable} ${sora.variable} ${karantina.variable}`}
    >
      <head>
        <meta name="theme-color" content="#1a1a1a" />
      </head>
      <body className="bg-rural-black text-rural-white font-body antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header locale={locale} />
          <main>{children}</main>
          <Footer />
          <CartDrawer locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
