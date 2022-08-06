import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import { IVideo } from "../../src/types";

interface IProps {
  video: IVideo;
}

const SubtitlePopup: React.FC<IProps> = ({ video }) => {
  const [subtitleLanguage, setSubtitleLanguage] = useState("en");

  const handleChange = (event: SelectChangeEvent) => {
    console.log(event.target);
    // setSubtitleLanguage(event.target.value as string);
  };

  return (
    <FormControl fullWidth>
      <InputLabel>Language</InputLabel>
      <Select label="Language" value={subtitleLanguage ?? "ass"} onChange={handleChange}>
        {video.tracks.map((subtitle) => {
          return (
            <MenuItem key={subtitle.srcLang} value={subtitle.srcLang}>
              {subtitle.label}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default SubtitlePopup;
