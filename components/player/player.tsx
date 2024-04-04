import React, { useEffect, useMemo, useRef, useState } from "react";
import Plyr, { QualityOptions } from "plyr";
import { IVideo } from "../../src/types";
import { cdn, api } from "../../src/endpoints.json";
import { Fade, Portal } from "@mui/material";
import styles from "../../styles/Player.module.scss";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import embedStyles from "../../styles/embed.module.scss";
import Hls from "hls.js";

interface IProps {
  video: IVideo;
  watchCode: string;
  isEmbed?: boolean;
  setShowDownloadOptions?: React.Dispatch<React.SetStateAction<boolean>>;
  setPlayerHeight?: React.Dispatch<React.SetStateAction<number>>;
}

const Player: React.FC<IProps> = ({ video, watchCode, isEmbed, setShowDownloadOptions, setPlayerHeight }) => {
  const playerEl = useRef<HTMLVideoElement>(null);
  const [plyr, setPlyr] = useState<Plyr>(null);
  const [customControlsContainer, setCustomControlsContainer] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const { t, i18n } = useTranslation();

  const poster = `${cdn}/${video.uaid}/thumb.webp`;

  useEffect(() => {
    if (plyr?.elements?.container?.offsetHeight) {
      setPlayerHeight(plyr.elements.container.offsetHeight);
    }
  }, [plyr, plyr?.elements?.container, plyr?.elements?.container?.offsetHeight]);

  useEffect(() => {
    window?.addEventListener?.("resize", handlePlayerResize);

    return () => {
      window?.removeEventListener?.("resize", handlePlayerResize);
    };
  }, []);

  const handlePlayerResize = () => {
    if (plyr?.elements?.container?.offsetHeight) {
      setPlayerHeight(plyr.elements.container.offsetHeight);
    }
  };

  const router = useRouter();

  useEffect(() => {
    initPlayer();
  }, [router.asPath]);

  useEffect(() => {
    if (!plyr) return;
    if (plyr.playing) {
      try {
        plyr.stop();
      } catch (err) {}
    }

    rebind(plyr);

    try {
      plyr.play();
    } catch (err) {}
  }, [router.query.v]);

  const initPlayer = () => {
    const hls = new Hls();
    hls.loadSource(`${cdn}/${video.uaid}/index.m3u8`);
    hls.attachMedia(playerEl.current);
    (window as any).hls = hls;

    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      if (plyr) return;

      let quality: QualityOptions;

      if (Hls.isSupported()) {
        console.log(hls.levels);
        quality = {
          default: 0,
          options: [0, ...hls.levels.map((level) => level.height)],
          forced: true,
          // Manage quality changes
          onChange: (quality: number) => {
            for (let i = 0; i < hls.levels.length; i++) {
              if (quality === 0) {
                hls.currentLevel = -1;
              } else {
                const level = hls.levels[i];
                if (level.height === quality) {
                  hls.currentLevel = i;
                  break;
                }
              }
            }
          },
        };
      }

      const player = new Plyr(playerEl.current, {
        previewThumbnails: {
          src: `${cdn}/${video.uaid}/seek/seek.vtt`,
        },
        controls: [
          "play-large",
          "play",
          "progress",
          "current-time",
          "mute",
          "volume",
          "captions",
          "settings",
          // isEmbed ? "" : "download",
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
            0: "Auto",
          },
        },
        fullscreen: {
          iosNative: true,
        },
        quality,
      });
      player.source = {
        type: "video",
        title: video.title ?? "",
        poster,
        previewThumbnails: {
          src: `${cdn}/${video.uaid}/seek/seek.vtt`,
        },
        sources: !Hls.isSupported()
          ? [
              {
                src: `${cdn}/${video.uaid}/index.m3u8`,
              },
            ]
          : undefined,
      };

      player.on("play", () => {
        hls.startLoad();
      });

      player.on("qualitychange", () => {
        if (player.currentTime !== 0) {
          hls.startLoad();
        }
      });

      rebind(player);

      setPlyr(player);

      const playerContainer = document.getElementsByClassName("plyr")[0];

      if (isEmbed) {
        playerContainer.classList.add(embedStyles["embed-player"]);
      }

      // const plyrDownloadBtn = document.querySelector('a[data-plyr="download"]') as HTMLAnchorElement;
      // if (plyrDownloadBtn) {
      //   plyrDownloadBtn.addEventListener("click", (evt) => {
      //     evt.preventDefault();
      //     setShowDownloadOptions(true);
      //   });
      // }

      /* Choice Bar */
      const container = document.createElement("div");
      container.id = "customControls";
      container.className = styles.customControls;
      playerContainer.appendChild(container);
      setCustomControlsContainer(container);
    });

    hls.on(Hls.Events.LEVEL_SWITCHED, (evt, data) => {
      const span = document.querySelector(".plyr__menu__container [data-plyr='quality'][value='0'] span");
      const qualityOption = document.querySelector(
        "plyr_menu_container > div > div > div > button:nth-child(2) > span > span"
      );
      if (hls.autoLevelEnabled) {
        qualityOption.innerHTML = "Auto";
        span.innerHTML = `Auto<span class="plyr__menu__value"><span class="plyr__badge">${
          hls.levels[data.level].height
        }p</span></span>`;
      } else {
        span.innerHTML = "Auto";
      }
    });
  };

  const rebind = (player: Plyr = plyr) => {
    player.off("timeupdate", setNewTime);
    player.on("timeupdate", setNewTime);
  };

  const setNewTime = (event: Plyr.PlyrEvent) => {
    setCurrentTime(event.detail.plyr.currentTime);
  };

  // useEffect(() => {
  //   if (!duration && playerEl.current) {
  //     setDuration(playerEl.current.duration);
  //   }
  // }, []);

  return (
    <div style={{ flexGrow: 1 }}>
      <video id="player" className="player" autoPlay ref={playerEl} />
      {/* <Portal container={customControlsContainer}>
        <div>
          <Fade in={currentTime > duration - 10}>
            <div>{<NextEpisodeButton watchCode={watchCode} currentTime={currentTime} duration={duration} />}</div>
          </Fade>
        </div>
      </Portal> */}
    </div>
  );
};

export default Player;
