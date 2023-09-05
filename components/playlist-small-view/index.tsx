import { Divider, Paper, Skeleton, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Collection, IPlaylist, IUser, IVideo } from "../../src/types";
import { useEffect, useState } from "react";
import pb from "../../src/pocketbase";
import PlaylistSmallEpisode from "./episode";

interface IProps {
  playlist: IPlaylist;
  playerHeight: number;
  currentEpisodeId: string;
}

const PlaylistSmallView: React.FC<IProps> = ({ playlist, playerHeight, currentEpisodeId }) => {
  const [episodes, setEpisodes] = useState<IVideo[]>([]);
  const [playlistErr, setPlaylistErr] = useState<string | boolean>(false);
  const [user, setUser] = useState<IUser>();
  const theme = useTheme();
  const isLgDown = useMediaQuery(theme.breakpoints.down("lg"));

  useEffect(() => {
    (async () => {
      try {
        let episodes = [];

        const arr = playlist.episodes.split(",");

        for (let i = 0; i < arr.length; i++) {
          try {
            const episode = await fetch(`/api/v3/metadata/2/episode/${arr[i]}`).then((res) => res.json());

            episodes.push(episode);
          } catch (err) {
            setPlaylistErr(err);
          }
        }

        // commented to test skeleton
        setEpisodes(episodes);
      } catch (err) {
        setPlaylistErr(err);
      }

      if (playlist.user) {
        const userId = playlist.user;

        setUser(await pb.collection(Collection.Users).getOne(userId));
      }
    })();
  }, [playlist, playlist.user]);

  const skeleton = new Array(playlist.episodes.split(",").length).fill(
    <>
      <div style={{ display: "flex", flexDirection: "row", margin: "8px 0" }}>
        <Skeleton variant="rectangular" width={100} height={56} animation="wave" />
        <div style={{ marginLeft: 8, display: "flex", flexDirection: "column", flexGrow: "1" }}>
          <Skeleton variant="text" width="35%" animation="wave" />
          <Skeleton variant="text" animation="wave" />
        </div>
      </div>
      <Divider />
    </>
  );

  return (
    <Paper
      sx={{
        margin: isLgDown ? "16px 0" : "0 16px",
        minWidth: "400px",
        maxWidth: isLgDown ? undefined : "400px",
        maxHeight: isLgDown ? "600px" : `${playerHeight}px`,
        minHeight: isLgDown ? "460px" : undefined,
        display: "flex",
        flexDirection: "column",
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <div
        style={{
          padding: 16,
          height: 88,
        }}
      >
        <Typography variant="h5" component="h2">
          {playlist?.name}
        </Typography>
        <Typography>
          {user?.name} &bull; {episodes.length > 0 ? episodes.length : playlist.episodes.split(",").length} Videos
        </Typography>
      </div>
      <Divider />
      <Paper
        sx={{
          overflowY: "scroll",
          marginLeft: 0,
          marginRight: 0,
          backgroundColor: theme.palette.background.default,
          backgroundImage: "unset",
          flexGrow: 1,
          maxHeight: "100%",
          boxShadow: "unset",
          transition: "unset",
        }}
      >
        {playlistErr
          ? playlistErr
          : episodes.length > 0
          ? episodes.map((episode) => {
              return (
                <PlaylistSmallEpisode
                  key={`s${episode.season.toString().padStart(2, "0")}.e${episode.episode.toString().padStart(3, "0")}`}
                  episode={episode}
                  currentEpisodeId={currentEpisodeId}
                  playlistId={playlist.id}
                />
              );
            })
          : skeleton.map((skeletonElem) => skeletonElem)}
      </Paper>
    </Paper>
  );
};

export default PlaylistSmallView;
