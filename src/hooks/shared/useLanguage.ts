import { useTranslation } from "react-i18next";

export type SupportedLang = "en" | "id";

export interface LanguageOption {
  code: SupportedLang;
  label: string;
  flag: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "id", label: "Indonesia", flag: "🇮🇩" },
];

export function useLanguage() {
  const { i18n } = useTranslation();

  // "en-US" → "en", handle kasus browser return locale lengkap
  const currentLang = (i18n.language?.split("-")[0] ?? "en") as SupportedLang;

  const currentOption =
    LANGUAGES.find((l) => l.code === currentLang) ?? LANGUAGES[0]!;

  const switchLanguage = (lang: SupportedLang) => {
    i18n.changeLanguage(lang);
    // i18next-browser-languagedetector otomatis simpan ke localStorage
  };

  return {
    currentLang,
    currentOption,
    languages: LANGUAGES,
    switchLanguage,
    isActive: (lang: SupportedLang) => currentLang === lang,
  };
}