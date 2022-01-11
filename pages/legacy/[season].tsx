import React from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import { useTranslation } from "react-i18next";
import { endpoint } from "../..//src/endpoints";
import type { Season } from "../../src/types";
import { MetaHead } from "../../components/meta-head";

interface IProps {
  episodes: Season;
  season: string;
}

const Legacy: React.FC<IProps> = ({ episodes, season }) => {
  const { t, i18n } = useTranslation();
  
  return (
    <React.Fragment>
      <style>
        {" body { all: unset; } html { background-color: #ffffff; } "}
      </style>
      <MetaHead baseTitle={t("home:title")} />
      <div style={{textAlign:"center"}}>
        <h1>The Unus Annus Archive</h1>
        <div>
          {episodes.map((episode, i) => {
            return (
              <p key={`episode-${i}`}>
                {episode.title}
              </p>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Legacy;

export const getStaticProps: GetStaticProps<IProps> = async(context) => {
  const season = context.params.season.toString().padStart(2, "0");
  const res = await fetch(`${endpoint}/v2/metadata/season/s${season}`);
  const data: Season = await res.json();

  return {
    props: {
      episodes: data,
      season: season
    },
    revalidate: 60 * 60 * 24 // 1 day
  };
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  const res = await fetch(`${endpoint}/v2/metadata/all`);
  const data: any[][] = await res.json();

  const paths = [];

  for (var i = 0; i < data.length; i++) {
    paths.push({
      params: {
        season: i.toString().padStart(2, "0")
      }
    });
  }

  return {
    paths,
    fallback: "blocking",
  };
};
