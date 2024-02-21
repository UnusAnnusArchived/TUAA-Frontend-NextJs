"use client";

import { IBunnySource, IMetadata } from "@/zodTypes";
import getBunnyEpisode from "@/tools/getBunnyEpisode";
import getBunnyEpisodeLinks, { EpisodeLinks } from "@/tools/getBunnyEpisodeLink";
import { Paper, Typography, useTheme } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Video } from "bunny-stream";
import Image from "next/image";
import EpisodeThumbnail from "./thumbnail";
import EpisodeLinkLoading from "./loading";
import moment from "moment-with-locales-es6";
import Link from "next/link";
import styles from "./styles.module.scss";
import { T } from "@tolgee/react";
import { useRecoilState } from "recoil";
import { useInViewport } from "react-in-viewport";
import { tolgee } from "@/tolgee/client";

export interface IProps {
  episode: IMetadata;
  elevation?: number;
  showSeason?: boolean;
  initialBunnyEpisode?: Video;
}

const EpisodeLink: React.FC<IProps> = ({ episode, elevation, showSeason, initialBunnyEpisode }) => {
  const [bunnyEpisode, setBunnyEpisode] = useState<Video | undefined>(initialBunnyEpisode);
  const [episodeLinks, setEpisodeLinks] = useState<EpisodeLinks>();
  const ref = useRef<HTMLAnchorElement>(null);
  const { inViewport } = useInViewport(ref);
  const theme = useTheme();
  const language = tolgee.getLanguage() ?? "en";
  console.log(language);

  useEffect(() => {
    if (inViewport && (!bunnyEpisode || !episodeLinks)) {
      const abortController = new AbortController();

      (async () => {
        if (bunnyEpisode) {
          const newEpisodeLinks = getBunnyEpisodeLinks(bunnyEpisode);

          setEpisodeLinks(newEpisodeLinks);
        } else {
          const bunnySource = episode.sources.find((source) => source.type === "bunny")! as IBunnySource;

          const newBunnyEpisode = await getBunnyEpisode(bunnySource.bunnyId, {
            signal: abortController.signal,
          });

          const newEpisodeLinks = getBunnyEpisodeLinks(newBunnyEpisode);

          setBunnyEpisode(newBunnyEpisode);
          setEpisodeLinks(newEpisodeLinks);
        }
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
          {moment(episode.releaseDate).locale(language).format("Do MMM YYYY")}
        </Typography>
      </Paper>
    </Link>
  );
};

export default EpisodeLink;
