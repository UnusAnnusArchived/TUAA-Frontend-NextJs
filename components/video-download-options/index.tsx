import { Typography, Button, Stack } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { IVideo } from "../../src/types";
import SubtitlePopup from "../subtitlePopup";
import VideoPopup from "../videoPopup";
import { cdn, download } from "../../src/endpoints.json";

interface IProps {
  video: IVideo;
}

const VideoDownloadOptions: React.FC<IProps> = ({ video }) => {
  const { t, i18n } = useTranslation();

  const [showSubtitlesPopup, setShowSubtitlesPopup] = useState(false);
  const [showVideoPopup, setShowVideoPopup] = useState(false);

  const downloadMetadata = () => {
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      `data:application/json;base64,${Buffer.from(JSON.stringify(video, null, 2)).toString("base64")}`
    );
    element.setAttribute("download", `${video.title} ${t("downloads:specific_episode_page:options:metadata")}.json`);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const downloadDescription = () => {
    const element = document.createElement("a");
    element.setAttribute("href", `data:text/html;base64,${Buffer.from(video.description).toString("base64")}`);
    element.setAttribute("download", `${video.title} ${t("downloads:specific_episode_page:options:description")}.html`);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const downloadThumbnail = () => {
    const url = `${download}${
      video.thumbnails?.jpg?.src ??
      video.posters?.find?.((poster) => poster.type === "image/jpeg")?.src ??
      video.thumbnail?.replace?.(".webp", ".jpg")
    }?filename=${encodeURIComponent(`${video.title} ${t("downloads:specific_episode_page:options:thumbnail")}.jpg`)}`;

    const element = document.createElement("a");
    element.setAttribute("target", "_blank");
    element.setAttribute("href", url);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
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
