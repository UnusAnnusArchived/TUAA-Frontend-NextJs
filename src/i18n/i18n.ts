import i18next from "i18next";
import ***REMOVED*** initReactI18next ***REMOVED*** from "react-i18next";
import ***REMOVED*** ILanguage ***REMOVED*** from "../types";

//Import language definitions
import cs from "./cs";
import de from "./de";
import en from "./en";
import es from './es';

export const initTranslations = async (locale: string) => ***REMOVED***
  await i18next.use(initReactI18next).init(***REMOVED***
    resources: ***REMOVED***
      cs,
      de,
      en,
      es
  ***REMOVED***
    lng: locale,
    fallbackLng: "en",
    interpolation: ***REMOVED***
      escapeValue: true,
  ***REMOVED***
***REMOVED***);
***REMOVED***;

export const availableLanguages: ILanguage[] = [
  ***REMOVED***
    name: "Čeština",
    code: "cs",
***REMOVED***
  ***REMOVED***
    name: "Deutsch",
    code: "de",
***REMOVED***
  ***REMOVED***
    name: "English",
    code: "en",
***REMOVED***
  ***REMOVED***
    name: 'Español',
    code: 'es'
***REMOVED***
];
