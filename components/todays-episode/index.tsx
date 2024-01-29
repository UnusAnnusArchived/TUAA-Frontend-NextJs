import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import moment from "moment-with-locales-es6";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import type { IVideo } from "../../src/types";

interface IProps {
  seasons: IVideo[][];
}

const formatter = (date: number) => moment(date).format("MM/DD");

const TodaysEpisode: React.FC<IProps> = ({ seasons }) => {
  const router = useRouter();
  const [todaysEpisodes, setTodaysEpisodes] = useState<IVideo[]>([]);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const videos: IVideo[] = [];
    for (let i = 0; i < seasons.length; i++) {
      videos.push(...seasons[i]);
    }

    const todaysDate = formatter(moment.now());
    const videosOnToday: IVideo[] = [];

    for (let i = 0; i < videos.length; i++) {
      if (formatter(videos[i].date) === todaysDate) {
        videosOnToday.push(videos[i]);
      }
    }

    setTodaysEpisodes(videosOnToday);
  }, []);

  return (
    <>
      {todaysEpisodes.map((episode) => {
        return (
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                router.push(
                  `/watch/s${episode.season.toString().padStart(2, "0")}.e${episode.episode
                    .toString()
                    .padStart(3, "0")}`
                );
              }}
            >
              <ListItemText
                primary={episode.title}
                secondary={`Video on ${moment(episode.date).format("MM/DD/YYYY")}`}
                primaryTypographyProps={{ sx: { overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" } }}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </>
  );
};

export default TodaysEpisode;
