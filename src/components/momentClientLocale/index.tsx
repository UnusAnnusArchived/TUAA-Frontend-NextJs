"use client";

import { useTolgee } from "@tolgee/react";
import moment from "moment-with-locales-es6";
import { useEffect, useState, type JSX } from "react";
import T from "../T";

interface IProps {
  date: moment.MomentInput;
  type: "format" | "fromNow";
  format?: string;
  prepend?: JSX.Element | string;
  append?: JSX.Element | string;
}

export const useLanguage = () => {
  const tolgee = useTolgee(["language"]);

  return tolgee.getLanguage() ?? "en";
};

const MomentClientLocale: React.FC<IProps> = ({ date, type, format, prepend, append }) => {
  const language = useLanguage();
  const [value, setValue] = useState("");

  useEffect(() => {
    if (type === "format") {
      setValue(moment(date).locale(language).format(format));
    } else if (type === "fromNow") {
      setValue(moment(date).locale(language).fromNow());
    }
  }, [language]);

  return (
    <>
      {prepend ?? <></>}
      <T>{value}</T>
      {append ?? <></>}
    </>
  );
};

export default MomentClientLocale;
