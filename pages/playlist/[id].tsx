import { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPageContext } from "next";
import { Collection, IPlaylist, IUser, IVideo } from "../../src/types";
import pb from "../../src/pocketbase";
import { Layout } from "../../components/layout";
import fs from "fs/promises";
import config from "../../src/config.json";
import { MetaHead } from "../../components/meta-head";
import { VideoList } from "../../components/video-list";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

interface IProps {
  playlist: IPlaylist;
  episodes: IVideo[];
}

const Playlist: React.FC<IProps> = ({ playlist, episodes }) => {
  const [user, setUser] = useState<IUser>();
  const [err404, setErr404] = useState(false);

  useEffect(() => {
    (async () => {
      const userId = playlist.user;

      setUser(await pb.collection(Collection.Users).getOne<IUser>(userId));
    })();
  }, [playlist, playlist.user]);

  return (
    <Layout>
      <MetaHead baseTitle={playlist.name} description={playlist.description} />
      <Typography variant="h4" component="h2">
        Playlist: {playlist.name}
      </Typography>
      <Typography>{user?.name}</Typography>
      <div>
        <VideoList videos={episodes} showSeasons inPlaylist={playlist.id} />
      </div>
    </Layout>
  );
};

export default Playlist;

export const getServerSideProps: GetServerSideProps<IProps> = async (ctx) => {
  const playlistId = ctx.params.id as string;

  try {
    const playlist: IPlaylist = await pb.send(`/api/collections/user_playlists/records/${playlistId}?perPage=400`, {
      headers: {
        Authorization: JSON.parse(decodeURIComponent(ctx.req.cookies.pb_auth)).token,
      },
    });

    const episodes = await Promise.all(
      playlist.episodes.split(",").map(async (episodeId) => {
        const split = episodeId.split(".");
        const season = split[0].replace("s", "");
        const episode = split[1].replace("e", "");

        const path = `${config.metadataPath}/${season}/${episode}.json`;

        try {
          const video: IVideo = JSON.parse(await fs.readFile(path, "utf-8"));
          return video;
        } catch {
          return {
            _metadata_version: 2,
            title: "Could not find video!",
            description: "",
            season: parseInt(season),
            episode: parseInt(episode),
            date: 0,
            posters: [],
            duration: 0,
            sources: [],
            tracks: [],
          } as IVideo;
        }
      })
    );

    return {
      props: {
        playlist,
        episodes,
      },
    };
  } catch {
    return { props: { playlist: null, episodes: null }, notFound: true };
  }
};

// export const getStaticPaths: GetStaticPaths = async (ctx) => {
//   const paths = [];

//   const playlists = await pb.collection(Collection.UserPlaylists).getFullList<IPlaylist>(undefined, {});

//   for (let i = 0; i < playlists.length; i++) {
//     paths.push({
//       params: {
//         id: playlists[i].id,
//       },
//     });
//   }

//   return {
//     paths,
//     fallback: "blocking",
//   };
// };
