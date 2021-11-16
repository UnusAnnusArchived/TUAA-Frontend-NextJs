import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { GetServerSideProps } from "next";
import Head from "next/head";
import React, { useState } from "react";
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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <Layout>
      <Head>
        <title>The Unus Anus Archive</title>
      </Head>
      <MetaHead
        title="The Unus Anus Archive"
        description="The Unus Anus Archive"
      />
      <div>
        <Tabs value={currentTab} onChange={handleChange} centered>
          <Tab label="Season 1" value={1} />
          <Tab label="Specials" value={0} />
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

export const getServerSideProps: GetServerSideProps<IProps> = async (
  context
) => {
  // Perhaps change to build only once
  // However web app will need to be rebuild every time the video dataset changes

  const res = await fetch(`${endpoint}/api/v2/metadata/video/all`);
  const data: Seasons = await res.json();

  return {
    props: {
      seasons: data,
    },
  };
};
