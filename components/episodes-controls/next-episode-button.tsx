import Button from "@mui/material/Button";
import Link from "next/link";
import React, ***REMOVED*** useEffect, useState ***REMOVED*** from "react";
import ***REMOVED*** localApi ***REMOVED*** from "../../src/endpoints";
import ***REMOVED*** IEpisodeAround ***REMOVED*** from "../../src/types";
import SkipNextIcon from "@mui/icons-material/SkipNext";

interface IProps ***REMOVED***
  watchCode: string;
***REMOVED***

const NextEpisodeButton: React.FC<IProps> = (***REMOVED*** watchCode ***REMOVED***) => ***REMOVED***
  useEffect(() => ***REMOVED***
    fetchNextEpisode();
***REMOVED*** []);

  useEffect(() => ***REMOVED***
    fetchNextEpisode();
***REMOVED*** [watchCode]);

  const [nextEpWatchCode, setNextEpWatchCode] = useState<string>(null);

  const fetchNextEpisode = async () => ***REMOVED***
    const response = await fetch(
      `$***REMOVED***localApi***REMOVED***/episodes-around?episode=$***REMOVED***watchCode***REMOVED***`
    );
    const data: IEpisodeAround = await response.json();
    setNextEpWatchCode(data.nextEp);
***REMOVED***;

  if (!nextEpWatchCode) ***REMOVED***
    return null;
***REMOVED***

  return (
    <Link href=***REMOVED***`/watch/$***REMOVED***nextEpWatchCode***REMOVED***`***REMOVED*** passHref>
      <Button
        variant="contained"
        color="primary"
        sx=***REMOVED******REMOVED*** pointerEvents: "auto" ***REMOVED******REMOVED***
        endIcon=***REMOVED***<SkipNextIcon />***REMOVED***
      >
        Next episode
      </Button>
    </Link>
  );
***REMOVED***;

export default NextEpisodeButton;
