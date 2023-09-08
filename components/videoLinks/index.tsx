import { ClickAwayListener, List, ListItem, ListItemButton, Paper, Popper } from "@mui/material";
import { IVideo } from "../../src/types";
import RandomEpisode from "../random-episode";
import TodaysEpisode from "../todays-episode";

interface IProps {
  anchor: React.MutableRefObject<SVGSVGElement> | boolean;
  setAnchor: React.Dispatch<React.SetStateAction<IProps["anchor"]>>;
  seasons: IVideo[][];
}

const VideoLinks: React.FC<IProps> = ({ anchor, setAnchor, seasons }) => {
  return (
    // @ts-ignore popper is being stupid
    <Popper
      open={!!anchor}
      anchorEl={(anchor as React.MutableRefObject<SVGSVGElement>).current}
      placement="bottom-end"
      sx={{ marginTop: "12px!important" }}
    >
      <Paper sx={{ maxWidth: "350px" }}>
        <List>
          <RandomEpisode seasons={seasons} />
          <TodaysEpisode seasons={seasons} />
        </List>
      </Paper>
    </Popper>
  );
};

export default VideoLinks;
