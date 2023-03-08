import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./i18n/en.json";
import ru from "./i18n/ru.json";
import de from "./i18n/de.json";
import ja from "./i18n/ja.json";
import uk from "./i18n/uk.json";
import vi from "./i18n/vi.json";
import be from "./i18n/be.json";

export const resources = {
  en: {
    translation: en,
  },
  ru: {
    translation: ru,
  },
  de: {
    translation: de,
  },
  ja: {
    translation: ja,
  },
  uk: {
    translation: uk,
  },
  vi: {
    translation: vi,
  },
  be: {
    translation: be,
  },
} as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    detection: {
      order: ["navigator"],
    },
    resources,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
