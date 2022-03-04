import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import fs from "fs";
import config from "../src/config.json";
import { GetStaticProps } from "next";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Layout } from "../components/layout";
import { MetaHead } from "../components/meta-head";
import { VideoList } from "../components/video-list";
import { endpoint } from "../src/endpoints";
import { IVideo, Seasons } from "../src/types";
import { useToasts } from "@geist-ui/react";
import { useRecoilState } from "recoil";
import { showPatreonAtom } from "../src/atoms";
import PatreonPopup from "../components/patreon-popup";

interface IProps {
  seasons: Seasons;
}

const Page: React.FC<IProps> = ({ seasons }) => {
  const [currentTab, setCurrentTab] = useState(1);
  const { t, i18n } = useTranslation();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <Layout>
      <MetaHead baseTitle={t("home:title")} />
      <div>
        {/* <PatreonPopup key="patreon" /> */}

        <Tabs key="tabs" value={currentTab} onChange={handleChange} centered>
          <Tab label={t("seasons:season1")} value={1} />
          <Tab label={t("seasons:season2")} value={0} />
        </Tabs>
        {seasons.map((season, i) => {
          return (
            <div key={`season-${i}`} hidden={currentTab !== i}>
              <VideoList videos={season} />
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default Page;

export const getStaticProps: GetStaticProps<IProps> = async (context) => {
  let metadata: Seasons = [[], []];

  const s00 = fs.readdirSync(`${config.metadataPath}/00`);
  for (let i = 0; i < s00.length; i++) {
    const episode: IVideo = JSON.parse(fs.readFileSync(`${config.metadataPath}/00/${s00[i]}`, "utf-8"));
    metadata[0].push(episode);
  }

  const s01 = fs.readdirSync(`${config.metadataPath}/01`);
  for (let i = 0; i < s01.length; i++) {
    const episode: IVideo = JSON.parse(fs.readFileSync(`${config.metadataPath}/01/${s01[i]}`, "utf-8"));
    metadata[1].push(episode);
  }

  return {
    props: {
      seasons: metadata,
    },
    revalidate: 60 * 60 * 24, // 1 day
  };
};
