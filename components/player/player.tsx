import React, { useEffect, useRef, useState } from "react";
import Plyr from "plyr";
import { IVideo } from "../../src/types";
import { cdn, api } from "../../src/endpoints.json";
import { Fade, Portal } from "@mui/material";
import styles from "../../styles/Player.module.scss";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import embedStyles from "../../styles/embed.module.scss";

interface IProps {
  video: IVideo;
  watchCode: string;
  isEmbed?: boolean;
  setShowDownloadOptions?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Player: React.FC<IProps> = ({ video, watchCode, isEmbed, setShowDownloadOptions }) => {
  const playerEl = useRef(null);
  const [plyr, setPlyr] = useState<Plyr>(null);
  const [customControlsContainer, setCustomControlsContainer] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const { t, i18n } = useTranslation();

  const posterUrl = video.posters?.length > 0 ? video.posters[0].src : video.thumbnail;
  const poster = `${cdn}${posterUrl}`;

  const router = useRouter();

  useEffect(() => {
    initPlayer();
  }, []);

  useEffect(() => {
    if (!plyr) return;
    if (plyr.playing) {
      try {
        plyr.stop();
      } catch (err) {}
    }
    plyr.source = {
      type: "video",
      title: video.title ?? "",
      poster,
      sources: video.sources?.map((source) => {
        return {
          ...source,
          src: `${cdn}${source.src}`,
        };
      }) ?? [{ src: `${cdn}${video.video}` }],
      tracks:
        video.tracks?.map((track) => {
          return { ...track, src: `${api}/subtitles?url=${track.src}` };
        }) ?? [],
      previewThumbnails: {
        enabled: true,
        src: `${api}/v2/preview/${watchCode}`,
      },
    };

    rebind(plyr);

    try {
      plyr.play();
    } catch (err) {}
  }, [router.query.v]);

  const initPlayer = () => {
    if (plyr) return;

    const player = new Plyr(playerEl.current, {
      controls: [
        "play-large",
        "play",
        "progress",
        "current-time",
        "mute",
        "volume",
        "captions",
        "settings",
        isEmbed ? "" : "download",
        "airplay",
        "fullscreen",
      ],
      ratio: isEmbed ? null : "16:9",
      i18n: {
        restart: t("player:restart"),
        rewind: t("player:rewind"),
        play: t("player:play"),
        pause: t("player:pause"),
        fastForward: t("player:fastForward"),
        seek: t("player:seek"),
        seekLabel: t("player:seekLabel"),
        played: t("player:played"),
        buffered: t("player:buffered"),
        currentTime: t("player:currentTime"),
        duration: t("player:duration"),
        volume: t("player:volume"),
        mute: t("player:mute"),
        unmute: t("player:unmute"),
        enableCaptions: t("player:enableCaptions"),
        disableCaptions: t("player:disableCaptions"),
        download: t("player:download"),
        enterFullscreen: t("player:enterFullscreen"),
        exitFullscreen: t("player:exitFullscreen"),
        frameTitle: t("player:frameTitle"),
        captions: t("player:captions"),
        settings: t("player:settings"),
        pip: t("player:pip"),
        menuBack: t("player:menuBack"),
        speed: t("player:speed"),
        normal: t("player:normal"),
        quality: t("player:quality"),
        loop: t("player:loop"),
        start: t("player:start"),
        end: t("player:end"),
        all: t("player:all"),
        reset: t("player:reset"),
        disabled: t("player:disabled"),
        enabled: t("player:enabled"),
        advertisement: t("player:advertisement"),
        qualityBadge: {
          2160: t("player:quality_badges:2160"),
          1440: t("player:quality_badges:1440"),
          1080: t("player:quality_badges:1080"),
          720: t("player:quality_badges:720"),
          480: t("player:quality_badges:480"),
          360: t("player:quality_badges:360"),
          240: t("player:quality_badges:240"),
        },
      },
      fullscreen: {
        iosNative: true,
      },
    });
    player.source = {
      type: "video",
      title: video.title ?? "",
      poster,
      sources: video.sources?.map((source) => {
        return {
          ...source,
          src: `${cdn}${source.src}`,
        };
      }) ?? [{ src: `${cdn}${video.video}`, type: "video/mp4" }],
      tracks:
        video.tracks?.map((track) => {
          return { ...track, src: `${api}/subtitles?url=${cdn}${track.src}` };
        }) ?? [],
      previewThumbnails: {
        enabled: true,
        src: `${api}/v2/preview/${watchCode}`,
      },
    };

    rebind(player);

    setPlyr(player);

    const playerContainer = document.getElementsByClassName("plyr")[0];

    if (isEmbed) {
      playerContainer.classList.add(embedStyles["embed-player"]);
    }

    const plyrDownloadBtn = document.querySelector('a[data-plyr="download"]') as HTMLAnchorElement;
    if (plyrDownloadBtn) {
      plyrDownloadBtn.addEventListener("click", (evt) => {
        evt.preventDefault();
        setShowDownloadOptions(true);
      });
    }

    /* Choice Bar */
    const container = document.createElement("div");
    container.id = "customControls";
    container.className = styles.customControls;
    playerContainer.appendChild(container);
    setCustomControlsContainer(container);
  };

  const rebind = (player: Plyr = plyr) => {
    player.off("timeupdate", setNewTime);
    player.on("timeupdate", setNewTime);
  };

  const setNewTime = (event: Plyr.PlyrEvent) => {
    setCurrentTime(event.detail.plyr.currentTime);
  };

  const [duration, setDuration] = useState(video.duration);

  useEffect(() => {
    if (!duration && playerEl.current) {
      setDuration(playerEl.current.duration);
    }
  }, []);

  return (
    <div>
      <video className="player" autoPlay ref={playerEl} />
      <Portal container={customControlsContainer}>
        <div>
          <Fade in={currentTime > duration - 10}>
            <div>{/* <NextEpisodeButton watchCode={watchCode} currentTime={currentTime} duration={duration} /> */}</div>
          </Fade>
        </div>
      </Portal>
    </div>
  );
};

export default Player;
