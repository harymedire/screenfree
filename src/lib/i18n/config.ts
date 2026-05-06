// ScreenFree is a US-market brand. The BCS-region (Bosnia, Croatia, Serbia)
// counterpart lives in a separate repo as "BezEkrana" — it shares the PDF
// templates in /public/templates but has its own auth/dashboard/admin.
export const locales = ["en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const fullyTranslatedLocales: Locale[] = ["en"];

// Locales surfaced to end users in the UI locale switcher.
export const publicLocales: Locale[] = ["en"];

// US market prices in USD. BAM/EUR literals are kept in the type union because
// the DB CHECK constraint allows them, useful only if a non-USD locale is ever
// added to this app later.
export const currencyByLocale: Record<Locale, "BAM" | "EUR" | "USD"> = {
  en: "USD",
};

export const localeLabels: Record<Locale, string> = {
  en: "English",
};
