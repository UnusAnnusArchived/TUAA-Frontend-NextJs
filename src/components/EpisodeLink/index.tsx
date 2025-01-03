"use client";

import { IMetadata } from "@/zodTypes";
import { EpisodeLinks } from "@/tools/getEpisodeLinks";
import { Paper, Typography, useTheme } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import EpisodeThumbnail from "./thumbnail";
import Link from "next/link";
import styles from "./styles.module.scss";
import { T } from "@tolgee/react";
import { useInViewport } from "react-in-viewport";
import getEpisodeLinks from "@/tools/getEpisodeLinks";
import MomentClientLocale from "../momentClientLocale";

export interface IProps {
  episode: IMetadata;
  elevation?: number;
  showSeason?: boolean;
}

const EpisodeLink: React.FC<IProps> = ({ episode, elevation, showSeason }) => {
  const [episodeLinks, setEpisodeLinks] = useState<EpisodeLinks>();
  const ref = useRef<HTMLAnchorElement>(null);
  const { inViewport } = useInViewport(ref);
  const theme = useTheme();

  useEffect(() => {
    if (inViewport && !episodeLinks) {
      const abortController = new AbortController();

      (async () => {
        const newEpisodeLinks = getEpisodeLinks(episode.uaid);

        setEpisodeLinks(newEpisodeLinks);
      })();

      return () => {
        abortController.abort();
      };
    }
  }, [inViewport]);

  return (
    <Link href={`/watch/${episode.uaid}`} ref={ref} className={styles.link} style={{ textDecoration: "none" }}>
      <Paper sx={{ padding: "1rem", height: "100%" }} elevation={elevation}>
        <EpisodeThumbnail episode={episode} episodeLinks={episodeLinks} />
        <Typography variant="h6" component="h2">
          {episode.title}
        </Typography>
        <Typography
          variant="body2"
          color={theme.palette.mode === "dark" ? theme.palette.grey[400] : theme.palette.grey[700]}
        >
          {showSeason
            ? [
                episode.season === 0 ? (
                  <T keyName="episodeLink.specials" />
                ) : (
                  <T keyName="episodeLink.season" params={{ season: episode.season.toString() }} />
                ),
                ", ",
              ]
            : ""}
          <T keyName="episodeLink.episode" params={{ episode: episode.episode.toString() }} /> -{" "}
          <MomentClientLocale date={episode.releaseDate} type="format" format="Do MMM YYYY" />
        </Typography>
      </Paper>
    </Link>
  );
};

export default EpisodeLink;
