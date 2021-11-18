import i18next from "i18next";
import en from "./en";

import ***REMOVED*** initReactI18next ***REMOVED*** from "react-i18next";
import cs from "./cs";

export const initTranslations = async (locale: string) => ***REMOVED***
  await i18next.use(initReactI18next).init(***REMOVED***
    resources: ***REMOVED***
      en,
      cs,
  ***REMOVED***
    lng: locale,
    fallbackLng: "en",
    interpolation: ***REMOVED***
      escapeValue: true,
  ***REMOVED***
***REMOVED***);
***REMOVED***;
