"use client";

import { useClientTranslation } from "@/hooks/useTranslation";
import { useRecoilState } from "recoil";

export const ClientLanguage = () => {
  const [t] = useClientTranslation(useRecoilState);

  return (
    <p>
      Client Language: {t.language.name} ({t.language.code})
    </p>
  );
};
