import { Divider, Paper, Typography } from "@mui/material";
import { NextPage } from "next";
import "@vidstack/react/player/styles/default/theme.css";
import Player from "./_player";
import getEpisode from "@/tools/getEpisode";
import { IMetadata } from "@/zodTypes";
import getEpisodeLinks from "@/tools/getEpisodeLinks";
import Comments from "./_comments";
import Description from "./description";
import MomentClientLocale from "@/components/momentClientLocale";

interface IParams {
  v: string;
}

interface IProps {
  params: Promise<IParams>;
}

const Watch: NextPage<IProps> = async ({ params }) => {
  const { v: uaid } = await params;

  try {
    const metadata: IMetadata = JSON.parse(await getEpisode(uaid));
    const episodeLinks = getEpisodeLinks(uaid);

    return (
      <div style={{ width: "100%" }}>
        <Player episode={metadata} episodeLinks={episodeLinks} />
        <Paper sx={{ padding: "1rem", marginTop: "1rem" }}>
          <Typography variant="h5" component="h2">
            {metadata.title}
          </Typography>
          <Typography>
            <MomentClientLocale date={metadata.releaseDate} type="format" format="DD MMMM YYYY" />
          </Typography>
          <Description description={metadata.description} />
        </Paper>
        <Comments video={metadata} />
      </div>
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
