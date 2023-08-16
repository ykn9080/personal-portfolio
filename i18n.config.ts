export const i18n = {
  defaultLocale: "ko",
  locales: ["en", "ko"],
  localeDetection: true,
} as const;

export type Locale = (typeof i18n)["locales"][number];
