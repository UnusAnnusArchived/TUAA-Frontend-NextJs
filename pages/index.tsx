import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { GetServerSideProps, GetStaticProps } from "next";
import Head from "next/head";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Layout } from "../components/layout";
import { MetaHead } from "../components/meta-head";
import { VideoList } from "../components/video-list";
import { endpoint } from "../src/endpoints";
import { Seasons } from "../src/types";

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
      <MetaHead />
      <div>
        <Tabs value={currentTab} onChange={handleChange} centered>
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
  const res = await fetch(`${endpoint}/v2/metadata/all`);
  const data: Seasons = await res.json();

  return {
    props: {
      seasons: data,
    },
    revalidate: 60 * 60 * 24, // 1 day
  };
};

// export const getServerSideProps: GetServerSideProps<IProps> = async (
//   context
// ) => {
//   // Perhaps change to build only once
//   // However web app will need to be rebuild every time the video dataset changes

//   const res = await fetch(`${endpoint}/v2/metadata/all`);
//   const data: Seasons = await res.json();

//   return {
//     props: {
//       seasons: data,
//     },
//   };
// };
