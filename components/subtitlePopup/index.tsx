import ***REMOVED*** FormControl, InputLabel, MenuItem, Select, SelectChangeEvent ***REMOVED*** from "@mui/material";
import ***REMOVED*** useState ***REMOVED*** from "react";
import ***REMOVED*** IVideo ***REMOVED*** from "../../src/types";

interface IProps ***REMOVED***
  video: IVideo;
***REMOVED***

const SubtitlePopup: React.FC<IProps> = (***REMOVED*** video ***REMOVED***) => ***REMOVED***
  const [subtitleLanguage, setSubtitleLanguage] = useState("en");

  const handleChange = (event: SelectChangeEvent) => ***REMOVED***
    console.log(event.target);
    // setSubtitleLanguage(event.target.value as string);
***REMOVED***;

  return (
    <FormControl fullWidth>
      <InputLabel>Language</InputLabel>
      <Select label="Language" value=***REMOVED***subtitleLanguage ?? "ass"***REMOVED*** onChange=***REMOVED***handleChange***REMOVED***>
        ***REMOVED***video.tracks.map((subtitle) => ***REMOVED***
          return (
            <MenuItem key=***REMOVED***subtitle.srcLang***REMOVED*** value=***REMOVED***subtitle.srcLang***REMOVED***>
              ***REMOVED***subtitle.label***REMOVED***
            </MenuItem>
          );
    ***REMOVED***)***REMOVED***
      </Select>
    </FormControl>
  );
***REMOVED***;

export default SubtitlePopup;
