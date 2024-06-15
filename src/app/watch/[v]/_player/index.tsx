"use client";

import { MediaPlayer, MediaPlayerInstance, MediaProvider, PlayerSrc, Poster } from "@vidstack/react";
import React, { createContext, useEffect, useRef, useState } from "react";
import "@vidstack/react/player/styles/default/theme.css";
import { IDirectSource, IMetadata, IYouTubeSource } from "@/zodTypes";
import { EpisodeLinks } from "@/tools/getEpisodeLinks";
import { useTolgee } from "@tolgee/react";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import PlayerLayout from "./layout";

interface IProps {
  episode: IMetadata;
  episodeLinks: EpisodeLinks;
}

const Player: React.FC<IProps> = ({ episode, episodeLinks }) => {
  const player = useRef<MediaPlayerInstance>(null);
  const [srcId, setSrcId] = useState<string>("tuaa");
  const [src, setSrc] = useState<PlayerSrc>("");
  const [directResolutionWidth, setDirectResolutionWidth] = useState(0);

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

  useEffect(() => {
    switch (srcId) {
      case "tuaa": {
        setSrc(episodeLinks.hls);
        break;
      }
      case "youtube":
        {
          const source = episode.externalSources?.find((source) => source.type === "youtube") as IYouTubeSource;
          if (source) {
            setSrc(`youtube/${source.youtubeId}`);
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
          if (directResolutionWidth) {
            const resolution = source.resolutions.find((res) => res.width === directResolutionWidth);
            if (resolution) {
              setSrc(resolution.src);
              setTimeout(() => {
                if (player.current) {
                  player.current.play();
                }
              }, 1000);
            } else {
              setDirectResolutionWidth(source.resolutions[0].width);
            }
          } else {
            setDirectResolutionWidth(source.resolutions[0].width);
          }
        } else {
          setSrcId("tuaa");
        }
        break;
      }
    }
  }, [srcId, directResolutionWidth]);

  return (
    <>
      <MediaPlayer
        title={episode.title}
        playsInline
        src={src}
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
          <Poster className="vds-poster" src={episodeLinks.thumbnail} alt={`Thumbnail for ${episode.uaid}`} />
        </MediaProvider>

        <PlayerLayout
          episode={episode}
          srcId={srcId}
          switchSources={switchSources}
          currentResolutionWidth={directResolutionWidth}
          setResolutionWidth={setDirectResolutionWidth}
        />
      </MediaPlayer>
    </>
  );
};

export default Player;
