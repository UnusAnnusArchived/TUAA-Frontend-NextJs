"use client";

import { IMetadata } from "@/zodTypes";
import { Tab, Tabs } from "@mui/material";
import { useState } from "react";
import EpisodesList from "../EpisodesList";
import { useRecoilState } from "recoil";
import { T } from "@tolgee/react";

interface IProps {
  seasons: IMetadata[][];
  initialSeason: number;
}

const SeasonSwitcher: React.FC<IProps> = ({ seasons, initialSeason }) => {
  const [currentSeason, setCurrentSeason] = useState(initialSeason);

  const handleChange = (evt: React.SyntheticEvent, newValue: number) => {
    const url = new URL(location.toString());
    url.searchParams.set("season", newValue.toString());
    history.pushState({}, "", url);

    setCurrentSeason(newValue);
  };

  return (
    <>
      <div style={{ display: "flex", width: "100%" }}>
        <div style={{ flexGrow: 1 }} />
        <div style={{ flexGrow: 1 }}>
          <Tabs value={currentSeason} onChange={handleChange} centered>
            {seasons.map((_, i) => {
              return (
                <Tab
                  key={i}
                  label={
                    i === 0 ? (
                      <T keyName="episodeLink.specials" />
                    ) : (
                      <T keyName="episodeLink.season" params={{ season: i.toString() }} />
                    )
                  }
                  value={i}
                />
              );
            })}
          </Tabs>
        </div>
        <div style={{ flexGrow: 1 }} />
      </div>
      <EpisodesList episodes={seasons[currentSeason]} />
    </>
  );
};

export default SeasonSwitcher;
