import { currentLanguageAtom } from "@/atoms";
import { Language, Languages, fallbackLanguage, languages } from "@/i18n/_i18n";
import { RecoilState, SetterOrUpdater } from "recoil";

export const userServerTranslation = async () => {
  const cookies = (await import("next/headers")).cookies();

  const langCookie = cookies.get("lang");

  if (langCookie) {
    const lang = JSON.parse(langCookie.value) as Languages;

    return [languages[lang]];
  } else {
    return [languages[fallbackLanguage]];
  }
};

export const useClientTranslation: (
  useRecoilState: <T>(atom: RecoilState<T>) => [T, SetterOrUpdater<T>]
) => [Language, SetterOrUpdater<Languages>] = (useRecoilState) => {
  const [lang, setLang] = useRecoilState(currentLanguageAtom);

  const translations = languages[lang];

  if (translations) {
    return [translations, setLang];
  } else {
    return [languages[fallbackLanguage], setLang];
  }
};
