import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { ILanguage } from "../types";

//Import language definitions
import en from "./en";
import es from './es';
import de from "./de";
import cs from "./cs";

export const initTranslations = async (locale: string) => {
  await i18next.use(initReactI18next).init({
    resources: {
      en,
      es,
      de,
      cs
    },
    lng: locale,
    fallbackLng: "en",
    interpolation: {
      escapeValue: true,
    },
  });
};

export const availableLanguages: ILanguage[] = [
  {
    name: "English",
    code: "en",
  },
  {
    name: 'Español',
    code: 'es'
  },
  {
    name: "Deutsch",
    code: "de",
  },
  {
    name: "Čeština",
    code: "cs",
  }
];
