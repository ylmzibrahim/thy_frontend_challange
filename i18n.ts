import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./public/locales/en-US/common.json";
import trTranslation from "./public/locales/tr-TR/common.json";

// Initialize i18next
i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslation,
    },
    tr: {
      translation: trTranslation,
    },
  },
  lng: "en", // Set default language here
  fallbackLng: "en", // Fallback language in case translation isn't found
  interpolation: {
    escapeValue: false, // React already does escaping
  },
});

export default i18n;
