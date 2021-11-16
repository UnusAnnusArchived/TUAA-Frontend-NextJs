import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import moment from "moment";
import ***REMOVED*** GetServerSideProps ***REMOVED*** from "next";
import React from "react";
import ***REMOVED*** CommentList ***REMOVED*** from "../../components/comments";
import ***REMOVED*** EpisodesRow ***REMOVED*** from "../../components/episodes-controls";
import ***REMOVED*** Layout ***REMOVED*** from "../../components/layout";
import ***REMOVED*** MetaHead ***REMOVED*** from "../../components/meta-head";
import ***REMOVED*** Player ***REMOVED*** from "../../components/player";
import ***REMOVED*** endpoint ***REMOVED*** from "../../src/endpoints";
import ***REMOVED*** IVideo ***REMOVED*** from "../../src/types";

interface IProps ***REMOVED***
  watchCode: string;
  video: IVideo;
***REMOVED***

const Watch: React.FC<IProps> = (***REMOVED*** watchCode, video ***REMOVED***) => ***REMOVED***
  const image =
    video.thumbnail ??
    video.posters.find((x) => x.src.toLowerCase().includes("jpg")).src;

  const published = new Date(video.date);

  return (
    <Layout>
      <MetaHead
        title=***REMOVED***`$***REMOVED***video.title***REMOVED*** | The Unus Anus Archive`***REMOVED***
        description="The Unus Anus Archive"
        image=***REMOVED***`https:$***REMOVED***image***REMOVED***`***REMOVED***
      />
      <Player video=***REMOVED***video***REMOVED*** watchCode=***REMOVED***watchCode***REMOVED*** />
      <EpisodesRow watchCode=***REMOVED***watchCode***REMOVED*** />
      <Paper className="my-3 p-3 desc">
        <Typography variant="h6" component="h1">
          ***REMOVED***video.title***REMOVED***
        </Typography>
        <Typography variant="body2" component="p">
          ***REMOVED***moment(published).format("DD MMMM YYYY")***REMOVED***
        </Typography>
        <Divider className="my-2" sx=***REMOVED******REMOVED*** backgroundColor: "#fff" ***REMOVED******REMOVED*** />
        <Typography variant="body1" component="p">
          <div
            dangerouslySetInnerHTML=***REMOVED******REMOVED***
              __html: video.description.replace(/(\r\n)/g, "<br />"),
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

export const getServerSideProps: GetServerSideProps<IProps, ***REMOVED*** v: string ***REMOVED***> =
  async (context) => ***REMOVED***
    const watchCode = context.query.v.toString();
    const res = await fetch(
      `$***REMOVED***endpoint***REMOVED***/api/v2/metadata/video/episode/$***REMOVED***watchCode***REMOVED***`
    );

    if (res.status !== 200) ***REMOVED***
      return ***REMOVED*** props: ***REMOVED*** video: null ***REMOVED***, notFound: true ***REMOVED***;
***REMOVED***

    const data: IVideo = await res.json();

    return ***REMOVED***
      props: ***REMOVED***
        watchCode,
        video: data,
    ***REMOVED***
***REMOVED***;
***REMOVED***;
