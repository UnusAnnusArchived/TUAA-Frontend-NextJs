import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import { cdn } from "../../src/endpoints";
import { IVideo } from "../../src/types";
import ProgressBar from "./progressBar";

interface IProps {
  video: IVideo;
}

const VideoPopup: React.FC<IProps> = ({ video }) => {
  const [videoUrl, setVideoUrl] = useState<string>();
  const [downloadProgress, setDownloadProgress] = useState<number>(0);

  const handleChange = (event: SelectChangeEvent) => {
    setVideoUrl(`${cdn}${event.target.value}`);
  };

  const download = async () => {
    const res = await fetch(videoUrl);
    const reader = res.body.getReader();
    const contentLength = parseInt(res.headers.get("Content-Length"));
    let contentReceived = 0;
    let videoData = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        let blob = new Blob(videoData, { type: "video/mp4" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = `${video.title}.mp4`;
        a.click();
        URL.revokeObjectURL(a.href);
        break;
      }
      videoData.push(value);
      contentReceived += value.length;
      setDownloadProgress((contentReceived / contentLength) * 100);
    }
    // res.blob().then((blob) => {
    //   const a = document.createElement("a");
    //   a.href = URL.createObjectURL(blob);
    //   a.download = `${video.title}.mp4`;
    //   a.click();
    //   URL.revokeObjectURL(a.href);
    // });
  };

  return (
    <FormControl fullWidth>
      <InputLabel>Resolution</InputLabel>
      <Select label="Resolution" onChange={handleChange}>
        {video.sources.map((source) => {
          return (
            <MenuItem key={source.size} value={source.src}>
              {source.size}p
            </MenuItem>
          );
        })}
      </Select>
      <div style={{ marginTop: 10, textAlign: "center" }}>
        <ProgressBar value={downloadProgress} />
        <Button style={{ marginTop: 10 }} onClick={download} variant="contained" disabled={videoUrl === undefined}>
          Download
        </Button>
      </div>
    </FormControl>
  );
};

export default VideoPopup;
