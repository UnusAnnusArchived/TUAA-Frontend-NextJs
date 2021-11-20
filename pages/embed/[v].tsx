import React from "react";
import ***REMOVED*** useTranslation ***REMOVED*** from "react-i18next";
import ***REMOVED*** IVideo, Seasons ***REMOVED*** from "../../src/types";
import ***REMOVED*** Player ***REMOVED*** from "../../components/player";
import ***REMOVED*** GetStaticProps, GetStaticPaths ***REMOVED*** from "next";
import ***REMOVED*** endpoint ***REMOVED*** from "../../src/endpoints";
import ***REMOVED*** Container ***REMOVED*** from "@mui/material";

interface IProps ***REMOVED***
  watchCode: string;
  video: IVideo;
***REMOVED***

const Embed: React.FC<IProps> = (***REMOVED*** watchCode, video ***REMOVED***) => ***REMOVED***
  return (
    <Player video=***REMOVED***video***REMOVED*** watchCode=***REMOVED***watchCode***REMOVED*** isEmbed />
  )
***REMOVED***

export default Embed

export const getStaticProps: GetStaticProps<IProps> = async (context) => ***REMOVED***
  const watchCode = context.params.v.toString();
  const res = await fetch(`$***REMOVED***endpoint***REMOVED***/v2/metadata/episode/$***REMOVED***watchCode***REMOVED***`);

  if (res.status !== 200) ***REMOVED***
    return ***REMOVED*** props: ***REMOVED*** video: null ***REMOVED***, notFound: true ***REMOVED***
***REMOVED***

  const data: IVideo = await res.json()

  return ***REMOVED***
    props: ***REMOVED***
      watchCode,
      video: data
  ***REMOVED***
    revalidate: 60 * 60 * 24, //1 day
***REMOVED***;
***REMOVED***;

export const getStaticPaths: GetStaticPaths = async (context) => ***REMOVED***
  const res = await fetch(`$***REMOVED***endpoint***REMOVED***/v2/metadata/all`);
  const data: Seasons = await res.json();

  const paths = [];

  for (const season of data) ***REMOVED***
    for (const episode of season) ***REMOVED***
      paths.push(***REMOVED***
        params: ***REMOVED***
          v: `s$***REMOVED***episode.season.toString().padStart(2, "0")***REMOVED***.e$***REMOVED***episode.episode
            .toString()
            .padStart(3, "0")***REMOVED***`,
      ***REMOVED***
  ***REMOVED***);
***REMOVED***
***REMOVED***

  return ***REMOVED***
    paths,
    fallback: "blocking",
***REMOVED***;
***REMOVED***;
