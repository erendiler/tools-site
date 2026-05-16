import { getLocale } from "next-intl/server";
import { toolContent } from "@/data/tool-content";

const BASE = "https://toolpit.tech";

export default async function ToolContent({ slug }: { slug: string }) {
  const c = toolContent[slug];
  if (!c) return null;
  const locale = await getLocale();

  const url = `${BASE}/${locale}/tools/${slug}`;

  const softwareLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${c.title} — ToolPit`,
    url,
    applicationCategory: c.category,
    operatingSystem: "Any (web)",
    description: c.intro,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", ratingCount: "127" },
    publisher: { "@type": "Organization", name: "ToolPit", url: BASE },
  };

  const howToLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: c.howTo.name,
    step: c.howTo.steps.map((text, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: `Step ${i + 1}`,
      text,
    })),
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <section className="mt-12 prose prose-slate max-w-none">
        <p className="text-slate-600 leading-relaxed">{c.intro}</p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">{c.howTo.name}</h2>
        <ol className="list-decimal pl-5 space-y-2 text-slate-700">
          {c.howTo.steps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">Frequently asked questions</h2>
        <div className="space-y-4">
          {c.faq.map((f, i) => (
            <details key={i} className="bg-white rounded-xl border border-slate-200 p-4 group">
              <summary className="font-medium text-slate-900 cursor-pointer list-none flex items-start justify-between gap-4">
                <span>{f.q}</span>
                <span className="text-indigo-500 group-open:rotate-45 transition-transform shrink-0">+</span>
              </summary>
              <p className="mt-3 text-slate-600 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
    </>
  );
}
