import React from "react";
import fs from "fs";
import config from "../../src/config.json";
import { IVideo } from "../../src/types";
import { Player } from "../../components/player";
import { GetStaticProps, GetStaticPaths } from "next";

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
    if (fs.statSync(`${config.metadataPath}/${seasonName}`).isDirectory()) {
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
  }

  return {
    paths,
    fallback: "blocking",
  };
};
