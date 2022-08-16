import ***REMOVED*** Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent ***REMOVED*** from "@mui/material";
import ***REMOVED*** useState ***REMOVED*** from "react";
import ***REMOVED*** cdn ***REMOVED*** from "../../src/endpoints";
import ***REMOVED*** IVideo ***REMOVED*** from "../../src/types";
import ProgressBar from "./progressBar";

interface IProps ***REMOVED***
  video: IVideo;
***REMOVED***

const VideoPopup: React.FC<IProps> = (***REMOVED*** video ***REMOVED***) => ***REMOVED***
  const [videoUrl, setVideoUrl] = useState<string>();
  const [downloadProgress, setDownloadProgress] = useState<number>(0);

  const handleChange = (event: SelectChangeEvent) => ***REMOVED***
    setVideoUrl(`$***REMOVED***cdn***REMOVED***$***REMOVED***event.target.value***REMOVED***`);
***REMOVED***;

  const download = async () => ***REMOVED***
    const res = await fetch(videoUrl);
    const reader = res.body.getReader();
    const contentLength = parseInt(res.headers.get("Content-Length"));
    let contentReceived = 0;
    let videoData = [];
    while (true) ***REMOVED***
      const ***REMOVED*** done, value ***REMOVED*** = await reader.read();
      if (done) ***REMOVED***
        let blob = new Blob(videoData, ***REMOVED*** type: "video/mp4" ***REMOVED***);
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = `$***REMOVED***video.title***REMOVED***.mp4`;
        a.click();
        URL.revokeObjectURL(a.href);
        break;
  ***REMOVED***
      videoData.push(value);
      contentReceived += value.length;
      setDownloadProgress((contentReceived / contentLength) * 100);
***REMOVED***
    // res.blob().then((blob) => ***REMOVED***
    //   const a = document.createElement("a");
    //   a.href = URL.createObjectURL(blob);
    //   a.download = `$***REMOVED***video.title***REMOVED***.mp4`;
    //   a.click();
    //   URL.revokeObjectURL(a.href);
    // ***REMOVED***);
***REMOVED***;

  return (
    <FormControl fullWidth>
      <InputLabel>Resolution</InputLabel>
      <Select label="Resolution" onChange=***REMOVED***handleChange***REMOVED***>
        ***REMOVED***video.sources.map((source) => ***REMOVED***
          return (
            <MenuItem key=***REMOVED***source.size***REMOVED*** value=***REMOVED***source.src***REMOVED***>
              ***REMOVED***source.size***REMOVED***p
            </MenuItem>
          );
    ***REMOVED***)***REMOVED***
      </Select>
      <div style=***REMOVED******REMOVED*** marginTop: 10, textAlign: "center" ***REMOVED******REMOVED***>
        <ProgressBar value=***REMOVED***downloadProgress***REMOVED*** />
        <Button style=***REMOVED******REMOVED*** marginTop: 10 ***REMOVED******REMOVED*** onClick=***REMOVED***download***REMOVED*** variant="contained" disabled=***REMOVED***videoUrl === undefined***REMOVED***>
          Download
        </Button>
      </div>
    </FormControl>
  );
***REMOVED***;

export default VideoPopup;
