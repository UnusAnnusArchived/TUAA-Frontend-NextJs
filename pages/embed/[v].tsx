import React from "react";
import fs from "fs";
import config from "../../src/config.json";
import ***REMOVED*** IVideo ***REMOVED*** from "../../src/types";
import ***REMOVED*** Player ***REMOVED*** from "../../components/player";
import ***REMOVED*** GetStaticProps, GetStaticPaths ***REMOVED*** from "next";
import ***REMOVED*** endpoint ***REMOVED*** from "../../src/endpoints";

interface IProps ***REMOVED***
  watchCode: string;
  video: IVideo;
***REMOVED***

const Embed: React.FC<IProps> = (***REMOVED*** watchCode, video ***REMOVED***) => ***REMOVED***
  return <Player video=***REMOVED***video***REMOVED*** watchCode=***REMOVED***watchCode***REMOVED*** isEmbed />;
***REMOVED***;

export default Embed;

export const getStaticProps: GetStaticProps<IProps> = async (context) => ***REMOVED***
  const watchCode = context.params.v.toString();
  const res = await fetch(`$***REMOVED***endpoint***REMOVED***/v2/metadata/episode/$***REMOVED***watchCode***REMOVED***`);

  if (res.status !== 200) ***REMOVED***
    return ***REMOVED*** props: ***REMOVED*** video: null ***REMOVED***, notFound: true ***REMOVED***;
***REMOVED***

  const data: IVideo = await res.json();

  return ***REMOVED***
    props: ***REMOVED***
      watchCode,
      video: data,
  ***REMOVED***
    revalidate: 60 * 60 * 24, //1 day
***REMOVED***;
***REMOVED***;

export const getStaticPaths: GetStaticPaths = async (context) => ***REMOVED***
  const paths = [];

  const seasons = fs.readdirSync(config.metadataPath);
  for (const seasonName of seasons) ***REMOVED***
    const season = fs.readdirSync(`$***REMOVED***config.metadataPath***REMOVED***/$***REMOVED***seasonName***REMOVED***`);
    for (const episodeName of season) ***REMOVED***
      const episode: IVideo = JSON.parse(
        fs.readFileSync(`$***REMOVED***config.metadataPath***REMOVED***/$***REMOVED***seasonName***REMOVED***/$***REMOVED***episodeName***REMOVED***`, "utf-8")
      );
      paths.push(***REMOVED***
        params: ***REMOVED***
          v: `s$***REMOVED***episode.season.toString().padStart(2, "0")***REMOVED***.e$***REMOVED***episode.episode.toString().padStart(3, "0")***REMOVED***`,
      ***REMOVED***
  ***REMOVED***);
***REMOVED***
***REMOVED***

  return ***REMOVED***
    paths,
    fallback: "blocking",
***REMOVED***;
***REMOVED***;
