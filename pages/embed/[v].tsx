import React from "react";
import fs from "fs";
import config from "../../src/config.json";
import { IVideo } from "../../src/types";
import { Player } from "../../components/player";
import { GetStaticProps, GetStaticPaths } from "next";
import { endpoint } from "../../src/endpoints";

interface IProps {
  watchCode: string;
  video: IVideo;
}

const Embed: React.FC<IProps> = ({ watchCode, video }) => {
  return <Player video={video} watchCode={watchCode} isEmbed />;
};

export default Embed;

export const getStaticProps: GetStaticProps<IProps> = async (context) => {
  const watchCode = context.params.v.toString();
  const res = await fetch(`${endpoint}/v2/metadata/episode/${watchCode}`);

  if (res.status !== 200) {
    return { props: { video: null }, notFound: true };
  }

  const data: IVideo = await res.json();

  return {
    props: {
      watchCode,
      video: data,
    },
    revalidate: 60 * 60 * 24, //1 day
  };
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
