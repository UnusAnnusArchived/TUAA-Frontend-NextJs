import { Paper, Typography } from "@mui/material";
import { NextPage } from "next";
import "@vidstack/react/player/styles/default/theme.css";
import Player from "./_player";
import getEpisode from "@/tools/getEpisode";
import getBunnyEpisode from "@/tools/getBunnyEpisode";
import { IBunnySource, IMetadata } from "@/zodTypes";
import getBunnyEpisodeLinks from "@/tools/getBunnyEpisodeLink";

interface IParams {
  v: string;
}

const Watch: NextPage<{ params: IParams }> = async ({ params: { v: uaid } }) => {
  try {
    const metadata: IMetadata = JSON.parse(await getEpisode(uaid));
    const bunnySource = metadata.sources.find((source) => source.type === "bunny") as IBunnySource;
    const bunnyEpisode = await getBunnyEpisode(bunnySource.bunnyId);
    const bunnyLinks = getBunnyEpisodeLinks(bunnyEpisode);

    return (
      <>
        <div style={{ width: "100%" }}>
          <Player episode={metadata} bunnyEpisode={bunnyEpisode} bunnyLinks={bunnyLinks} />
          <Paper sx={{ padding: "1rem" }}>
            <Typography variant="h5" component="h2">
              {metadata.title}
            </Typography>
          </Paper>
        </div>
      </>
    );
  } catch (err: any) {
    console.error(err);
    return (
      <>
        <h1>There has been an error loading this episode!</h1>
        <p>Please create a GitHub issue with the following error</p>
        <code>
          <pre>{err}</pre>
        </code>
      </>
    );
  }
};

export default Watch;
