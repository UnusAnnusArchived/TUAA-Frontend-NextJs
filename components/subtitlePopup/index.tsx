import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import { cdn } from "../../src/endpoints";
import { IVideo } from "../../src/types";

interface IProps {
  video: IVideo;
}

const SubtitlePopup: React.FC<IProps> = ({ video }) => {
  const [subtitleUrl, setSubtitleUrl] = useState<string>();

  const handleChange = (event: SelectChangeEvent) => {
    setSubtitleUrl(`${cdn}${event.target.value}`);
  };

  return (
    <FormControl fullWidth>
      <InputLabel>Language</InputLabel>
      <Select label="Language" onChange={handleChange}>
        {video.tracks.map((subtitle) => {
          if (subtitle.kind === "captions") {
            return (
              <MenuItem key={subtitle.srcLang} value={subtitle.src}>
                {subtitle.label}
              </MenuItem>
            );
          }
        })}
      </Select>
      <div style={{ marginTop: 10, textAlign: "center" }}>
        <Button href={subtitleUrl} variant="contained" disabled={subtitleUrl === undefined}>
          Download
        </Button>
      </div>
    </FormControl>
  );
};

export default SubtitlePopup;
