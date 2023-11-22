import en from "./en";
import de from "./de";
import fr from "./fr";
import tl from "./tl";
import cs from "./cs";
import sv from "./sv";

export const languages = {
  [en.language.code]: en,
  [cs.language.code]: cs,
  [de.language.code]: de,
  [fr.language.code]: fr,
  [sv.language.code]: sv,
  [tl.language.code]: tl,
} as const;

export const fallbackLanguage: Languages = "en";

export type Language = typeof en;
export type Languages = keyof typeof languages;
