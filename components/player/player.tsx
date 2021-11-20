import React, ***REMOVED*** useEffect, useRef, useState ***REMOVED*** from "react";
import Plyr from "plyr";
import ***REMOVED*** IVideo ***REMOVED*** from "../../src/types";
import ***REMOVED*** endpoint, localApi ***REMOVED*** from "../../src/endpoints";
import ***REMOVED*** Button, Fade, Portal ***REMOVED*** from "@mui/material";
import styles from "../../styles/Player.module.scss";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import Link from "next/link";
import ***REMOVED*** useRouter ***REMOVED*** from "next/router";
import ***REMOVED*** NextEpisodeButton ***REMOVED*** from "../episodes-controls";
// import ***REMOVED*** useTranslation ***REMOVED*** from 'react-i18next'

interface IProps ***REMOVED***
  video: IVideo;
  watchCode: string;
***REMOVED***

const Player: React.FC<IProps> = (***REMOVED*** video, watchCode ***REMOVED***) => ***REMOVED***
  const playerEl = useRef(null);
  const [plyr, setPlyr] = useState<Plyr>(null);
  const [customControlsContainer, setCustomControlsContainer] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  // const ***REMOVED*** t, i18n ***REMOVED*** = useTranslation()

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
      poster: video.thumbnail ?? video.posters[0].src,
      sources: video.sources,
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
        "airplay",
        "fullscreen",
      ],
      ratio: "16:9",
      // i18n is making s01.e001 not work and im not sure why
      // i18n: ***REMOVED***
      //   //theres probably a much more efficient way to do this but I don't have much time rn lmao
      //   restart: t('plyr:restart'),
      //   rewind: t('plyr:rewind'),
      //   play: t('plyr:play'),
      //   pause: t('plyr:pause'),
      //   fastForward: t('plyr:fastForward'),
      //   seek: t('plyr:seek'),
      //   seekLabel: t('plyr:seekLabel'),
      //   played: t('plyr:played'),
      //   buffered: t('plyr:buffered'),
      //   currentTime: t('plyr:currentTime'),
      //   duration: t('plyr:duration'),
      //   volume: t('plyr:volume'),
      //   mute: t('plyr:mute'),
      //   unmute: t('plyr:unmute'),
      //   enableCaptions: t('plyr:enableCaptions'),
      //   disableCaptions: t('plyr:disableCaptions'),
      //   download: t('plyr:download'),
      //   enterFullscreen: t('plyr:enterFullscreen'),
      //   exitFullscreen: t('plyr:exitFullscreen'),
      //   frameTitle: t('plyr:frameTitle'),
      //   captions: t('plyr:captions'),
      //   settings: t('plyr:settings'),
      //   pip: t('plyr:pip'),
      //   menuBack: t('plyr:menuBack'),
      //   speed: t('plyr:speed'),
      //   normal: t('plyr:normal'),
      //   quality: t('plyr:quality'),
      //   loop: t('plyr:loop'),
      //   start: t('plyr:start'),
      //   end: t('plyr:end'),
      //   all: t('plyr:all'),
      //   reset: t('plyr:reset'),
      //   disabled: t('plyr:disabled'),
      //   enabled: t('plyr:enabled'),
      //   advertisement: t('plyr:advertisement'),
      //   qualityBadge: ***REMOVED***
      //     2160: '4K',
      //     1440: 'HD',
      //     1080: 'HD',
      //     720: 'HD',
      //     576: 'SD',
      //     480: 'SD',
      // ***REMOVED***
      // ***REMOVED***
***REMOVED***);
    player.source = ***REMOVED***
      type: "video",
      title: video.title ?? "",
      poster: video.thumbnail ?? video.posters[0].src,
      sources: !!video.video
        ? [
            ***REMOVED***
              src: video.video,
              type: "video/mp4",
          ***REMOVED***
          ]
        : video.sources,
      tracks:
        video.tracks?.map((track) => ***REMOVED***
          return ***REMOVED*** ...track, src: `$***REMOVED***localApi***REMOVED***/subtitles?url=$***REMOVED***track.src***REMOVED***` ***REMOVED***;
    ***REMOVED***) ?? [],
      previewThumbnails: ***REMOVED***
        enabled: true,
        src: `$***REMOVED***endpoint***REMOVED***/v2/preview/$***REMOVED***watchCode***REMOVED***`,
    ***REMOVED***
***REMOVED***;

    rebind(player);

    setPlyr(player);

    const playerContainer = document.getElementsByClassName("plyr")[0];

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

  return (
    <div>
      <video className="player" autoPlay ref=***REMOVED***playerEl***REMOVED*** />
      <Portal container=***REMOVED***customControlsContainer***REMOVED***>
        <div>
          <Fade in=***REMOVED***currentTime > video.duration - 10***REMOVED***>
            <div>
              <NextEpisodeButton watchCode=***REMOVED***watchCode***REMOVED*** />
            </div>
          </Fade>
        </div>
      </Portal>
    </div>
  );
***REMOVED***;

export default Player;
