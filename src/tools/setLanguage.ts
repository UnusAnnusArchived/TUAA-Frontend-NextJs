"use client";

import tolgee from "@/tolgee";
import { setCookie } from "cookies-next";

const setLanguage = (lang: string) => {
  tolgee.changeLanguage(lang);
  setCookie("lang", lang, { expires: new Date(Date.now() + 3.156e11), path: "/" });
};

export default setLanguage;
