"use client";

import { IMetadata } from "@/zodTypes";
import EpisodeLink from "../EpisodeLink";
import { useMediaQuery, useTheme } from "@mui/material";
import EpisodeLinkLoading from "../EpisodeLink/loading";

interface IProps {
  episodes: IMetadata[];
  loadingEpisodes?: boolean;
  elevation?: number;
  showSeason?: boolean;
}

const EpisodesList: React.FC<IProps> = ({ episodes, loadingEpisodes, elevation, showSeason }) => {
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div style={{ margin: "1rem 0 1rem 1rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      {loadingEpisodes
        ? new Array(12).fill("").map((_, i) => {
            return (
              <div style={{ width: isMdDown ? "calc(100% - 1rem)" : "calc((100%/3) - 1rem)" }} key={i}>
                <EpisodeLinkLoading />
              </div>
            );
          })
        : episodes.map((episode, i) => {
            return (
              <div
                style={{ width: isMdDown ? "calc(100% - 1rem)" : "calc((100%/3) - 1rem)" }}
                key={`s${episode.season.toString().padStart(2, "0")}.e${episode.episode.toString().padStart(3, "0")}`}
              >
                <EpisodeLink episode={episode} elevation={elevation} showSeason={showSeason} />
              </div>
            );
          })}
    </div>
  );
};

export default EpisodesList;
