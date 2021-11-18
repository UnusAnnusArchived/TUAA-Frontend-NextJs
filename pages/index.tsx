import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import ***REMOVED*** GetServerSideProps ***REMOVED*** from "next";
import Head from "next/head";
import React, ***REMOVED*** useState ***REMOVED*** from "react";
import ***REMOVED*** useTranslation ***REMOVED*** from "react-i18next";
import ***REMOVED*** Layout ***REMOVED*** from "../components/layout";
import ***REMOVED*** MetaHead ***REMOVED*** from "../components/meta-head";
import ***REMOVED*** VideoList ***REMOVED*** from "../components/video-list";
import ***REMOVED*** endpoint ***REMOVED*** from "../src/endpoints";
import ***REMOVED*** Seasons ***REMOVED*** from "../src/types";

interface IProps ***REMOVED***
  seasons: Seasons;
***REMOVED***

const Page: React.FC<IProps> = (***REMOVED*** seasons ***REMOVED***) => ***REMOVED***
  const [currentTab, setCurrentTab] = useState(1);
  const ***REMOVED*** t, i18n ***REMOVED*** = useTranslation();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => ***REMOVED***
    setCurrentTab(newValue);
***REMOVED***;

  return (
    <Layout>
      <MetaHead
        title="The Unus Anus Archive"
        description="The Unus Anus Archive"
      />
      <div>
        <Tabs value=***REMOVED***currentTab***REMOVED*** onChange=***REMOVED***handleChange***REMOVED*** centered>
          <Tab label=***REMOVED***t("seasons:season1")***REMOVED*** value=***REMOVED***1***REMOVED*** />
          <Tab label=***REMOVED***t("seasons:season2")***REMOVED*** value=***REMOVED***0***REMOVED*** />
        </Tabs>
        ***REMOVED***seasons.map((season, i) => ***REMOVED***
          return (
            <div key=***REMOVED***`season-$***REMOVED***i***REMOVED***`***REMOVED*** hidden=***REMOVED***currentTab !== i***REMOVED***>
              <VideoList videos=***REMOVED***season***REMOVED*** />
            </div>
          );
    ***REMOVED***)***REMOVED***
      </div>
    </Layout>
  );
***REMOVED***;

export default Page;

export const getServerSideProps: GetServerSideProps<IProps> = async (
  context
) => ***REMOVED***
  // Perhaps change to build only once
  // However web app will need to be rebuild every time the video dataset changes

  const res = await fetch(`$***REMOVED***endpoint***REMOVED***/api/v2/metadata/all`);
  const data: Seasons = await res.json();

  return ***REMOVED***
    props: ***REMOVED***
      seasons: data,
  ***REMOVED***
***REMOVED***;
***REMOVED***;
