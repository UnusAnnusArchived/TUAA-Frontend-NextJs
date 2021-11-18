import i18next from "i18next";
import en from "./en";

import { initReactI18next } from "react-i18next";
import cs from "./cs";

export const initTranslations = async (locale: string) => {
  await i18next.use(initReactI18next).init({
    resources: {
      en,
      cs,
    },
    lng: locale,
    fallbackLng: "en",
    interpolation: {
      escapeValue: true,
    },
  });
};
