import { LoadingButton } from "@mui/lab";
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
import { cdn } from "../../src/endpoints";
import { IVideo } from "../../src/types";
import ProgressBar from "./progressBar";

interface IProps {
  video: IVideo;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const VideoPopup: React.FC<IProps> = ({ video, open, setOpen }) => {
  const [videoUrl, setVideoUrl] = useState<string>();
  const [downloading, setDownloading] = useState(false);
  const [filesize, setFilesize] = useState<number>();
  const [recievedFilesize, setRecievedFilesize] = useState<number>();
  const [err, setErr] = useState();

  const handleChange = (event: SelectChangeEvent) => {
    setVideoUrl(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
    setVideoUrl(undefined);
    setDownloading(false);
    setFilesize(undefined);
    setRecievedFilesize(undefined);
  };

  const download = async () => {
    try {
      setDownloading(true);
      const res = await fetch(videoUrl);
      const reader = res.body.getReader();
      const contentLength = parseInt(res.headers.get("Content-Length"));
      setFilesize(contentLength);
      let contentReceived = 0;
      let videoData = [];
      while (true) {
        const { done, value } = await reader.read();
        // if (!downloading) {
        //   reader.cancel();
        //   break;
        // }
        if (done) {
          setVideoUrl("");
          setDownloading(false);
          setFilesize(undefined);
          setRecievedFilesize(undefined);
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
        setRecievedFilesize(contentReceived);
      }
    } catch (error) {
      setErr(error);
    }
  };

  return (
    <Dialog fullWidth open={open} onClose={handleClose}>
      <DialogTitle>Video</DialogTitle>
      <DialogContent>
      <FormControl fullWidth>
          <InputLabel>Resolution</InputLabel>
          <Select label="Resolution" value={videoUrl} onChange={handleChange}>
            {video.sources.map((source) => {
              return (
                <MenuItem key={source.size} value={`${cdn}${source.src}`}>
                  {source.size}p
                </MenuItem>
              );
            })}
          </Select>
          <div style={{ marginTop: 10, textAlign: "center" }}>
            {downloading && <ProgressBar value={(recievedFilesize / filesize) * 100} />}
          </div>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <LoadingButton
          style={{ paddingRight: downloading ? 40 : undefined }}
          onClick={download}
          loading={downloading}
          loadingPosition="end"
          variant="contained"
        >
          {downloading
            ? `${Math.round(recievedFilesize / 1000) / 100}MB/${Math.round(filesize / 1000) / 100}MB`
            : "Download"}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default VideoPopup;
