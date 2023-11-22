import { Language } from "./_i18n";

const cs: Language = {
  language: {
    name: "Čeština",
    code: "cs",
  },
  zodErrors: {
    invalidType: "Neplatný typ; očekáváno {expectedValue}, obdrženo {receivedValue}.",
    unrecognizedKeys: "Nerozpoznané klíče: {keysList}.",
    invalidUnion: "Neplatný spolek: {unionErrorsList}.",
    invalidEnumValue: "Neplatná hodnota výčtu: {optionsList}.",
    invalidArguments: "Neplatné argumenty: {argumentsErrorList}.",
    invalidReturnType: "Neplatný návratový typ: {returnTypeErrors}.",
    invalidString: "Řetězec neprošel kontrolou {validatorType}.",
    tooSmall: "{type} je příliš malý; minimální hodnota je {minimum}.",
    tooBig: "{type} je příliš velký; maximální hodnota je {maximum}.",
    notMultipleOf: "Číslo není násobkem {multipleOf}.",
    invalidLiteral: "Neplatný literál; očekáváno {expected}, obdrženo {received}.",
    invalidDate: "Neplatné datum.",
    invalidIntersectionTypes: "Neplatné typy průniku.",
    invalidUnionDiscriminator: "Neplatný diskriminátor spolku.",
    notFinite: "Není konečné",
    required: "Povinné",
  },
  home: {
    videoLoadError: "Chyba při načítání epizod!",
  },
};

export default cs
