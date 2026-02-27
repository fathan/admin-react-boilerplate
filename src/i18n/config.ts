import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import enTranslations from "@/assets/locales/en/translations.json";
import idTranslations from "@/assets/locales/id/translations.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translations: enTranslations },
      id: { translations: idTranslations },
    },
    fallbackLng: "en",
    supportedLngs: ["en", "id"],
    defaultNS: "translations",
    ns: ["translations"],
    detection: {
      order: ["localStorage", "navigator"],
      lookupLocalStorage: "i18n_lang",
      caches: ["localStorage"],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;