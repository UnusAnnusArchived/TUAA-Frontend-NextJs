import { ErrorToast } from "@/components/ErrorDisplay";
import getAllMetadata from "@/tools/getAllMetadata";
import { NextPage } from "next";
import SeasonSwitcher from "@/components/SeasonSwitcher";
import { getTranslate } from "@/tolgee/server";
import { IMetadata } from "@/zodTypes";

interface ISearchParams {
  season?: string;
}

const Home: NextPage<{ searchParams: ISearchParams }> = async ({ searchParams }) => {
  const { seasons, errors } = await getAllMetadata();
  const t = await getTranslate();

  // await new Promise((resolve) => setTimeout(resolve, 30000));

  const requestedSeason = parseInt(searchParams.season ?? "1");

  let initialEpisodes: IMetadata[] = [];

  return (
    <>
      <SeasonSwitcher initialSeason={requestedSeason} seasons={seasons} initialBunnyEpisodes={initialEpisodes} />
      <ErrorToast title={t("home.videoLoadError")} errors={errors} />
    </>
  );
};

export default Home;
