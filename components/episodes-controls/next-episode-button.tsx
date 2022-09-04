import Button from "@mui/material/Button";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { useTranslation } from "react-i18next";
import getEpisodesAround from "../../src/utils/episodes-around";
import router from "next/router";
import { autoplayAtom } from "../../src/atoms";
import { useRecoilState } from "recoil";

interface IProps {
  watchCode: string;
  currentTime: number;
  duration: number;
}

const NextEpisodeButton: React.FC<IProps> = ({ watchCode, currentTime, duration }) => {
  const { t } = useTranslation();

  const [autoplay, setAutoplay] = useRecoilState(autoplayAtom);

  const [startAutoplayCountdown, setStartAutoplayCountdown] = useState(false);

  const nextEpisodeWatchCode = getEpisodesAround(watchCode)?.nextEp;

  if (!nextEpisodeWatchCode) {
    return null;
  }

  if (currentTime > duration - 10 && startAutoplayCountdown === false) {
    setStartAutoplayCountdown(true);
    setTimeout(() => {
      router.push(`/watch/${nextEpisodeWatchCode}`);
      setStartAutoplayCountdown(false);
    }, 10000);
  }

  return (
    <Link href={`/watch/${nextEpisodeWatchCode}`} passHref>
      <Button
        variant="contained"
        color="primary"
        sx={{ pointerEvents: "auto" }}
        endIcon={<SkipNextIcon />}
        className={autoplay && startAutoplayCountdown ? "autoplay-scroll" : ""}
      >
        {t("player:nextEpisode")}
      </Button>
    </Link>
  );
};

export default NextEpisodeButton;
