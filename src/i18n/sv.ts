import { Language } from "./_i18n";

const sv: Language = {
  language: {
    name: "Svenska",
    code: "sv",
  },
  zodErrors: {
    invalidType: "Ogiltig typ; förväntade {expectedValue}, fick {receivedValue}.",
    unrecognizedKeys: "Okända nycklar: {keysList}.",
    invalidUnion: "Ogiltig union: {unionErrorsList}.",
    invalidEnumValue: "Ogiltigt värde för enum: {optionsList}.",
    invalidArguments: "Ogiltiga argument: {argumentsErrorList}.",
    invalidReturnType: "Ogiltig returtyp: {returnTypeErrors}.",
    invalidString: "{validatorType}-validering misslyckades för strängen.",
    tooSmall: "{type} för liten; minimumvärdet är {minimum}.",
    tooBig: "{type} för stor; maxvärdet är {maximum}.",
    notMultipleOf: "Talet är inte ett multiplum av {multipleOf}.",
    invalidLiteral: "Ogiltig literal; förväntade {expected}, fick {received}.",
    invalidDate: "Ogiltigt datum.",
    invalidIntersectionTypes: "Ogiltiga snittyper.",
    invalidUnionDiscriminator: "Ogiltig union-diskriminator.",
    notFinite: "Inte ändlig",
    required: "Obligatoriskt",
  },
  home: {
    videoLoadError: "Fel vid laddning av avsnitt!",
  },
};

export default sv;
