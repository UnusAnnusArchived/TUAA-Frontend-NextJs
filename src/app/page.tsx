import { ErrorToast } from "@/components/ErrorDisplay";
import getAllMetadata from "@/tools/getAllMetadata";
import { NextPage } from "next";
import SeasonSwitcher from "@/components/SeasonSwitcher";
import { getTranslate } from "@/tolgee/server";
import { IMetadata } from "@/zodTypes";
import { ReadonlyURLSearchParams } from "next/navigation";

interface IProps {
  params: Promise<Record<string, string | undefined>>;
}

const Home: NextPage<IProps> = async ({ params }) => {
  const { season } = await params;
  const { seasons, errors } = await getAllMetadata();
  const t = await getTranslate();

  // await new Promise((resolve) => setTimeout(resolve, 30000));

  const requestedSeason = parseInt(season ?? "1");

  let initialEpisodes: IMetadata[] = [];

  return (
    <>
      <SeasonSwitcher initialSeason={requestedSeason} seasons={seasons} />
      <ErrorToast title={t("home.videoLoadError")} errors={errors} />
    </>
  );
};

export default Home;
