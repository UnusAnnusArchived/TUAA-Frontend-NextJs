import Button from "@mui/material/Button";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { localApi } from "../../src/endpoints";
import { IEpisodeAround } from "../../src/types";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { useTranslation } from "react-i18next";

interface IProps {
  watchCode: string;
}

const NextEpisodeButton: React.FC<IProps> = ({ watchCode }) => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    fetchNextEpisode();
  }, []);

  useEffect(() => {
    fetchNextEpisode();
  }, [watchCode]);

  const [nextEpWatchCode, setNextEpWatchCode] = useState<string>(null);

  const fetchNextEpisode = async () => {
    const response = await fetch(
      `${localApi}/episodes-around?episode=${watchCode}`
    );
    const data: IEpisodeAround = await response.json();
    setNextEpWatchCode(data.nextEp);
  };

  if (!nextEpWatchCode) {
    return null;
  }

  return (
    <Link href={`/watch/${nextEpWatchCode}`} passHref>
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
