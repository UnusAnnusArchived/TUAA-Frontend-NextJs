"use client";

import { MediaPlayer, MediaPlayerInstance, MediaProvider, Poster } from "@vidstack/react";
import React, { createContext, useRef, useState } from "react";
import "@vidstack/react/player/styles/default/theme.css";
import { IDirectSource, IMetadata, IYouTubeSource } from "@/zodTypes";
import { EpisodeLinks } from "@/tools/getEpisodeLinks";
import { useTolgee } from "@tolgee/react";
import { DefaultVideoLayout } from "@vidstack/react/player/layouts/default";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import {
  Audiotrack,
  Cast,
  CastConnected,
  ChevronLeft,
  ChevronRight,
  FontDownload,
  Forward10,
  Fullscreen,
  FullscreenExit,
  Pause,
  PictureInPictureAlt,
  PlayArrow,
  Replay,
  Replay10,
  Settings,
  Speed,
  Subtitles,
  SubtitlesOff,
  Tune,
  VolumeDown,
  VolumeOff,
  VolumeUp,
} from "@mui/icons-material";
import PreviousEpisode from "./previousEpisode";
import NextEpisode from "./nextEpisode";
import SourceMenu from "./sourceMenu";
import PlayerLayout from "./layout";

interface IProps {
  episode: IMetadata;
  episodeLinks: EpisodeLinks;
}

export const playerContext = createContext<IProps>(undefined as any as IProps);

export const sourceIdContext = createContext<[string, React.Dispatch<React.SetStateAction<string>>]>(["", () => ""]);

export const directSourceResolutionHeightContext = createContext<
  [number, React.Dispatch<React.SetStateAction<number>>]
>([1080, () => 1080]);

const Player: React.FC<IProps> = ({ episode, episodeLinks }) => {
  const player = useRef<MediaPlayerInstance>(null);
  const [srcId, setSrcId] = useState<string>("tuaa");
  const [directSourceResolutionWidth, setDirectSourceResolutionWidth] = useState(1920);
  const { t } = useTolgee();

  const switchSources = (newSource: string) => {
    if (player.current) {
      const time = player.current?.currentTime;

      setSrcId(newSource);

      player.current?.listen("can-play", () => {
        if (player.current) {
          player.current.currentTime = time;
        }
      });
    }
  };

  let srcUrl = "";

  switch (srcId) {
    case "tuaa": {
      srcUrl = episodeLinks.hls;
      break;
    }
    case "youtube":
      {
        const source = episode.externalSources?.find((source) => source.type === "youtube") as IYouTubeSource;
        if (source) {
          srcUrl = `youtube/${source.youtubeId}`;
        } else {
          setSrcId("tuaa");
        }
      }
      break;
    default: {
      const source = episode.externalSources?.find(
        (source) => source.type === "direct" && source.id === srcId
      ) as IDirectSource;
      if (source) {
        let resolution = source.resolutions.find((resolution) => resolution.width === directSourceResolutionWidth);
        if (!resolution) {
          resolution = source.resolutions[0];
        }
        srcUrl = resolution.src;
      } else {
        setSrcId("tuaa");
      }
      break;
    }
  }

  return (
    <>
      <MediaPlayer
        // className={`${styles.player} media-player`}
        title={episode.title}
        playsInline
        src={srcUrl}
        ref={player}
        style={{
          aspectRatio: 16 / 9,
          width: "100%",
          height: "auto",
          overflow: "hidden",
          backgroundColor: "#000000",
          flexDirection: "column",
        }}
      >
        <MediaProvider style={{ position: "absolute" }}>
          <Poster className={`vds-poster`} src={episodeLinks.thumbnail} alt={`Thumbnail for ${episode.uaid}`} />

          {/* {bunnyLinks.captions.map((track) => (
            <Track
              kind="captions"
              src={track.src}
              lang={track.srclang}
              label={track.label}
              default={language === track.srclang}
            />
          ))} */}
          {/* <Track kind="chapters" content="" /> */}
        </MediaProvider>

        <PlayerLayout episode={episode} srcId={srcId} switchSources={switchSources} />
      </MediaPlayer>
    </>
  );
};

export default Player;
