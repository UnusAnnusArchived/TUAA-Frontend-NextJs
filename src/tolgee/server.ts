import { cache } from "react";
import { cookies as useCookies } from "next/headers";

import { TolgeeBase, getStaticData } from "./shared";
import getLanguages from "./getLanguages";

// wrapping in `cache` function will ensure
// that we are sharing the instance within a single request
export const getTolgeeInstance = cache(async (locale: string) => {
  const allLocales = await getLanguages();

  const tolgee = TolgeeBase().init({
    // include all static data on the server, as the bundle size is not a concern here
    staticData: await getStaticData(allLocales),
    observerOptions: {
      // include full information about the key into the watermark
      // make sure you have newest SDK for this feature
      fullKeyEncode: true,
    },
    // locale is already detected by next-intl package
    language: locale,
    // providing custom fetch function, which will disable default caching
    fetch: async (input, init) => {
      return fetch(input, { ...init, next: { revalidate: 0 } });
    },
  });

  await tolgee.run();

  return tolgee;
});

export const getTolgee = async () => {
  const cookies = await useCookies();

  const lang = cookies.get("lang")?.value ?? "en";

  const tolgee = await getTolgeeInstance(lang);
  return tolgee;
};

export const getTranslate = async () => {
  const tolgee = await getTolgee();
  return tolgee.t;
};
