"use server";

import fs from "fs";

const getLanguages = () => {
  return fs.readdirSync("src/tolgee/exported-i18n").map((value) => value.replace(".json", ""));
};

export default getLanguages;
