import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "tr", "ar", "es", "de", "zh"],
  defaultLocale: "en",
  localePrefix: "always",
});
