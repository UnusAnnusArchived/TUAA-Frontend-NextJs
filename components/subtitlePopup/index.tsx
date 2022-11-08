import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { cdn } from "../../src/endpoints.json";
import { IVideo } from "../../src/types";

interface IProps {
  video: IVideo;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const SubtitlePopup: React.FC<IProps> = ({ video, open, setOpen }) => {
  const [subtitleUrl, setSubtitleUrl] = useState<string>();

  const handleChange = (event: SelectChangeEvent) => {
    setSubtitleUrl(`${cdn}${event.target.value}`);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog fullWidth open={open} onClose={handleClose}>
      <DialogTitle>Subtitles</DialogTitle>
      <DialogContent>
        <FormControl fullWidth>
          <InputLabel>Language</InputLabel>
          <Select label="Language" onChange={handleChange}>
            {video.tracks?.map((subtitle) => {
              if (subtitle.kind === "captions") {
                return (
                  <MenuItem key={subtitle.srcLang} value={subtitle.src}>
                    {subtitle.label}
                  </MenuItem>
                );
              }
            })}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose} href={subtitleUrl} variant="contained" disabled={subtitleUrl === undefined}>
          Download
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SubtitlePopup;
