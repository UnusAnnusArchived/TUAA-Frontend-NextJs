import React, { useEffect, useRef, useState } from "react";
import Plyr from "plyr";
import { IVideo } from "../../src/types";
import { cdn, endpoint, localApi } from "../../src/endpoints";
import { Fade, Portal } from "@mui/material";
import styles from "../../styles/Player.module.scss";
import { useRouter } from "next/router";
import { NextEpisodeButton } from "../episodes-controls";
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
          return { ...track, src: `${localApi}/subtitles?url=${track.src}` };
        }) ?? [],
      previewThumbnails: {
        enabled: true,
        src: `${endpoint}/v2/preview/${watchCode}`,
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
        "download",
        "airplay",
        "fullscreen",
      ],
      ratio: isEmbed ? null : "16:9",
      i18n: {
        //theres probably a much more efficient way to do this but I don't have much time rn lmao
        restart: t("plyr:restart"),
        rewind: t("plyr:rewind"),
        play: t("plyr:play"),
        pause: t("plyr:pause"),
        fastForward: t("plyr:fastForward"),
        seek: t("plyr:seek"),
        seekLabel: t("plyr:seekLabel"),
        played: t("plyr:played"),
        buffered: t("plyr:buffered"),
        currentTime: t("plyr:currentTime"),
        duration: t("plyr:duration"),
        volume: t("plyr:volume"),
        mute: t("plyr:mute"),
        unmute: t("plyr:unmute"),
        enableCaptions: t("plyr:enableCaptions"),
        disableCaptions: t("plyr:disableCaptions"),
        download: t("plyr:download"),
        enterFullscreen: t("plyr:enterFullscreen"),
        exitFullscreen: t("plyr:exitFullscreen"),
        frameTitle: t("plyr:frameTitle"),
        captions: t("plyr:captions"),
        settings: t("plyr:settings"),
        pip: t("plyr:pip"),
        menuBack: t("plyr:menuBack"),
        speed: t("plyr:speed"),
        normal: t("plyr:normal"),
        quality: t("plyr:quality"),
        loop: t("plyr:loop"),
        start: t("plyr:start"),
        end: t("plyr:end"),
        all: t("plyr:all"),
        reset: t("plyr:reset"),
        disabled: t("plyr:disabled"),
        enabled: t("plyr:enabled"),
        advertisement: t("plyr:advertisement"),
        qualityBadge: {
          2160: "4K",
          1440: "HD",
          1080: "HD",
          720: "HD",
          576: "SD",
          480: "SD",
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
          return { ...track, src: `${localApi}/subtitles?url=${cdn}${track.src}` };
        }) ?? [],
      previewThumbnails: {
        enabled: true,
        src: `${endpoint}/v2/preview/${watchCode}`,
      },
    };

    rebind(player);

    setPlyr(player);

    const playerContainer = document.getElementsByClassName("plyr")[0];

    if (isEmbed) {
      playerContainer.classList.add(embedStyles["embed-player"]);
    }

    const plyrDownloadBtn = document.querySelector('a[data-plyr="download"]') as HTMLAnchorElement;
    plyrDownloadBtn.addEventListener("click", (evt) => {
      evt.preventDefault();
      setShowDownloadOptions(true);
    });

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
