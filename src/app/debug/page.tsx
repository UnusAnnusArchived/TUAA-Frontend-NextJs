import { userServerTranslation } from "@/hooks/useTranslation";
import { NextPage } from "next";
import { ClientLanguage } from "./clientComponents";

const Debug: NextPage = async () => {
  const [t] = await userServerTranslation();

  return (
    <>
      <p>
        Sever language: {t.language.name} ({t.language.code})
      </p>
      <ClientLanguage />
    </>
  );
};

export default Debug;
