import type { MetadataRoute } from "next";

const BASE = "https://toolpit.tech";
const locales = ["en", "tr", "ar", "es", "de", "zh"];
const tools = [
  "favicon", "og-image", "css-gradient", "color-palette", "box-shadow",
  "image-compressor", "image-to-pdf", "pdf-to-word", "pdf-to-excel", "invoice",
  "json-formatter", "base64", "jwt-decoder", "regex-tester", "cron-builder",
  "number-base", "timestamp", "word-counter", "text-case", "lorem-ipsum",
  "markdown-preview", "qr-code", "unit-converter", "password-generator",
  "email-signature", "vcard",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    entries.push({ url: `${BASE}/${locale}`, changeFrequency: "weekly", priority: 1.0 });
    entries.push({ url: `${BASE}/${locale}/privacy`, changeFrequency: "monthly", priority: 0.3 });
    for (const tool of tools) {
      entries.push({ url: `${BASE}/${locale}/tools/${tool}`, changeFrequency: "monthly", priority: 0.8 });
    }
  }

  return entries;
}
