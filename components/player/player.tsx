import React, ***REMOVED*** useEffect, useRef, useState ***REMOVED*** from "react";
import Plyr from "plyr";
import ***REMOVED*** IVideo ***REMOVED*** from "../../src/types";
import ***REMOVED*** cdn, endpoint, localApi ***REMOVED*** from "../../src/endpoints";
import ***REMOVED*** Fade, Portal ***REMOVED*** from "@mui/material";
import styles from "../../styles/Player.module.scss";
import ***REMOVED*** useRouter ***REMOVED*** from "next/router";
import ***REMOVED*** NextEpisodeButton ***REMOVED*** from "../episodes-controls";
import ***REMOVED*** useTranslation ***REMOVED*** from "react-i18next";
import embedStyles from "../../styles/embed.module.scss";

interface IProps ***REMOVED***
  video: IVideo;
  watchCode: string;
  isEmbed?: boolean;
  setShowDownloadOptions: React.Dispatch<React.SetStateAction<boolean>>;
***REMOVED***

const Player: React.FC<IProps> = (***REMOVED*** video, watchCode, isEmbed, setShowDownloadOptions ***REMOVED***) => ***REMOVED***
  const playerEl = useRef(null);
  const [plyr, setPlyr] = useState<Plyr>(null);
  const [customControlsContainer, setCustomControlsContainer] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const ***REMOVED*** t, i18n ***REMOVED*** = useTranslation();

  const posterUrl = video.posters?.length > 0 ? video.posters[0].src : video.thumbnail;
  const poster = `$***REMOVED***cdn***REMOVED***$***REMOVED***posterUrl***REMOVED***`;

  const router = useRouter();

  useEffect(() => ***REMOVED***
    initPlayer();
***REMOVED*** []);

  useEffect(() => ***REMOVED***
    if (!plyr) return;
    if (plyr.playing) ***REMOVED***
      try ***REMOVED***
        plyr.stop();
  ***REMOVED*** catch (err) ***REMOVED******REMOVED***
***REMOVED***
    plyr.source = ***REMOVED***
      type: "video",
      title: video.title ?? "",
      poster,
      sources: video.sources?.map((source) => ***REMOVED***
        return ***REMOVED***
          ...source,
          src: `$***REMOVED***cdn***REMOVED***$***REMOVED***source.src***REMOVED***`,
    ***REMOVED***;
  ***REMOVED***) ?? [***REMOVED*** src: `$***REMOVED***cdn***REMOVED***$***REMOVED***video.video***REMOVED***` ***REMOVED***],
      tracks:
        video.tracks?.map((track) => ***REMOVED***
          return ***REMOVED*** ...track, src: `$***REMOVED***localApi***REMOVED***/subtitles?url=$***REMOVED***track.src***REMOVED***` ***REMOVED***;
    ***REMOVED***) ?? [],
      previewThumbnails: ***REMOVED***
        enabled: true,
        src: `$***REMOVED***endpoint***REMOVED***/v2/preview/$***REMOVED***watchCode***REMOVED***`,
    ***REMOVED***
***REMOVED***;

    rebind(plyr);

    try ***REMOVED***
      plyr.play();
***REMOVED*** catch (err) ***REMOVED******REMOVED***
***REMOVED*** [router.query.v]);

  const initPlayer = () => ***REMOVED***
    if (plyr) return;

    const player = new Plyr(playerEl.current, ***REMOVED***
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
      i18n: ***REMOVED***
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
        qualityBadge: ***REMOVED***
          2160: "4K",
          1440: "HD",
          1080: "HD",
          720: "HD",
          576: "SD",
          480: "SD",
      ***REMOVED***
    ***REMOVED***
      fullscreen: ***REMOVED***
        iosNative: true,
    ***REMOVED***
***REMOVED***);
    player.source = ***REMOVED***
      type: "video",
      title: video.title ?? "",
      poster,
      sources: video.sources?.map((source) => ***REMOVED***
        return ***REMOVED***
          ...source,
          src: `$***REMOVED***cdn***REMOVED***$***REMOVED***source.src***REMOVED***`,
    ***REMOVED***;
  ***REMOVED***) ?? [***REMOVED*** src: `$***REMOVED***cdn***REMOVED***$***REMOVED***video.video***REMOVED***`, type: "video/mp4" ***REMOVED***],
      tracks:
        video.tracks?.map((track) => ***REMOVED***
          return ***REMOVED*** ...track, src: `$***REMOVED***localApi***REMOVED***/subtitles?url=$***REMOVED***cdn***REMOVED***$***REMOVED***track.src***REMOVED***` ***REMOVED***;
    ***REMOVED***) ?? [],
      previewThumbnails: ***REMOVED***
        enabled: true,
        src: `$***REMOVED***endpoint***REMOVED***/v2/preview/$***REMOVED***watchCode***REMOVED***`,
    ***REMOVED***
***REMOVED***;

    rebind(player);

    setPlyr(player);

    const playerContainer = document.getElementsByClassName("plyr")[0];

    if (isEmbed) ***REMOVED***
      playerContainer.classList.add(embedStyles["embed-player"]);
***REMOVED***

    const plyrDownloadBtn = document.querySelector('a[data-plyr="download"]') as HTMLAnchorElement;
    plyrDownloadBtn.addEventListener("click", (evt) => ***REMOVED***
      evt.preventDefault();
      setShowDownloadOptions(true);
***REMOVED***);

    /* Choice Bar */
    const container = document.createElement("div");
    container.id = "customControls";
    container.className = styles.customControls;
    playerContainer.appendChild(container);
    setCustomControlsContainer(container);
***REMOVED***;

  const rebind = (player: Plyr = plyr) => ***REMOVED***
    player.off("timeupdate", setNewTime);
    player.on("timeupdate", setNewTime);
***REMOVED***;

  const setNewTime = (event: Plyr.PlyrEvent) => ***REMOVED***
    setCurrentTime(event.detail.plyr.currentTime);
***REMOVED***;

  const [duration, setDuration] = useState(video.duration);

  useEffect(() => ***REMOVED***
    if (!duration && playerEl.current) ***REMOVED***
      setDuration(playerEl.current.duration);
***REMOVED***
***REMOVED*** []);

  return (
    <div>
      <video className="player" autoPlay ref=***REMOVED***playerEl***REMOVED*** />
      <Portal container=***REMOVED***customControlsContainer***REMOVED***>
        <div>
          <Fade in=***REMOVED***currentTime > duration - 10***REMOVED***>
            <div>***REMOVED***/* <NextEpisodeButton watchCode=***REMOVED***watchCode***REMOVED*** currentTime=***REMOVED***currentTime***REMOVED*** duration=***REMOVED***duration***REMOVED*** /> */***REMOVED***</div>
          </Fade>
        </div>
      </Portal>
    </div>
  );
***REMOVED***;

export default Player;
