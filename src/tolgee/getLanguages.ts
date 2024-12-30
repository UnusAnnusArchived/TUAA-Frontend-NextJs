"use server";

import fs from "fs";

const getLanguages = () => {
  return fs.readdirSync("src/tolgee/exported-i18n").map((value) => value.replace(".json", ""));
};

export interface Language {
  name: string;
  code: string;
}

export const getLanguageInfo = () => {
  const languages = getLanguages();

  return languages.map((code) => {
    const language: { language: Language } = JSON.parse(
      fs.readFileSync(`src/tolgee/exported-i18n/${code}.json`, "utf-8")
    );

    return language.language;
  });
};

//Same function, different types; when `getLanguages` is called in a client component, it will return an async function even though the types don't call for that, so thats what this is for.
export const getLanguagesClient = async () => {
  return getLanguages();
};

export const getLanguageInfoClient = async () => {
  return getLanguageInfo();
};

export default getLanguages;
