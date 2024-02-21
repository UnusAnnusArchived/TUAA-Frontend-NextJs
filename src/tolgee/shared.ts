import { DevTools, Tolgee, FormatSimple } from "@tolgee/web";
import getLanguages from "./getLanguages";
import config from "@/config.json";
import endpoints from "@/endpoints.json"
import isDev from "./isDev";

export const ALL_LOCALES = getLanguages();

export const DEFAULT_LOCALE = "en";

export async function getStaticData(languages: string[]) {
  const result: Record<string, any> = {};
  for (const lang of languages) {
    try {
      result[lang] = (await import(`./exported-i18n/${lang}.json`)).default;
    } catch {
      if (!languages.includes(DEFAULT_LOCALE) && !result[DEFAULT_LOCALE]) {
        result[DEFAULT_LOCALE] = (await import(`./exported-i18n/${DEFAULT_LOCALE}.json`)).default;
      }
    }
  }
  return result;
}

export function TolgeeBase() {
  return (
    Tolgee()
      .use(FormatSimple())
      .use(DevTools())
      // Preset shared settings
      .updateDefaults({
        apiKey: isDev() ? config.tolgee.devApiKey : config.tolgee.prodApiKey,
        apiUrl: endpoints.tolgee,
      })
  );
}
