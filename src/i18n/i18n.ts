import i18next from "i18next";
import { initReactI18next } from "react-i18next";

//Import language definitions
import en from "./en";
import de from "./de";
import cs from "./cs";
import { ILanguage } from "../types";

export const initTranslations = async (locale: string) => {
  await i18next.use(initReactI18next).init({
    resources: {
      en,
      de,
      cs,
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
    name: "Deutsch",
    code: "de",
  },
  {
    name: "Čeština",
    code: "cs",
  },
];
