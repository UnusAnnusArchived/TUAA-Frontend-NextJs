import { Language } from "@/i18n/_i18n";

const fr: Language = {
  language: {
    name: "Français",
    code: "fr",
  },
  zodErrors: {
    invalidType: "Type invalide; attendu {expectedValue}, reçu {receivedValue}.",
    unrecognizedKeys: "Clés non reconnues: {keysList}.",
    invalidUnion: "Union invalide: {unionErrorsList}.",
    invalidEnumValue: "Valeur d'énumération invalide: {optionsList}.",
    invalidArguments: "Arguments invalides: {argumentsErrorList}.",
    invalidReturnType: "Type de retour invalide: {returnTypeErrors}.",
    invalidString: "Échec de la validation de chaîne avec le validateur {validatorType}.",
    tooSmall: "{type} trop petit; valeur minimale est {minimum}.",
    tooBig: "{type} trop grand; valeur maximale est {maximum}.",
    notMultipleOf: "Le nombre n'est pas un multiple de {multipleOf}.",
    invalidLiteral: "Constante invalide; attendu {expected}, reçu {received}.",
    invalidDate: "Date invalide.",
    invalidIntersectionTypes: "Types d'intersection invalides.",
    invalidUnionDiscriminator: "Discriminant d'union invalide.",
    notFinite: "Non fini",
    required: "Requis",
  },
  home: {
    videoLoadError: "Erreur lors du chargement des épisodes !",
  },
};

export default fr;
