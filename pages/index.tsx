import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import fs from "fs";
import config from "../src/config.json";
import { GetStaticProps } from "next";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Layout } from "../components/layout";
import { MetaHead } from "../components/meta-head";
import { VideoList } from "../components/video-list";
import { IVideo, Seasons } from "../src/types";
import PatreonPopup from "../components/patreon-popup";
import styles from "../styles/Home.module.scss";
import { ClickAwayListener, IconButton } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { theme } from "../components/theme/theme";
import VideoLinks from "../components/videoLinks";

interface IProps {
  seasons: Seasons;
}

const Page: React.FC<IProps> = ({ seasons }) => {
  const [currentTab, setCurrentTab] = useState(1);
  const { t, i18n } = useTranslation();
  const [videoLinksAnchor, setVideoLinksAnchor] = useState<React.MutableRefObject<SVGSVGElement> | boolean>(false);
  const videoLinksAnchorElement = useRef<SVGSVGElement>();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <Layout>
      <MetaHead baseTitle={t("pages:home")} />
      <div>
        <PatreonPopup key="patreon" />

        <div className={styles.seasonTabs}>
          <div className={styles.grow} key="grow" />
          <div className={styles.tabs} key="tabs">
            <Tabs key="tabs" value={currentTab} onChange={handleChange} centered>
              <Tab label={t("seasons:season1")} value={1} />
              <Tab label={t("seasons:season0")} value={0} />
            </Tabs>
          </div>
          <div className={styles.randomEpisode} key="random-episode">
            <ClickAwayListener
              onClickAway={() => {
                setVideoLinksAnchor(false);
              }}
            >
              <IconButton
                onClick={() => {
                  if (videoLinksAnchor) {
                    setVideoLinksAnchor(false);
                  } else {
                    setVideoLinksAnchor(videoLinksAnchorElement);
                  }
                }}
              >
                <ExpandMore
                  ref={videoLinksAnchorElement}
                  sx={{
                    transform: `scale(1, ${videoLinksAnchor ? "-1" : "1"})`,
                    transition: theme.transitions.create("transform", {
                      duration: theme.transitions.duration.leavingScreen,
                      easing: theme.transitions.easing.easeOut,
                    }),
                  }}
                />
              </IconButton>
            </ClickAwayListener>
            <VideoLinks anchor={videoLinksAnchor} setAnchor={setVideoLinksAnchor} seasons={seasons} />
          </div>
        </div>
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
