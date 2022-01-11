import React from "react";
import ***REMOVED*** GetStaticProps, GetStaticPaths ***REMOVED*** from "next";
import ***REMOVED*** useTranslation ***REMOVED*** from "react-i18next";
import ***REMOVED*** endpoint ***REMOVED*** from "../..//src/endpoints";
import type ***REMOVED*** Season ***REMOVED*** from "../../src/types";
import ***REMOVED*** MetaHead ***REMOVED*** from "../../components/meta-head";

interface IProps ***REMOVED***
  episodes: Season;
  season: string;
***REMOVED***

const Legacy: React.FC<IProps> = (***REMOVED*** episodes, season ***REMOVED***) => ***REMOVED***
  const ***REMOVED*** t, i18n ***REMOVED*** = useTranslation();
  
  return (
    <React.Fragment>
      <style>
        ***REMOVED***" body ***REMOVED*** all: unset; ***REMOVED*** html ***REMOVED*** background-color: #ffffff; ***REMOVED*** "***REMOVED***
      </style>
      <MetaHead baseTitle=***REMOVED***t("home:title")***REMOVED*** />
      <div style=***REMOVED******REMOVED***textAlign:"center"***REMOVED******REMOVED***>
        <h1>The Unus Annus Archive</h1>
        <div>
          ***REMOVED***episodes.map((episode, i) => ***REMOVED***
            return (
              <p key=***REMOVED***`episode-$***REMOVED***i***REMOVED***`***REMOVED***>
                ***REMOVED***episode.title***REMOVED***
              </p>
            );
      ***REMOVED***)***REMOVED***
        </div>
      </div>
    </React.Fragment>
  );
***REMOVED***;

export default Legacy;

export const getStaticProps: GetStaticProps<IProps> = async(context) => ***REMOVED***
  const season = context.params.season.toString().padStart(2, "0");
  const res = await fetch(`$***REMOVED***endpoint***REMOVED***/v2/metadata/season/s$***REMOVED***season***REMOVED***`);
  const data: Season = await res.json();

  return ***REMOVED***
    props: ***REMOVED***
      episodes: data,
      season: season
  ***REMOVED***
    revalidate: 60 * 60 * 24 // 1 day
***REMOVED***;
***REMOVED***;

export const getStaticPaths: GetStaticPaths = async (context) => ***REMOVED***
  const res = await fetch(`$***REMOVED***endpoint***REMOVED***/v2/metadata/all`);
  const data: any[][] = await res.json();

  const paths = [];

  for (var i = 0; i < data.length; i++) ***REMOVED***
    paths.push(***REMOVED***
      params: ***REMOVED***
        season: i.toString().padStart(2, "0")
  ***REMOVED***
***REMOVED***);
***REMOVED***

  return ***REMOVED***
    paths,
    fallback: "blocking",
***REMOVED***;
***REMOVED***;
