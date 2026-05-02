"use client";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

const flags: Record<string, string> = {
  en: "🇬🇧", tr: "🇹🇷", ar: "🇸🇦", es: "🇪🇸", de: "🇩🇪", zh: "🇨🇳",
};

export default function LanguageSwitcher({
  currentLocale,
  localeNames,
}: {
  currentLocale: string;
  localeNames: Record<string, string>;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    function close(e: MouseEvent) { if (!ref.current?.contains(e.target as Node)) setOpen(false); }
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  function switchLocale(locale: string) {
    const segments = pathname.split("/");
    segments[1] = locale;
    router.push(segments.join("/"));
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-indigo-300 bg-white text-sm font-medium transition-colors">
        <span>{flags[currentLocale]}</span>
        <span className="text-slate-700">{localeNames[currentLocale]}</span>
        <span className="text-slate-400 text-xs">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden z-50 min-w-[140px]">
          {Object.entries(localeNames).map(([locale, name]) => (
            <button key={locale} onClick={() => switchLocale(locale)}
              className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-slate-50 transition-colors ${
                locale === currentLocale ? "bg-indigo-50 text-indigo-600 font-medium" : "text-slate-700"
              }`}>
              <span>{flags[locale]}</span>
              <span>{name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
