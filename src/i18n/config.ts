import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

// Import JSON langsung karena file ada di src/assets (bukan public)
// i18next-http-backend tidak bisa dipakai untuk file dalam src/
import enTranslations from "@/assets/locales/en/translations.json";
import idTranslations from "@/assets/locales/id/translations.json";

i18n
  .use(LanguageDetector)  // deteksi bahasa dari browser/localStorage
  .use(initReactI18next)  // binding ke React
  .init({
    // Resources di-bundle langsung — tidak perlu HTTP request
    resources: {
      en: { translations: enTranslations },
      id: { translations: idTranslations },
    },

    // Bahasa fallback jika key tidak ditemukan
    fallbackLng: "en",

    // Bahasa yang didukung
    supportedLngs: ["en", "id"],

    // Namespace — sesuai nama file translations.json
    defaultNS: "translations",
    ns: ["translations"],

    // Konfigurasi language detector
    detection: {
      // Urutan prioritas deteksi bahasa
      order: ["localStorage", "navigator"],
      // Key yang disimpan di localStorage
      lookupLocalStorage: "i18n_lang",
      // Simpan pilihan ke localStorage
      caches: ["localStorage"],
    },

    interpolation: {
      // React sudah handle XSS, tidak perlu escape
      escapeValue: false,
    },
  });

export default i18n;