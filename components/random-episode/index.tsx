import { Button } from "@mui/material";
import Router from "next/router";
import type { IVideo } from "../../src/types";

interface IProps {
  seasons: IVideo[][];
}

const RandomEpisode: React.FC<IProps> = ({ seasons }) => {
  const handleClick = () => {
    const randomSeason = seasons[Math.floor(Math.random() * seasons.length)];
    const randomEpisode = randomSeason[Math.floor(Math.random() * randomSeason.length)];
    const id = `s${randomEpisode.season.toString().padStart(2, "0")}.e${randomEpisode.episode
      .toString()
      .padStart(3, "0")}`;

    console.log("Random episode:", id);
    Router.replace(`/watch/${id}`);
  };

  return <Button onClick={handleClick}>Random Episode</Button>;
};

export default RandomEpisode;
