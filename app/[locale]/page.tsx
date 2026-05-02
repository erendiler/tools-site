import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

const categoryKeys = ["design", "pdf", "developer", "text", "converters"] as const;

const categoryTools: Record<string, { slug: string; icon: string; color: string }[]> = {
  design: [
    { slug: "favicon", icon: "🖼️", color: "from-violet-500 to-purple-600" },
    { slug: "og-image", icon: "🎨", color: "from-pink-500 to-rose-600" },
    { slug: "css-gradient", icon: "🌈", color: "from-orange-500 to-amber-600" },
    { slug: "color-palette", icon: "🎭", color: "from-emerald-500 to-teal-600" },
    { slug: "box-shadow", icon: "🪄", color: "from-cyan-500 to-sky-600" },
    { slug: "image-compressor", icon: "🗜️", color: "from-lime-500 to-green-600" },
  ],
  pdf: [
    { slug: "image-to-pdf", icon: "📄", color: "from-red-500 to-orange-600" },
    { slug: "pdf-to-word", icon: "📕", color: "from-blue-600 to-indigo-700" },
    { slug: "pdf-to-excel", icon: "📗", color: "from-green-600 to-emerald-700" },
    { slug: "invoice", icon: "🧾", color: "from-yellow-500 to-orange-500" },
  ],
  developer: [
    { slug: "json-formatter", icon: "📋", color: "from-slate-600 to-slate-800" },
    { slug: "base64", icon: "🔤", color: "from-indigo-500 to-blue-600" },
    { slug: "jwt-decoder", icon: "🔑", color: "from-amber-500 to-yellow-600" },
    { slug: "regex-tester", icon: "🔍", color: "from-rose-500 to-pink-600" },
    { slug: "cron-builder", icon: "⏰", color: "from-teal-500 to-cyan-600" },
    { slug: "number-base", icon: "🔢", color: "from-violet-600 to-purple-700" },
    { slug: "timestamp", icon: "🕐", color: "from-blue-500 to-indigo-600" },
  ],
  text: [
    { slug: "word-counter", icon: "📝", color: "from-green-500 to-emerald-600" },
    { slug: "text-case", icon: "🔡", color: "from-orange-500 to-red-500" },
    { slug: "lorem-ipsum", icon: "📃", color: "from-slate-500 to-slate-700" },
    { slug: "markdown-preview", icon: "✍️", color: "from-sky-500 to-blue-600" },
  ],
  converters: [
    { slug: "qr-code", icon: "📱", color: "from-blue-500 to-indigo-600" },
    { slug: "unit-converter", icon: "📐", color: "from-teal-500 to-green-600" },
    { slug: "password-generator", icon: "🔐", color: "from-slate-600 to-slate-800" },
    { slug: "email-signature", icon: "✉️", color: "from-indigo-500 to-violet-600" },
    { slug: "vcard", icon: "👤", color: "from-pink-500 to-rose-600" },
  ],
};

const totalTools = Object.values(categoryTools).reduce((s, t) => s + t.length, 0);

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-3">{t("home.title")}</h1>
        <p className="text-lg text-slate-500 max-w-xl mx-auto">
          {t("home.subtitle", { count: totalTools })}
        </p>
      </div>

      {categoryKeys.map((catKey) => (
        <div key={catKey} className="mb-12">
          <h2 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-indigo-500 rounded-full inline-block" />
            {t(`categories.${catKey}`)}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryTools[catKey].map((tool) => (
              <Link key={tool.slug} href={`/tools/${tool.slug}`}
                className="group bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-lg hover:border-indigo-200 transition-all duration-200">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform`}>
                  {tool.icon}
                </div>
                <h3 className="text-base font-semibold text-slate-900 mb-1">{t(`tools.${tool.slug}.title`)}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{t(`tools.${tool.slug}.desc`)}</p>
              </Link>
            ))}
          </div>
        </div>
      ))}

      <div className="text-center bg-indigo-50 rounded-2xl p-8 border border-indigo-100">
        <p className="text-slate-600 text-sm">
          {t("home.suggestTool")}{" "}
          <a href="mailto:erendiler1@gmail.com" className="text-indigo-600 font-medium hover:underline">erendiler1@gmail.com</a>
        </p>
      </div>
    </div>
  );
}
