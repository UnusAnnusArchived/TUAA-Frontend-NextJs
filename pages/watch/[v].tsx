import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import moment from "moment-with-locales-es6";
import ***REMOVED*** GetServerSideProps, GetStaticPaths, GetStaticProps ***REMOVED*** from "next";
import React from "react";
import ***REMOVED*** useTranslation ***REMOVED*** from "react-i18next";
import ***REMOVED*** CommentList ***REMOVED*** from "../../components/comments";
import ***REMOVED*** EpisodesRow ***REMOVED*** from "../../components/episodes-controls";
import ***REMOVED*** Layout ***REMOVED*** from "../../components/layout";
import ***REMOVED*** MetaHead ***REMOVED*** from "../../components/meta-head";
import ***REMOVED*** Player ***REMOVED*** from "../../components/player";
import ***REMOVED*** endpoint ***REMOVED*** from "../../src/endpoints";
import ***REMOVED*** IVideo, Seasons ***REMOVED*** from "../../src/types";

interface IProps ***REMOVED***
  watchCode: string;
  video: IVideo;
***REMOVED***

const Watch: React.FC<IProps> = (***REMOVED*** watchCode, video ***REMOVED***) => ***REMOVED***
  const ***REMOVED*** i18n ***REMOVED*** = useTranslation();
  const image =
    video.thumbnail ??
    video.posters.find((x) => x.src.toLowerCase().includes("jpg")).src;

  const published = new Date(video.date ?? video.releasedate);
  const embedUrl = `https://unusann.us/embed/$***REMOVED***watchCode***REMOVED***`;
  const metaVideoUrl = video.video ?? video.sources[0].src;

  return (
    <Layout>
      <MetaHead
        baseTitle=***REMOVED***video.title***REMOVED***
        embed=***REMOVED***embedUrl***REMOVED***
        video=***REMOVED***metaVideoUrl***REMOVED***
        date=***REMOVED***video.date ?? video.releasedate***REMOVED***
        description=***REMOVED***video.description***REMOVED***
        image=***REMOVED***`https:$***REMOVED***image***REMOVED***`***REMOVED***
      />
      <Player video=***REMOVED***video***REMOVED*** watchCode=***REMOVED***watchCode***REMOVED*** />
      <EpisodesRow watchCode=***REMOVED***watchCode***REMOVED*** />
      <Paper className="my-3 p-3 desc">
        <Typography variant="h6" component="h1">
          ***REMOVED***video.title***REMOVED***
        </Typography>
        <Typography variant="body2" component="p">
          ***REMOVED***moment(published).locale(i18n.language).format("DD MMMM YYYY")***REMOVED***
        </Typography>
        <Divider className="my-2" sx=***REMOVED******REMOVED*** backgroundColor: "#fff" ***REMOVED******REMOVED*** />
        <Typography variant="body1" component="p">
          <div
            dangerouslySetInnerHTML=***REMOVED******REMOVED***
              __html: video.description.replace(/(\n)/g, "<br />"),
        ***REMOVED******REMOVED***
          />
        </Typography>
      </Paper>
      <Paper className="my-3 p-3">
        <CommentList watchCode=***REMOVED***watchCode***REMOVED*** />
      </Paper>
    </Layout>
  );
***REMOVED***;

export default Watch;

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
    revalidate: 60 * 60 * 24, // 1 day
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
