import { Typography, Button, Stack, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { IVideo } from "../../src/types";
import DownloadPopupUI from "../download-popup-ui";
import SubtitlePopup from "../subtitlePopup";

interface IProps {
  video: IVideo;
}

const VideoDownloadOptions: React.FC<IProps> = ({ video }) => {
  const { t, i18n } = useTranslation();

  const [showSubtitlesPopup, setShowSubtitlesPopup] = useState(false);
  const [showVideoPopup, setShowVideoPopup] = useState(false);

  const downloadMetadata = () => {
    const element = document.createElement("a");
    element.setAttribute("href", `data:text/plain;charset=utf-8,${encodeURIComponent(JSON.stringify(video, null, 2))}`);
    element.setAttribute("download", `${video.title} Metadata.json`);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const downloadDescription = () => {
    const element = document.createElement("a");
    element.setAttribute("href", `data:text/plain;charset=utf-8,${encodeURIComponent(video.description)}`);
    element.setAttribute("download", `${video.title} Description.html`);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const downloadThumbnail = () => {
    fetch(video.thumbnail ?? video.posters[0].src)
      .then((res) => res.blob())
      .then((blob) => {
        const dataUrl = new FileReader();
        dataUrl.onload = function (e) {
          const url = e.target.result as string;
          const element = document.createElement("a");
          element.setAttribute("href", url);
          element.setAttribute("download", `${video.title} Thumbnail.jpg`);
          element.style.display = "none";
          document.body.appendChild(element);
          element.click();
          document.body.removeChild(element);
        };
        dataUrl.readAsDataURL(blob);
      });
  };

  const toggleSubtitlesPopup = () => {
    setShowSubtitlesPopup(!showSubtitlesPopup);
    setShowVideoPopup(false);
  };

  const toggleVideoPopup = () => {
    setShowVideoPopup(!showVideoPopup);
    setShowSubtitlesPopup(false);
  };

  return (
    <>
      <Typography variant="h6" component="h2" marginBottom="6px">
        {t("downloads:specificEpisode:downloadOptions:title")}
      </Typography>
      <Stack spacing={1} direction="column" justifyContent="center" alignItems="flex-start">
        <Button variant="contained" onClick={downloadMetadata}>
          Metadata
        </Button>
        <Button variant="contained" onClick={downloadDescription}>
          Description
        </Button>
        <Button variant="contained" onClick={downloadThumbnail}>
          Thumbnail
        </Button>
        <Button variant="contained" onClick={toggleSubtitlesPopup} disabled={!video.tracks || video.tracks.length < 1}>
          Subtitles
        </Button>
        <Button variant="contained" onClick={toggleVideoPopup}>
          Video
        </Button>
      </Stack>
      {showSubtitlesPopup && (
        <DownloadPopupUI>
          <SubtitlePopup video={video} />
        </DownloadPopupUI>
      )}
      {showVideoPopup && <h1>video</h1>}
    </>
  );
};

export default VideoDownloadOptions;
