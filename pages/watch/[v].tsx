import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import moment from "moment-with-locales-es6";
import { GetServerSideProps } from "next";
import React from "react";
import { useTranslation } from "react-i18next";
import { CommentList } from "../../components/comments";
import { EpisodesRow } from "../../components/episodes-controls";
import { Layout } from "../../components/layout";
import { MetaHead } from "../../components/meta-head";
import { Player } from "../../components/player";
import { endpoint } from "../../src/endpoints";
import { IVideo } from "../../src/types";

interface IProps {
  watchCode: string;
  video: IVideo;
}

const Watch: React.FC<IProps> = ({ watchCode, video }) => {
  const { i18n } = useTranslation();
  const image =
    video.thumbnail ??
    video.posters.find((x) => x.src.toLowerCase().includes("jpg")).src;

  const published = new Date(video.date);

  return (
    <Layout>
      <MetaHead
        title={`${video.title} | The Unus Anus Archive`}
        description="The Unus Anus Archive"
        image={`https:${image}`}
      />
      <Player video={video} watchCode={watchCode} />
      <EpisodesRow watchCode={watchCode} />
      <Paper className="my-3 p-3 desc">
        <Typography variant="h6" component="h1">
          {video.title}
        </Typography>
        <Typography variant="body2" component="p">
          {moment(published).locale(i18n.language).format("DD MMMM YYYY")}
        </Typography>
        <Divider className="my-2" sx={{ backgroundColor: "#fff" }} />
        <Typography variant="body1" component="p">
          <div
            dangerouslySetInnerHTML={{
              __html: video.description.replace(/(\r\n)/g, "<br />"),
            }}
          />
        </Typography>
      </Paper>
      <Paper className="my-3 p-3">
        <CommentList watchCode={watchCode} />
      </Paper>
    </Layout>
  );
};

export default Watch;

export const getServerSideProps: GetServerSideProps<IProps, { v: string }> =
  async (context) => {
    const watchCode = context.query.v.toString();
    const res = await fetch(
      `${endpoint}/api/v2/metadata/video/episode/${watchCode}`
    );

    if (res.status !== 200) {
      return { props: { video: null }, notFound: true };
    }

    const data: IVideo = await res.json();

    return {
      props: {
        watchCode,
        video: data,
      },
    };
  };
