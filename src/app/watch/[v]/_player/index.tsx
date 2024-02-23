"use client";

import {
  MediaCanPlayDetail,
  MediaCanPlayEvent,
  MediaPlayer,
  MediaPlayerInstance,
  MediaProvider,
  MediaProviderAdapter,
  MediaProviderChangeEvent,
  MediaViewType,
  Poster,
  Track,
  isHLSProvider,
} from "@vidstack/react";
import React, { createContext, useEffect, useRef, useState } from "react";
import { VideoLayout } from "./layouts/video";
import styles from "./player.module.css";
import "@vidstack/react/player/styles/default/theme.css";
import { IDirectResolution, IDirectSource, IMetadata, ISource, IYouTubeSource } from "@/zodTypes";
import { Video } from "bunny-stream";
import { EpisodeLinks } from "@/tools/getEpisodeLinks";
import { useTolgee } from "@tolgee/react";
import endpoints from "@/endpoints.json";

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
  const tolgee = useTolgee();
  const language = tolgee.getLanguage();

  console.log(srcId);

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
        className={`${styles.player} media-player`}
        title={episode.title}
        src={srcUrl}
        crossorigin
        playsinline
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
        <MediaProvider>
          <Poster
            className={`${styles.poster} vds-poster`}
            src={episodeLinks.thumbnail}
            alt={`Thumbnail for ${episode.uaid}`}
          />

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

        <playerContext.Provider value={{ episode, episodeLinks }}>
          <sourceIdContext.Provider value={[srcId, setSrcId]}>
            <directSourceResolutionHeightContext.Provider
              value={[directSourceResolutionWidth, setDirectSourceResolutionWidth]}
            >
              <VideoLayout thumbnails={episodeLinks.seek} />
            </directSourceResolutionHeightContext.Provider>
          </sourceIdContext.Provider>
        </playerContext.Provider>
      </MediaPlayer>
    </>
  );
};

export default Player;
