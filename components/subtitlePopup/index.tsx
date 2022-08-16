import ***REMOVED*** Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent ***REMOVED*** from "@mui/material";
import ***REMOVED*** useState ***REMOVED*** from "react";
import ***REMOVED*** cdn ***REMOVED*** from "../../src/endpoints";
import ***REMOVED*** IVideo ***REMOVED*** from "../../src/types";

interface IProps ***REMOVED***
  video: IVideo;
***REMOVED***

const SubtitlePopup: React.FC<IProps> = (***REMOVED*** video ***REMOVED***) => ***REMOVED***
  const [subtitleUrl, setSubtitleUrl] = useState<string>();

  const handleChange = (event: SelectChangeEvent) => ***REMOVED***
    setSubtitleUrl(`$***REMOVED***cdn***REMOVED***$***REMOVED***event.target.value***REMOVED***`);
***REMOVED***;

  return (
    <FormControl fullWidth>
      <InputLabel>Language</InputLabel>
      <Select label="Language" onChange=***REMOVED***handleChange***REMOVED***>
        ***REMOVED***video.tracks.map((subtitle) => ***REMOVED***
          if (subtitle.kind === "captions") ***REMOVED***
            return (
              <MenuItem key=***REMOVED***subtitle.srcLang***REMOVED*** value=***REMOVED***subtitle.src***REMOVED***>
                ***REMOVED***subtitle.label***REMOVED***
              </MenuItem>
            );
      ***REMOVED***
    ***REMOVED***)***REMOVED***
      </Select>
      <div style=***REMOVED******REMOVED*** marginTop: 10, textAlign: "center" ***REMOVED******REMOVED***>
        <Button href=***REMOVED***subtitleUrl***REMOVED*** variant="contained" disabled=***REMOVED***subtitleUrl === undefined***REMOVED***>
          Download
        </Button>
      </div>
    </FormControl>
  );
***REMOVED***;

export default SubtitlePopup;
