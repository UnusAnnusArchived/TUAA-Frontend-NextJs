import Button from "@mui/material/Button";
import Link from "next/link";
import React from "react";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { useTranslation } from "react-i18next";
import getEpisodesAround from "../../src/utils/episodes-around";

interface IProps {
  watchCode: string;
}

const NextEpisodeButton: React.FC<IProps> = ({ watchCode }) => {
  const { t } = useTranslation();

  const nextEpisodeWatchCode = getEpisodesAround(watchCode)?.nextEp;

  if (!nextEpisodeWatchCode) {
    return null;
  }

  return (
    <Link href={`/watch/${nextEpisodeWatchCode}`} passHref>
      <Button
        variant="contained"
        color="primary"
        sx={{ pointerEvents: "auto" }}
        endIcon={<SkipNextIcon />}
      >
        {t("player:nextEpisode")}
      </Button>
    </Link>
  );
};

export default NextEpisodeButton;
