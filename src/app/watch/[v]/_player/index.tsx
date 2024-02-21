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
import { IDirectResolution, IMetadata } from "@/zodTypes";
import { Video } from "bunny-stream";
import { EpisodeLinks } from "@/tools/getBunnyEpisodeLink";
import { useTolgee } from "@tolgee/react";
import endpoints from "@/endpoints.json";

interface IProps {
  episode: IMetadata;
  bunnyEpisode: Video;
  bunnyLinks: EpisodeLinks;
}

export const playerContext = createContext<IProps>(undefined as any as IProps);

export const sourceIdContext = createContext<[string, React.Dispatch<React.SetStateAction<string>>]>(["", () => ""]);

export const directSourceResolutionHeightContext = createContext<
  [number, React.Dispatch<React.SetStateAction<number>>]
>([1080, () => 1080]);

const Player: React.FC<IProps> = ({ episode, bunnyEpisode, bunnyLinks }) => {
  const player = useRef<MediaPlayerInstance>(null);
  const [srcId, setSrcId] = useState<string>("bunny");
  const [directSourceResolutionHeight, setDirectSourceResolutionHeight] = useState(1080);
  const tolgee = useTolgee();
  const language = tolgee.getLanguage();

  console.log(srcId);

  const source = episode.sources.find((source) => source.id === srcId)!;
  let srcUrl = "";
  switch (source.type) {
    case "bunny": {
      srcUrl = bunnyLinks.hls;
      break;
    }
    case "direct": {
      const resolution = source.resolutions.find((resolution) => resolution.height === directSourceResolutionHeight)!;
      srcUrl = resolution.src;
      break;
    }
    case "youtube": {
      srcUrl = `youtube/${source.youtubeId}`;
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
            src={bunnyLinks.thumbnail}
            alt={`Thumbnail for ${episode.uaid}`}
          />

          {bunnyLinks.captions.map((track) => (
            <Track
              kind="captions"
              src={track.src}
              lang={track.srclang}
              label={track.label}
              default={language === track.srclang}
            />
          ))}
          {/* <Track kind="chapters" content="" /> */}
        </MediaProvider>

        <playerContext.Provider value={{ episode, bunnyEpisode, bunnyLinks }}>
          <sourceIdContext.Provider value={[srcId, setSrcId]}>
            <directSourceResolutionHeightContext.Provider
              value={[directSourceResolutionHeight, setDirectSourceResolutionHeight]}
            >
              <VideoLayout thumbnails={`${endpoints.api}/v3/seekImages/${bunnyEpisode.guid}`} />
            </directSourceResolutionHeightContext.Provider>
          </sourceIdContext.Provider>
        </playerContext.Provider>
      </MediaPlayer>
    </>
  );
};

export default Player;
