import Button from "@mui/material/Button";
import Link from "next/link";
import React from "react";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import ***REMOVED*** useTranslation ***REMOVED*** from "react-i18next";
import getEpisodesAround from "../../src/utils/episodes-around";

interface IProps ***REMOVED***
  watchCode: string;
***REMOVED***

const NextEpisodeButton: React.FC<IProps> = (***REMOVED*** watchCode ***REMOVED***) => ***REMOVED***
  const ***REMOVED*** t ***REMOVED*** = useTranslation();

  const nextEpisodeWatchCode = getEpisodesAround(watchCode)?.nextEp;

  if (!nextEpisodeWatchCode) ***REMOVED***
    return null;
***REMOVED***

  return (
    <Link href=***REMOVED***`/watch/$***REMOVED***nextEpisodeWatchCode***REMOVED***`***REMOVED*** passHref>
      <Button
        variant="contained"
        color="primary"
        sx=***REMOVED******REMOVED*** pointerEvents: "auto" ***REMOVED******REMOVED***
        endIcon=***REMOVED***<SkipNextIcon />***REMOVED***
      >
        ***REMOVED***t("player:nextEpisode")***REMOVED***
      </Button>
    </Link>
  );
***REMOVED***;

export default NextEpisodeButton;
