import Button from "@mui/material/Button";
import Link from "next/link";
import React, ***REMOVED*** useEffect, useState ***REMOVED*** from "react";
import ***REMOVED*** localApi ***REMOVED*** from "../../src/endpoints";
import ***REMOVED*** IEpisodeAround ***REMOVED*** from "../../src/types";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import Fade from "@mui/material/Fade";
import Box from "@mui/system/Box";
import ***REMOVED*** useTranslation ***REMOVED*** from "react-i18next";

interface IProps ***REMOVED***
  watchCode: string;
***REMOVED***

const EpisodesRow: React.FC<IProps> = (***REMOVED*** watchCode ***REMOVED***) => ***REMOVED***
  const ***REMOVED*** t, i18n ***REMOVED*** = useTranslation();

  useEffect(() => ***REMOVED***
    fetchNextEpisode();
***REMOVED*** []);

  useEffect(() => ***REMOVED***
    fetchNextEpisode();
***REMOVED*** [watchCode]);

  const [nextEpWatchCode, setNextEpWatchCode] = useState<string>(null);
  const [prevEpWatchCode, setPrevEpWatchCode] = useState<string>(null);

  const fetchNextEpisode = async () => ***REMOVED***
    const response = await fetch(
      `$***REMOVED***localApi***REMOVED***/episodes-around?episode=$***REMOVED***watchCode***REMOVED***`
    );
    const data: IEpisodeAround = await response.json();
    setNextEpWatchCode(data.nextEp);
    setPrevEpWatchCode(data.prevEp);
***REMOVED***;

  const display = !!nextEpWatchCode || !!prevEpWatchCode;

  return (
    <Fade in=***REMOVED***display***REMOVED*** unmountOnExit>
      <div className="d-flex my-2">
        ***REMOVED***prevEpWatchCode && (
          <Link href=***REMOVED***`/watch/$***REMOVED***prevEpWatchCode***REMOVED***`***REMOVED*** passHref>
            <Button
              color="primary"
              sx=***REMOVED******REMOVED*** pointerEvents: "auto" ***REMOVED******REMOVED***
              startIcon=***REMOVED***<SkipPreviousIcon />***REMOVED***
            >
              ***REMOVED***t("player:previousEpisode")***REMOVED***
            </Button>
          </Link>
        )***REMOVED***
        <Box
          sx=***REMOVED******REMOVED***
            flexGrow: 1,
      ***REMOVED******REMOVED***
        />
        ***REMOVED***nextEpWatchCode && (
          <Link href=***REMOVED***`/watch/$***REMOVED***nextEpWatchCode***REMOVED***`***REMOVED*** passHref>
            <Button
              color="primary"
              sx=***REMOVED******REMOVED*** pointerEvents: "auto" ***REMOVED******REMOVED***
              endIcon=***REMOVED***<SkipNextIcon />***REMOVED***
            >
              ***REMOVED***t("player:nextEpisode")***REMOVED***
            </Button>
          </Link>
        )***REMOVED***
      </div>
    </Fade>
  );
***REMOVED***;

export default EpisodesRow;
