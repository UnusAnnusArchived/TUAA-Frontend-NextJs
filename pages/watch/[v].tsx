import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import moment from "moment-with-locales-es6";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import fs from "fs";
import config from "../../src/config.json";
import { useTranslation } from "react-i18next";
import { CommentList } from "../../components/comments";
import { EpisodesRow } from "../../components/episodes-controls";
import { Layout } from "../../components/layout";
import { MetaHead } from "../../components/meta-head";
import { Player } from "../../components/player";
import { endpoint } from "../../src/endpoints";
import { IVideo, Seasons, Season } from "../../src/types";

interface IProps {
  watchCode: string;
  video: IVideo;
}

const Watch: React.FC<IProps> = ({ watchCode, video }) => {
  const { i18n } = useTranslation();
  const image = video.thumbnail ?? video.posters.find((x) => x.src.toLowerCase().includes("jpg")).src;

  const published = new Date(video.date ?? video.releasedate);
  const embedUrl = `https://unusann.us/embed/${watchCode}`;
  const metaVideoUrl = video.video ?? video.sources[0].src;

  return (
    <Layout>
      <MetaHead
        baseTitle={video.title}
        embed={embedUrl}
        video={metaVideoUrl}
        date={video.date ?? video.releasedate}
        description={video.description}
        image={`https:${image}`}
      />
      <Player video={video} watchCode={watchCode} />
      <EpisodesRow watchCode={watchCode} />
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
      <Paper className="my-3 p-3">
        <CommentList watchCode={watchCode} />
      </Paper>
    </Layout>
  );
};

export default Watch;

export const getStaticProps: GetStaticProps<IProps> = async (context) => {
  const watchCode = context.params.v.toString();
  const res = await fetch(`${endpoint}/v2/metadata/episode/${watchCode}`);

  if (res.status !== 200) {
    return {
      props: { video: null },
      notFound: true,
      // revalidate in 30 minutes
      revalidate: 30 * 60,
    };
  }

  const data: IVideo = await res.json();

  return {
    props: {
      watchCode,
      video: data,
    },
    revalidate: 60 * 60 * 24, // 1 day
  };
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  const res = await fetch(`${endpoint}/v2/metadata/all`);
  const data: Seasons = await res.json();

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
