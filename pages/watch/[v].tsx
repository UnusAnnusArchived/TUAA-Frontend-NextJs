import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import moment from "moment-with-locales-es6";
import { GetStaticPaths, GetStaticProps } from "next";
import React, { useEffect, useMemo, useRef, useState } from "react";
import fs from "fs";
import config from "../../src/config.json";
import { useTranslation } from "react-i18next";
import { CommentList } from "../../components/comments";
import { EpisodesRow } from "../../components/episodes-controls";
import { Layout } from "../../components/layout";
import { MetaHead } from "../../components/meta-head";
import { Player } from "../../components/player";
import { Collection, IMetadataV2Source, IPlaylist, IVideo } from "../../src/types";
import VideoDownloadOptions from "../../components/video-download-options";
import { IconButton, useMediaQuery, useTheme } from "@mui/material";
import { useRouter } from "next/router";
import PlaylistSmallView from "../../components/playlist-small-view";
import pb from "../../src/pocketbase";
import { Favorite, FavoriteBorder, PlaylistAdd } from "@mui/icons-material";
import { addVideoToPlaylist, removeVideoFromPlaylist } from "../../src/utils/playlistActions";
import { useRecoilState } from "recoil";
import { userAtom } from "../../src/atoms";
import { useToasts } from "@geist-ui/react";
import AddToPlaylist from "../../components/add-to-playlist";

interface IProps {
  watchCode: string;
  video: IVideo;
}

export type HandleCreatePlaylist = (videoIdToAdd: string) => Promise<void>;

const Watch: React.FC<IProps> = ({ watchCode, video }) => {
  const [inPlaylist, setInPlaylist] = useState<IPlaylist>();
  const { i18n } = useTranslation();
  const router = useRouter();
  const image = video.thumbnail ?? video.posters.find((x) => x.src.toLowerCase().includes("jpg")).src;
  const theme = useTheme();
  const isLgDown = useMediaQuery(theme.breakpoints.down("lg"));
  const [playerHeight, setPlayerHeight] = useState(0);
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  const [videoIsFavorited, setVideoIsFavorited] = useState(false);
  const [videoIsFavoritedBtn, setVideoIsFavoritedBtn] = useState(false);
  const [addToPlaylistOpen, setAddToPlaylistOpen] = useState(false);
  const [createPlaylist, setCreatePlaylist] = useState(false);
  const [currentUser] = useRecoilState(userAtom);
  const [, setToast] = useToasts();

  const published = new Date(video.date ?? video.releasedate);
  const embedUrl = `https://unusann.us/embed/${watchCode}`;
  const metaVideoUrl = video.video ?? (video.sources[0] as IMetadataV2Source).src;

  useEffect(() => {
    (async () => {
      const playlistId = router.query.playlist as string;

      if (playlistId) {
        const playlist = await pb.collection(Collection.UserPlaylists).getOne<IPlaylist>(playlistId);

        if (playlist.episodes.includes(watchCode)) {
          setInPlaylist(playlist);
        }
      }
    })();
  }, [router, router.query]);

  useMemo(() => {
    setVideoIsFavoritedBtn(videoIsFavorited);
  }, [videoIsFavorited]);

  const handleFavorite = async () => {
    try {
      if (videoIsFavorited) {
        setVideoIsFavoritedBtn(false);
        await removeVideoFromPlaylist(currentUser, watchCode, "favorites");
        setVideoIsFavorited(false);
      } else {
        setVideoIsFavoritedBtn(true);
        await addVideoToPlaylist(currentUser, watchCode, "favorites");
        setVideoIsFavorited(true);
      }
    } catch (err) {
      setVideoIsFavoritedBtn(videoIsFavorited);
      setToast({
        type: "error",
        text: err.toString(),
      });
    }
  };

  const handleAddToPlaylist = () => {
    setAddToPlaylistOpen(true);
  };

  const handleCreatePlaylist: HandleCreatePlaylist = async (videoIdToAdd: string) => {
    setAddToPlaylistOpen(false);
  };

  return (
    <Layout>
      <MetaHead
        baseTitle={video.title}
        embed={embedUrl}
        video={metaVideoUrl}
        date={video.date ?? video.releasedate}
        description={video.description}
        image={`https:${image}`}
      />
      <div style={{ display: "flex", flexDirection: isLgDown ? "column" : "row" }}>
        <Player
          video={video}
          watchCode={watchCode}
          setShowDownloadOptions={setShowDownloadOptions}
          setPlayerHeight={setPlayerHeight}
        />
        {inPlaylist && (
          <PlaylistSmallView playlist={inPlaylist} playerHeight={playerHeight} currentEpisodeId={watchCode} />
        )}
      </div>
      {!inPlaylist && <EpisodesRow watchCode={watchCode} />}
      <Paper className={`my-3 p-3 ${showDownloadOptions ? "" : "display-none"}`}>
        <VideoDownloadOptions video={video} />
      </Paper>
      <Paper
        className="my-3 p-3 desc"
        sx={{
          "& a": {
            color: theme.palette.mode === "dark" ? "#c2c2c2" : "#3d3d3d",
            "&:after": { backgroundColor: theme.palette.mode === "dark" ? "#ffffff" : "#000000" },
            "&:hover": { color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" },
          },
        }}
      >
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Typography variant="h6" component="h1">
            {video.title}
          </Typography>
          <div style={{ flexGrow: 1 }} />
          <IconButton onClick={handleAddToPlaylist}>
            <PlaylistAdd />
          </IconButton>
          <IconButton onClick={handleFavorite}>
            {videoIsFavoritedBtn ? <Favorite color="error" /> : <FavoriteBorder />}
          </IconButton>
        </div>
        <Typography variant="body2" component="p">
          {moment(published).locale(i18n.language).format("DD MMMM YYYY")}
        </Typography>
        <Divider className="my-2" sx={{ backgroundColor: "#fff" }} />
        <div
          dangerouslySetInnerHTML={{
            __html: video.description.replace(/(\n)/g, "<br />"),
          }}
        />
      </Paper>
      <Paper className="my-3 p-3">
        <CommentList watchCode={watchCode} />
      </Paper>
      <AddToPlaylist
        videoId={watchCode}
        open={addToPlaylistOpen}
        setOpen={setAddToPlaylistOpen}
        handleCreatePlaylist={handleCreatePlaylist}
      />
    </Layout>
  );
};

export default Watch;

export const getStaticProps: GetStaticProps<IProps> = async (context) => {
  const watchCode = context.params.v.toString();
  const split = watchCode.split(".");
  const season = split[0].replace("s", "");
  const episode = split[1].replace("e", "");

  const path = `${config.metadataPath}/${season}/${episode}.json`;

  if (fs.existsSync(path)) {
    const video: IVideo = JSON.parse(fs.readFileSync(path, "utf-8"));
    return {
      props: {
        watchCode,
        video,
      },
      revalidate: 60 * 60 * 24, //1 day
    };
  } else {
    return { props: { video: null }, notFound: true };
  }
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  const paths = [];

  const seasons = fs.readdirSync(config.metadataPath);
  for (const seasonName of seasons) {
    if (fs.statSync(`${config.metadataPath}/${seasonName}`).isDirectory()) {
      const season = fs.readdirSync(`${config.metadataPath}/${seasonName}`);
      for (const episodeName of season) {
        const episode: IVideo = JSON.parse(
          fs.readFileSync(`${config.metadataPath}/${seasonName}/${episodeName}`, "utf-8")
        );
        paths.push({
          params: {
            v: `s${episode.season.toString().padStart(2, "0")}.e${episode.episode.toString().padStart(3, "0")}`,
          },
        });
      }
    }
  }

  return {
    paths,
    fallback: "blocking",
  };
};
