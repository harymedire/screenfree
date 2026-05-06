import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales, defaultLocale, fullyTranslatedLocales, type Locale } from "./config";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = (await requestLocale) as Locale | undefined;

  if (!locale || !locales.includes(locale)) {
    locale = defaultLocale;
  }

  const messageLocale: Locale = fullyTranslatedLocales.includes(locale) ? locale : "en";

  let messages;
  try {
    messages = (await import(`../../messages/${messageLocale}.json`)).default;
  } catch {
    notFound();
  }

  return { locale, messages };
});
