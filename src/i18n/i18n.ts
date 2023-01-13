import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { ILanguage } from "../types";

//Import language definitions
import en from "./en";
import fr from "./fr";
import de from "./de";
import fil from "./fil";
import sv from "./sv";
import cs from "./cs";

export const initTranslations = async (locale: string) => {
  await i18next.use(initReactI18next).init({
    resources: {
      en,
      fr,
      de,
      fil,
      sv,
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
  en.language,
  fr.language,
  de.language,
  fil.language,
  sv.language,
  cs.language,
];
