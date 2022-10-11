import Button from "@mui/material/Button";
import Link from "next/link";
import React from "react";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import Fade from "@mui/material/Fade";
import Box from "@mui/system/Box";
import { useTranslation } from "react-i18next";
import getEpisodesAround from "../../src/utils/episodes-around";

interface IProps {
  watchCode: string;
  onDownloadPage?: boolean;
}

const EpisodesRow: React.FC<IProps> = ({ watchCode, onDownloadPage }) => {
  const { t, i18n } = useTranslation();

  const epsAround = getEpisodesAround(watchCode);

  const display = !!epsAround?.nextEp || !!epsAround?.prevEp;

  return (
    <Fade in={display} unmountOnExit>
      <div className="d-flex my-2">
        {epsAround?.prevEp && (
          <Link
            href={onDownloadPage ? `/downloads/specific-episode/${epsAround?.prevEp}` : `/watch/${epsAround?.prevEp}`}
            passHref
          >
            <Button color="primary" sx={{ pointerEvents: "auto" }} startIcon={<SkipPreviousIcon />}>
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
          <Link
            href={onDownloadPage ? `/downloads/specific-episode/${epsAround?.nextEp}` : `/watch/${epsAround?.nextEp}`}
            passHref
          >
            <Button color="primary" sx={{ pointerEvents: "auto" }} endIcon={<SkipNextIcon />}>
              {t("player:nextEpisode")}
            </Button>
          </Link>
        )}
      </div>
    </Fade>
  );
};

export default EpisodesRow;
