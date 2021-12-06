import Button from "@mui/material/Button";
import Link from "next/link";
import React, ***REMOVED*** useState, useEffect ***REMOVED*** from "react";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import ***REMOVED*** useTranslation ***REMOVED*** from "react-i18next";
import getEpisodesAround from "../../src/utils/episodes-around";
import router from "next/router";
import ***REMOVED*** autoplayAtom ***REMOVED*** from "../../src/atoms";
import ***REMOVED*** useRecoilState ***REMOVED*** from "recoil";

interface IProps ***REMOVED***
  watchCode: string;
  currentTime: number;
  duration: number;
***REMOVED***

const NextEpisodeButton: React.FC<IProps> = (***REMOVED*** watchCode, currentTime, duration ***REMOVED***) => ***REMOVED***
  const ***REMOVED*** t ***REMOVED*** = useTranslation();

  const [autoplay, setAutoplay] = useRecoilState(autoplayAtom);

  const [startAutoplayCountdown, setStartAutoplayCountdown] = useState(false);

  const nextEpisodeWatchCode = getEpisodesAround(watchCode)?.nextEp;

  if (!nextEpisodeWatchCode) ***REMOVED***
    return null;
***REMOVED***

  if (currentTime > duration - 10 && startAutoplayCountdown === false) ***REMOVED***
    setStartAutoplayCountdown(true);
    setTimeout(() => ***REMOVED***
      router.push(`/watch/$***REMOVED***nextEpisodeWatchCode***REMOVED***`);
      setStartAutoplayCountdown(false);
  ***REMOVED*** 10000);
***REMOVED***

  return (
    <Link href=***REMOVED***`/watch/$***REMOVED***nextEpisodeWatchCode***REMOVED***`***REMOVED*** passHref>
      <Button
        variant="contained"
        color="primary"
        sx=***REMOVED******REMOVED*** pointerEvents: "auto" ***REMOVED******REMOVED***
        endIcon=***REMOVED***<SkipNextIcon />***REMOVED***
        className=***REMOVED***autoplay && startAutoplayCountdown ? "autoplay-scroll" : ""***REMOVED***
      >
        ***REMOVED***t("player:nextEpisode")***REMOVED***
      </Button>
    </Link>
  );
***REMOVED***;

export default NextEpisodeButton;
