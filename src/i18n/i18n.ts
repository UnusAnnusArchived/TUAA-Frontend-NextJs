import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { ILanguage } from "../types";

//Import language definitions
import cs from "./cs";
import de from "./de";
import en from "./en";
import es from './es';

export const initTranslations = async (locale: string) => {
  await i18next.use(initReactI18next).init({
    resources: {
      cs,
      de,
      en,
      es
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
    name: "Čeština",
    code: "cs",
  },
  {
    name: "Deutsch",
    code: "de",
  },
  {
    name: "English",
    code: "en",
  },
  {
    name: 'Español',
    code: 'es'
  }
];
