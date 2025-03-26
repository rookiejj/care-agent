import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translations directly
import translationKO from "./locales/ko";
import translationEN from "./locales/en";
import translationMN from "./locales/mn";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ko: {
        translation: translationKO,
      },
      en: {
        translation: translationEN,
      },
      mn: {
        translation: translationMN,
      },
    },
    lng: "ko",
    fallbackLng: "en",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
