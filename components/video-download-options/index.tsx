import { Typography, Button, Stack } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { IVideo } from "../../src/types";
import SubtitlePopup from "../subtitlePopup";
import VideoPopup from "../videoPopup";
import { cdn } from "../../src/endpoints.json";

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
    element.setAttribute("download", `${video.title} ${t("downloads:specific_episode_page:options:metadata")}.json`);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const downloadDescription = () => {
    const element = document.createElement("a");
    element.setAttribute("href", `data:text/plain;charset=utf-8,${encodeURIComponent(video.description)}`);
    element.setAttribute("download", `${video.title} ${t("downloads:specific_episode_page:options:description")}.html`);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const downloadThumbnail = () => {
    fetch(`${cdn}${video.thumbnail ?? video.posters[0].src}`)
      .then((res) => res.blob())
      .then((blob) => {
        const dataUrl = new FileReader();
        dataUrl.onload = function (e) {
          const url = e.target.result as string;
          const element = document.createElement("a");
          element.setAttribute("href", url);
          element.setAttribute(
            "download",
            `${video.title} ${t("downloads:specific_episode_page:options:thumbnail")}.webp`
          );
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
        {t("downloads:specific_episode_page:header")}
      </Typography>
      <Stack spacing={1} direction="column" justifyContent="center" alignItems="flex-start">
        <Button variant="contained" onClick={toggleVideoPopup}>
          {t("downloads:specific_episode_page:options:video")}
        </Button>
        <Button variant="contained" onClick={toggleSubtitlesPopup} disabled={!video.tracks || video.tracks.length < 1}>
          {t("downloads:specific_episode_page:options:subtitles")}
        </Button>
        <Button variant="contained" onClick={downloadThumbnail}>
          {t("downloads:specific_episode_page:options:thumbnail")}
        </Button>
        <Button variant="contained" onClick={downloadDescription}>
          {t("downloads:specific_episode_page:options:description")}
        </Button>
        <Button variant="contained" onClick={downloadMetadata}>
          {t("downloads:specific_episode_page:options:metadata")}
        </Button>
      </Stack>

      <SubtitlePopup video={video} open={showSubtitlesPopup} setOpen={setShowSubtitlesPopup} />
      <VideoPopup video={video} open={showVideoPopup} setOpen={setShowVideoPopup} />
    </>
  );
};

export default VideoDownloadOptions;
