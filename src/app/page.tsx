import { ErrorToast } from "@/components/ErrorDisplay";
import getAllMetadata from "@/tools/getAllMetadata";
import { userServerTranslation } from "@/hooks/useTranslation";
import { NextPage } from "next";
import T from "$/T";

const Home: NextPage = async () => {
  const { seasons, errors } = await getAllMetadata();
  const [t] = await userServerTranslation();

  return (
    <>
      <ErrorToast title={t.home.videoLoadError} errors={errors} />
    </>
  );
};

export default Home;
