import Button from "@mui/material/Button";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { localApi } from "../../src/endpoints";
import { IEpisodeAround } from "../../src/types";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import Fade from "@mui/material/Fade";
import Box from "@mui/system/Box";

interface IProps {
  watchCode: string;
}

const EpisodesRow: React.FC<IProps> = ({ watchCode }) => {
  useEffect(() => {
    fetchNextEpisode();
  }, []);

  useEffect(() => {
    fetchNextEpisode();
  }, [watchCode]);

  const [nextEpWatchCode, setNextEpWatchCode] = useState<string>(null);
  const [prevEpWatchCode, setPrevEpWatchCode] = useState<string>(null);

  const fetchNextEpisode = async () => {
    const response = await fetch(
      `${localApi}/episodes-around?episode=${watchCode}`
    );
    const data: IEpisodeAround = await response.json();
    setNextEpWatchCode(data.nextEp);
    setPrevEpWatchCode(data.prevEp);
  };

  const display = !!nextEpWatchCode || !!prevEpWatchCode;

  return (
    <Fade in={display} unmountOnExit>
      <div className="d-flex my-2">
        {prevEpWatchCode && (
          <Link href={`/watch/${prevEpWatchCode}`} passHref>
            <Button
              color="primary"
              sx={{ pointerEvents: "auto" }}
              startIcon={<SkipPreviousIcon />}
            >
              Previous episode
            </Button>
          </Link>
        )}
        <Box
          sx={{
            flexGrow: 1,
          }}
        />
        {nextEpWatchCode && (
          <Link href={`/watch/${nextEpWatchCode}`} passHref>
            <Button
              color="primary"
              sx={{ pointerEvents: "auto" }}
              endIcon={<SkipNextIcon />}
            >
              Next episode
            </Button>
          </Link>
        )}
      </div>
    </Fade>
  );
};

export default EpisodesRow;
