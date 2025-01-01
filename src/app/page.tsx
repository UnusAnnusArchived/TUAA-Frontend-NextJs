import { ErrorToast } from "@/components/ErrorDisplay";
import getAllMetadata from "@/tools/getAllMetadata";
import { NextPage } from "next";
import SeasonSwitcher from "@/components/SeasonSwitcher";
import { getTranslate } from "@/tolgee/server";
import { IMetadata } from "@/zodTypes";
import { useSearchParams } from "next/navigation";

const Home: NextPage = async () => {
  const searchParams = useSearchParams();
  const { seasons, errors } = await getAllMetadata();
  const t = await getTranslate();

  // await new Promise((resolve) => setTimeout(resolve, 30000));

  const requestedSeason = parseInt(searchParams.get("season") ?? "1");

  let initialEpisodes: IMetadata[] = [];

  return (
    <>
      <SeasonSwitcher initialSeason={requestedSeason} seasons={seasons} />
      <ErrorToast title={t("home.videoLoadError")} errors={errors} />
    </>
  );
};

export default Home;
