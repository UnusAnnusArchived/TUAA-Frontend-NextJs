import { ListItem, ListItemButton } from "@mui/material";
import { useRouter } from "next/router";
import type { IVideo } from "../../src/types";

interface IProps {
  seasons: IVideo[][];
}

const RandomEpisode: React.FC<IProps> = ({ seasons }) => {
  const router = useRouter();

  const handleClick = () => {
    const randomSeason = seasons[Math.floor(Math.random() * seasons.length)];
    const randomEpisode = randomSeason[Math.floor(Math.random() * randomSeason.length)];
    const id = `s${randomEpisode.season.toString().padStart(2, "0")}.e${randomEpisode.episode
      .toString()
      .padStart(3, "0")}`;

    router.push(`/watch/${id}`);
  };

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={handleClick}>Random Episode</ListItemButton>
    </ListItem>
  );
};

export default RandomEpisode;
