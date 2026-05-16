import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import "../globals.css";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  const title = `ToolPit — ${t("title")}`;
  const description = t("subtitle", { count: 26 });
  return {
    metadataBase: new URL("https://toolpit.tech"),
    title: { default: title, template: `%s — ToolPit` },
    description,
    applicationName: "ToolPit",
    keywords: [
      "free online tools", "developer tools", "designer tools",
      "json formatter", "favicon generator", "qr code", "pdf tools",
      "regex tester", "password generator", "image compressor",
    ],
    verification: { google: "9ue66Ef0rPE5ieB_aBSdvM-qxMFWxaTPYKzbstTEgP4" },
    other: { "google-adsense-account": "ca-pub-9682866993240569" },
    alternates: {
      canonical: `https://toolpit.tech/${locale}`,
      languages: {
        en: "https://toolpit.tech/en",
        tr: "https://toolpit.tech/tr",
        ar: "https://toolpit.tech/ar",
        es: "https://toolpit.tech/es",
        de: "https://toolpit.tech/de",
        zh: "https://toolpit.tech/zh",
      },
    },
    openGraph: {
      type: "website",
      url: `https://toolpit.tech/${locale}`,
      siteName: "ToolPit",
      title,
      description,
      locale,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const localeNames: Record<string, string> = {
  en: "English", tr: "Türkçe", ar: "العربية", es: "Español", de: "Deutsch", zh: "中文",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "en" | "tr" | "ar" | "es" | "de" | "zh")) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "nav" });
  const tf = await getTranslations({ locale, namespace: "footer" });
  const isRTL = locale === "ar";

  return (
    <html lang={locale} dir={isRTL ? "rtl" : "ltr"} className="h-full">
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        <NextIntlClientProvider messages={messages}>
          <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
              <a href={`/${locale}`} className="flex items-center gap-2 font-bold text-lg text-indigo-600">
                <span className="text-2xl">⚡</span>ToolPit
              </a>
              <nav className="flex items-center gap-4 text-sm text-slate-600">
                <a href={`/${locale}`} className="hover:text-indigo-600 transition-colors">{t("allTools")}</a>
                <a href={`mailto:erendiler1@gmail.com`} className="hover:text-indigo-600 transition-colors">{t("contact")}</a>
                <LanguageSwitcher currentLocale={locale} localeNames={localeNames} />
              </nav>
            </div>
          </header>

          <main className="flex-1">{children}</main>

          <footer className="bg-white border-t border-slate-200 py-6 mt-12">
            <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-slate-500">
              <span>© 2025 ToolPit · {tf("tagline")}</span>
              <div className="flex items-center gap-4">
                <a href={`/${locale}/privacy`} className="hover:text-indigo-600 transition-colors">{tf("privacy")}</a>
                <span>{tf("builtBy")} <a href="https://erendiler.com" className="text-indigo-600 hover:underline">Eren Diler</a></span>
              </div>
            </div>
          </footer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
