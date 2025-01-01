"use server";

import fs from "fs";

const getLanguages = async () => {
  return fs.readdirSync("src/tolgee/exported-i18n").map((value) => value.replace(".json", ""));
};

export interface Language {
  name: string;
  code: string;
}

export const getLanguageInfo = async () => {
  const languages = await getLanguages();

  return languages.map((code) => {
    const language: { language: Language } = JSON.parse(
      fs.readFileSync(`src/tolgee/exported-i18n/${code}.json`, "utf-8")
    );

    return language.language;
  });
};

export default getLanguages;
