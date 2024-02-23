"use server";

import fs from "fs";

const getLanguages = () => {
  return fs.readdirSync("src/tolgee/exported-i18n").map((value) => value.replace(".json", ""));
};

//Same function, different types; when `getLanguages` is called in a client component, it will return an async function even though the types don't call for that, so thats what this is for.
export const getLanguagesClient = async () => {
  return fs.readdirSync("src/tolgee/exported-i18n").map((value) => value.replace(".json", ""));
};

export default getLanguages;
