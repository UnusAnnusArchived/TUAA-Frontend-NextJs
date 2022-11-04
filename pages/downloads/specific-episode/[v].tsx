import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import moment from "moment";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import fs from "fs";
import config from "../../../src/config.json";
import { useTranslation } from "react-i18next";
import { EpisodesRow } from "../../../components/episodes-controls";
import { Layout } from "../../../components/layout";
import { MetaHead } from "../../../components/meta-head";
import { IVideo } from "../../../src/types";
import VideoDownloadOptions from "../../../components/video-download-options";
import { t } from "i18next";

interface IProps {
  watchCode: string;
  video: IVideo;
}

const Download: React.FC<IProps> = ({ watchCode, video }) => {
  const { i18n } = useTranslation();

  const published = new Date(video.date ?? video.releasedate);

  return (
    <Layout>
      <MetaHead baseTitle={t("pages:download_episode").replace("{name}", video.title)} />
      <Paper className="my-3 p-3 desc">
        <Typography variant="h6" component="h1">
          {video.title}
        </Typography>
        <Typography variant="body2" component="p">
          {moment(published).locale(i18n.language).format("DD MMMM YYYY")}
        </Typography>
        <Divider className="my-2" sx={{ backgroundColor: "#fff" }} />
        <Typography variant="body1" component="p">
          <div
            dangerouslySetInnerHTML={{
              __html: video.description.replace(/(\n)/g, "<br />"),
            }}
          />
        </Typography>
      </Paper>
      <EpisodesRow watchCode={watchCode} onDownloadPage={true} />
      <Paper className="my-3 p-3">
        <VideoDownloadOptions video={video} />
      </Paper>
    </Layout>
  );
};

export default Download;

export const getStaticProps: GetStaticProps<IProps> = async (context) => {
  const watchCode = context.params.v.toString();
  const split = watchCode.split(".");
  const season = split[0].replace("s", "");
  const episode = split[1].replace("e", "");

  const path = `${config.metadataPath}/${season}/${episode}.json`;

  if (fs.existsSync(path)) {
    const video: IVideo = JSON.parse(fs.readFileSync(path, "utf-8"));
    return {
      props: {
        watchCode,
        video,
      },
      revalidate: 60 * 60 * 24, //1 day
    };
  } else {
    return { props: { video: null }, notFound: true };
  }
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  const paths = [];

  const seasons = fs.readdirSync(config.metadataPath);
  for (const seasonName of seasons) {
    const season = fs.readdirSync(`${config.metadataPath}/${seasonName}`);
    for (const episodeName of season) {
      const episode: IVideo = JSON.parse(
        fs.readFileSync(`${config.metadataPath}/${seasonName}/${episodeName}`, "utf-8")
      );
      paths.push({
        params: {
          v: `s${episode.season.toString().padStart(2, "0")}.e${episode.episode.toString().padStart(3, "0")}`,
        },
      });
    }
  }

  return {
    paths,
    fallback: "blocking",
  };
};
