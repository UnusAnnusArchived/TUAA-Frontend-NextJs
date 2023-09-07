import { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPageContext } from "next";
import { Collection, IPlaylist, IUser, IVideo } from "../../src/types";
import pb from "../../src/pocketbase";
import { Layout } from "../../components/layout";
import fs from "fs/promises";
import config from "../../src/config.json";
import { MetaHead } from "../../components/meta-head";
import { VideoList } from "../../components/video-list";
import { IconButton, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Delete, Edit } from "@mui/icons-material";
import CreatePlaylist, { HandleCreatePlaylist } from "../../components/create-playlist";
import { handleEditPlaylist } from "../../src/utils/playlistActions";
import { useToasts } from "@geist-ui/react";
import PlaylistDescription from "../../components/playlist-description";
import DeletePlaylistDialog from "../../components/delete-playlist-dialog";

interface IProps {
  initialPlaylist: IPlaylist;
  episodes: IVideo[];
}

const Playlist: React.FC<IProps> = ({ initialPlaylist, episodes }) => {
  const [playlist, setPlaylist] = useState(initialPlaylist);
  const [user, setUser] = useState<IUser>();
  const [editPlaylistOpen, setEditPlaylistOpen] = useState(false);
  const [deletePlaylistOpen, setDeletePlaylistOpen] = useState(false);
  const [, setToast] = useToasts();
  const [err404, setErr404] = useState(false);

  useEffect(() => {
    (async () => {
      const userId = playlist.user;

      setUser(await pb.collection(Collection.Users).getOne<IUser>(userId));
    })();
  }, [playlist, playlist.user]);

  const handleOpenEdit = () => {
    setEditPlaylistOpen(true);
  };

  const handleEdit: HandleCreatePlaylist = async (name, description, isPublic) => {
    try {
      setPlaylist(await handleEditPlaylist(playlist.id, { name, description, isPublic }));
      setEditPlaylistOpen(false);
    } catch (err) {
      setToast({
        type: "error",
        text: err.toString(),
      });
    }
  };

  const handleDelete = async () => {
    setDeletePlaylistOpen(true);
  };

  return (
    <Layout>
      <MetaHead baseTitle={playlist.name} description={playlist.description} />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Typography variant="h4" component="h2">
          Playlist: {playlist.name}
        </Typography>
        <div style={{ flexGrow: 1, display: "flex", justifyContent: "end", alignItems: "center" }}>
          <IconButton onClick={handleOpenEdit}>
            <Edit />
          </IconButton>
          <IconButton color="error" onClick={handleDelete}>
            <Delete />
          </IconButton>
        </div>
      </div>
      <Typography>
        {user?.name} &bull; {playlist.public ? "Public" : "Private"}
      </Typography>
      {playlist.description && <PlaylistDescription description={playlist.description} />}
      <div>
        {episodes.length > 0 ? (
          <VideoList videos={episodes} showSeasons inPlaylist={playlist.id} />
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              height: "20rem",
            }}
          >
            <Typography variant="h5" component="h3">
              No Videos Added!
            </Typography>
            <Typography>Go to a video's watch page to add it to a playlist.</Typography>
          </div>
        )}
      </div>
      <CreatePlaylist
        open={editPlaylistOpen}
        setOpen={setEditPlaylistOpen}
        title="Edit Playlist"
        continueButtonText="Edit"
        initialName={playlist.name}
        initialDescription={playlist.description}
        initialPublic={playlist.public}
        handleResult={handleEdit}
      />
      <DeletePlaylistDialog open={deletePlaylistOpen} setOpen={setDeletePlaylistOpen} playlist={playlist} />
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
      playlist.episodes === ""
        ? []
        : playlist.episodes?.split?.(",").map(async (episodeId) => {
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
        initialPlaylist: playlist,
        episodes: episodes[0] === null ? [] : episodes,
      },
    };
  } catch (err) {
    return { props: { initialPlaylist: null, episodes: null }, notFound: true };
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
