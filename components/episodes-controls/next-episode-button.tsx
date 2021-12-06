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
***REMOVED***

const NextEpisodeButton: React.FC<IProps> = (***REMOVED*** watchCode ***REMOVED***) => ***REMOVED***
  const ***REMOVED*** t ***REMOVED*** = useTranslation();

  const [autoplay, setAutoplay] = useRecoilState(autoplayAtom);

  const nextEpisodeWatchCode = getEpisodesAround(watchCode)?.nextEp;

  // if (!nextEpisodeWatchCode) ***REMOVED***
  //   return null;
  // ***REMOVED***

  setTimeout(() => ***REMOVED***
    // router.push(`/watch/$***REMOVED***nextEpisodeWatchCode***REMOVED***`);
***REMOVED*** 11000);

  return (
    <Link href=***REMOVED***`/watch/$***REMOVED***nextEpisodeWatchCode***REMOVED***`***REMOVED*** passHref>
      <Button
        variant="contained"
        color="primary"
        sx=***REMOVED******REMOVED*** pointerEvents: "auto" ***REMOVED******REMOVED***
        endIcon=***REMOVED***<SkipNextIcon />***REMOVED***
        className=***REMOVED***(() => ***REMOVED***
          // console.log(storage);
          return autoplay ? "autoplay-scroll" : "";
    ***REMOVED***)()***REMOVED***
      >
        ***REMOVED***t("player:nextEpisode")***REMOVED***
      </Button>
    </Link>
  );
***REMOVED***;

export default NextEpisodeButton;
