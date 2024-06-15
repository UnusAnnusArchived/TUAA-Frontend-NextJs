"use client";

import { IMetadata } from "@/zodTypes";
import { SkipNext, SkipPrevious } from "@mui/icons-material";
import { T } from "@tolgee/react";
import { ToggleButton, Tooltip } from "@vidstack/react";
import { C } from "@vidstack/react/types/vidstack.js";
import { useRouter } from "next/navigation";

interface IProps {
  episode: IMetadata;
}

export const PreviousEpisode: React.FC<IProps> = ({ episode }) => {
  const router = useRouter();

  const handleClick = async () => {
    if (episode.episode === 1) {
      if (episode.season === 1) {
        const req = await fetch(`/api/lastSeasonEpisode?season=0`);
        if (req.status === 200) {
          const episode = await req.text();
          return router.push(`/watch/s00.e${episode}`);
        }

        throw req.statusText;
      }

      return;
    }

    return router.push(
      `/watch/s${episode.season.toString().padStart(2, "0")}.e${(episode.episode - 1).toString().padStart(3, "0")}`
    );
  };

  if (episode.season === 0 && episode.episode === 1) {
    return <></>;
  }

  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <ToggleButton onClick={handleClick} className="vds-button">
          <SkipPrevious className="vds-icon" />
        </ToggleButton>
      </Tooltip.Trigger>
      <Tooltip.Content className="vds-tooltip-content" placement="top start">
        <T keyName="vidstack.custom.previousEpisode" />
      </Tooltip.Content>
    </Tooltip.Root>
  );
};

export const NextEpisode: React.FC<IProps> = ({ episode }) => {
  const router = useRouter();

  const handleClick = async () => {
    if (episode.isLast) {
      if (episode.season === 0) {
        return router.push(`/watch/s01.e001`);
      }

      return;
    }

    return router.push(
      `/watch/s${episode.season.toString().padStart(2, "0")}.e${(episode.episode + 1).toString().padStart(3, "0")}`
    );
  };

  if (episode.isLast && episode.season === 1) {
    return <></>;
  }

  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <ToggleButton onClick={handleClick} className="vds-button">
          <SkipNext className="vds-icon" />
        </ToggleButton>
      </Tooltip.Trigger>
      <Tooltip.Content className="vds-tooltip-content" placement="top center">
        <T keyName="vidstack.custom.nextEpisode" />
      </Tooltip.Content>
    </Tooltip.Root>
  );
};
