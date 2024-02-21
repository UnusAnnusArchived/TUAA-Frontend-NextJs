"use client";

import { TolgeeBase, getStaticData } from "./shared";
import { TolgeeProvider, useTolgeeSSR } from "@tolgee/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {
  locales: any;
  locale: string;
  children: React.ReactNode;
};

export const tolgee = TolgeeBase().init();

export const TolgeeNextProvider = ({ locale, locales, children }: Props) => {
  // This synchronizes Tolgee for the server and client's initial render,
  // ensuring proper initialization with language and cache  const tolgeeSSR = useTolgeeSSR(tolgee, locale, locales);
  const tolgeeSSR = useTolgeeSSR(tolgee, locale, locales);
  const router = useRouter();

  useEffect(() => {
    const { unsubscribe } = tolgeeSSR.on("permanentChange", () => {
      // This ensures that server components refresh after
      // translation modifications using in-context
      router.refresh();
    });

    return () => unsubscribe();
  }, [tolgeeSSR, router]);

  return (
    <TolgeeProvider tolgee={tolgeeSSR} options={{ useSuspense: false }}>
      {children}
    </TolgeeProvider>
  );
};
