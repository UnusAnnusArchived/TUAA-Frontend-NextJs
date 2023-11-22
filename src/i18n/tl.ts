import { Language } from "./_i18n";

const tl: Language = {
  language: {
    name: "Tagalog",
    code: "tl",
  },
  zodErrors: {
    invalidType: "Hindi wastong uri; inaasahan {expectedValue}, natanggap {receivedValue}.",
    unrecognizedKeys: "Hindi kilalang mga key: {keysList}.",
    invalidUnion: "Hindi wastong pagkakaisa: {unionErrorsList}.",
    invalidEnumValue: "Hindi wastong halaga ng enum: {optionsList}.",
    invalidArguments: "Hindi wastong mga argumento: {argumentsErrorList}.",
    invalidReturnType: "Hindi wastong uri ng pagbalik: {returnTypeErrors}.",
    invalidString: "Nabigo ang string sa validator na {validatorType}.",
    tooSmall: "{type} masyadong maliit; minimum na halaga ay {minimum}.",
    tooBig: "{type} masyadong malaki; maximum na halaga ay {maximum}.",
    notMultipleOf: "Ang numero ay hindi karampatang karampatang multiple ng {multipleOf}.",
    invalidLiteral: "Hindi wastong literal; inaasahan {expected}, natanggap {received}.",
    invalidDate: "Hindi wastong petsa.",
    invalidIntersectionTypes: "Hindi wastong mga uri ng interseksiyon.",
    invalidUnionDiscriminator: "Hindi wastong discriminator ng pagkakaisa.",
    notFinite: "Hindi kataposan",
    required: "Kinakailangan",
  },
  home: {
    videoLoadError: "Error sa Pag-lo-load ng mga Episodyo!",
  },
};

export default tl
