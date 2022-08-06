import Button from "@mui/material/Button";
import Link from "next/link";
import React, ***REMOVED*** useEffect, useState ***REMOVED*** from "react";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import Fade from "@mui/material/Fade";
import Box from "@mui/system/Box";
import ***REMOVED*** useTranslation ***REMOVED*** from "react-i18next";
import getEpisodesAround from "../../src/utils/episodes-around";

interface IProps ***REMOVED***
  watchCode: string;
  onDownloadPage?: boolean;
***REMOVED***

const EpisodesRow: React.FC<IProps> = (***REMOVED*** watchCode, onDownloadPage ***REMOVED***) => ***REMOVED***
  const ***REMOVED*** t, i18n ***REMOVED*** = useTranslation();

  const epsAround = getEpisodesAround(watchCode);

  const display = !!epsAround?.nextEp || !!epsAround?.prevEp;

  return (
    <Fade in=***REMOVED***display***REMOVED*** unmountOnExit>
      <div className="d-flex my-2">
        ***REMOVED***epsAround?.prevEp && (
          <Link
            href=***REMOVED***onDownloadPage ? `/downloads/specific-episode/$***REMOVED***epsAround?.prevEp***REMOVED***` : `/watch/$***REMOVED***epsAround?.prevEp***REMOVED***`***REMOVED***
            passHref
          >
            <Button color="primary" sx=***REMOVED******REMOVED*** pointerEvents: "auto" ***REMOVED******REMOVED*** startIcon=***REMOVED***<SkipPreviousIcon />***REMOVED***>
              ***REMOVED***t("player:previousEpisode")***REMOVED***
            </Button>
          </Link>
        )***REMOVED***
        <Box
          sx=***REMOVED******REMOVED***
            flexGrow: 1,
      ***REMOVED******REMOVED***
        />
        ***REMOVED***epsAround?.nextEp && (
          <Link
            href=***REMOVED***onDownloadPage ? `/downloads/specific-episode/$***REMOVED***epsAround?.nextEp***REMOVED***` : `/watch/$***REMOVED***epsAround?.nextEp***REMOVED***`***REMOVED***
            passHref
          >
            <Button color="primary" sx=***REMOVED******REMOVED*** pointerEvents: "auto" ***REMOVED******REMOVED*** endIcon=***REMOVED***<SkipNextIcon />***REMOVED***>
              ***REMOVED***t("player:nextEpisode")***REMOVED***
            </Button>
          </Link>
        )***REMOVED***
      </div>
    </Fade>
  );
***REMOVED***;

export default EpisodesRow;
