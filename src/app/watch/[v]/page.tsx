import { Divider, Paper, Typography } from "@mui/material";
import { NextPage } from "next";
import "@vidstack/react/player/styles/default/theme.css";
import Player from "./_player";
import getEpisode from "@/tools/getEpisode";
import { IYouTubeSource, IMetadata } from "@/zodTypes";
import getEpisodeLinks from "@/tools/getEpisodeLinks";
import moment from "moment-with-locales-es6";
import { getTolgee } from "@/tolgee/server";

interface IParams {
  v: string;
}

const Watch: NextPage<{ params: IParams }> = async ({ params: { v: uaid } }) => {
  const tolgee = await getTolgee();
  const language = tolgee.getLanguage() ?? "en";

  try {
    const metadata: IMetadata = JSON.parse(await getEpisode(uaid));
    const episodeLinks = getEpisodeLinks(uaid);

    return (
      <>
        <div style={{ width: "100%" }}>
          <Player episode={metadata} episodeLinks={episodeLinks} />
          <Paper sx={{ padding: "1rem", marginTop: "1rem" }}>
            <Typography variant="h5" component="h2">
              {metadata.title}
            </Typography>
            <Typography>{moment(metadata.releaseDate).locale(language).format("DD MMMM YYYY")}</Typography>
            <Divider sx={{ margin: ".5rem 0" }} />
            <div dangerouslySetInnerHTML={{ __html: metadata.description }} />
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
