import Button from "@mui/material/Button";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import Fade from "@mui/material/Fade";
import Box from "@mui/system/Box";
import { useTranslation } from "react-i18next";
import getEpisodesAround from "../../src/utils/episodes-around";

interface IProps {
  watchCode: string;
}

const EpisodesRow: React.FC<IProps> = ({ watchCode }) => {
  const { t, i18n } = useTranslation();

  const epsAround = getEpisodesAround(watchCode);

  const display = !!epsAround?.nextEp || !!epsAround?.prevEp;

  return (
    <Fade in={display} unmountOnExit>
      <div className="d-flex my-2">
        {epsAround?.prevEp && (
          <Link href={`/watch/${epsAround?.prevEp}`} passHref>
            <Button
              color="primary"
              sx={{ pointerEvents: "auto" }}
              startIcon={<SkipPreviousIcon />}
            >
              {t("player:previousEpisode")}
            </Button>
          </Link>
        )}
        <Box
          sx={{
            flexGrow: 1,
          }}
        />
        {epsAround?.nextEp && (
          <Link href={`/watch/${epsAround?.nextEp}`} passHref>
            <Button
              color="primary"
              sx={{ pointerEvents: "auto" }}
              endIcon={<SkipNextIcon />}
            >
              {t("player:nextEpisode")}
            </Button>
          </Link>
        )}
      </div>
    </Fade>
  );
};

export default EpisodesRow;
