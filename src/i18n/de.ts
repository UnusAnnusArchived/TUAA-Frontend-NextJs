import { Language } from "@/i18n/_i18n";

const de: Language = {
  language: {
    name: "Deutsch",
    code: "de",
  },
  zodErrors: {
    invalidType: "Ungültiger Typ; erwartet: {expectedValue}, erhalten: {receivedValue}.",
    unrecognizedKeys: "Nicht erkannte Schlüssel: {keysList}.",
    invalidUnion: "Ungültige Vereinigung: {unionErrorsList}.",
    invalidEnumValue: "Ungültiger Enumerationswert: {optionsList}.",
    invalidArguments: "Ungültige Argumente: {argumentsErrorList}.",
    invalidReturnType: "Ungültiger Rückgabetyp: {returnTypeErrors}.",
    invalidString: "Überprüfung des Typs {validatorType} für Zeichenfolgen fehlgeschlagen.",
    tooSmall: "{type} zu klein; Mindestwert beträgt {minimum}.",
    tooBig: "{type} zu groß; Maximalwert beträgt {maximum}.",
    notMultipleOf: "Die Zahl ist kein Vielfaches von {multipleOf}.",
    invalidLiteral: "Ungültige Konstante; erwartet: {expected}, erhalten: {received}.",
    invalidDate: "Ungültiges Datum.",
    invalidIntersectionTypes: "Ungültige Schnittstellen-Typen.",
    invalidUnionDiscriminator: "Ungültiger Vereinigungs-Diskriminator.",
    notFinite: "Nicht endlich.",
    required: "Erforderlich.",
  },
  header: {
    closeSearch: "",
    openSearch: "",
    search: "",
    enableLightMode: "",
    enableDarkMode: "",
  },
  home: {
    title: "",
    videoLoadError: "Fehler beim Laden der Episoden!",
  },
  downloads: {
    title: "",
  },
  settings: {
    title: "",
  },
  patreonDonors: {
    title: "",
  },
};

export default de;
