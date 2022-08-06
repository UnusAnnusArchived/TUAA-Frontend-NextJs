import ***REMOVED*** Typography, Button, Stack, FormControl, InputLabel, Select, MenuItem ***REMOVED*** from "@mui/material";
import ***REMOVED*** useState ***REMOVED*** from "react";
import ***REMOVED*** useTranslation ***REMOVED*** from "react-i18next";
import type ***REMOVED*** IVideo ***REMOVED*** from "../../src/types";
import DownloadPopupUI from "../download-popup-ui";
import SubtitlePopup from "../subtitlePopup";

interface IProps ***REMOVED***
  video: IVideo;
***REMOVED***

const VideoDownloadOptions: React.FC<IProps> = (***REMOVED*** video ***REMOVED***) => ***REMOVED***
  const ***REMOVED*** t, i18n ***REMOVED*** = useTranslation();

  const [showSubtitlesPopup, setShowSubtitlesPopup] = useState(false);
  const [showVideoPopup, setShowVideoPopup] = useState(false);

  const downloadMetadata = () => ***REMOVED***
    const element = document.createElement("a");
    element.setAttribute("href", `data:text/plain;charset=utf-8,$***REMOVED***encodeURIComponent(JSON.stringify(video, null, 2))***REMOVED***`);
    element.setAttribute("download", `$***REMOVED***video.title***REMOVED*** Metadata.json`);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
***REMOVED***;

  const downloadDescription = () => ***REMOVED***
    const element = document.createElement("a");
    element.setAttribute("href", `data:text/plain;charset=utf-8,$***REMOVED***encodeURIComponent(video.description)***REMOVED***`);
    element.setAttribute("download", `$***REMOVED***video.title***REMOVED*** Description.html`);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
***REMOVED***;

  const downloadThumbnail = () => ***REMOVED***
    fetch(video.thumbnail ?? video.posters[0].src)
      .then((res) => res.blob())
      .then((blob) => ***REMOVED***
        const dataUrl = new FileReader();
        dataUrl.onload = function (e) ***REMOVED***
          const url = e.target.result as string;
          const element = document.createElement("a");
          element.setAttribute("href", url);
          element.setAttribute("download", `$***REMOVED***video.title***REMOVED*** Thumbnail.jpg`);
          element.style.display = "none";
          document.body.appendChild(element);
          element.click();
          document.body.removeChild(element);
    ***REMOVED***;
        dataUrl.readAsDataURL(blob);
  ***REMOVED***);
***REMOVED***;

  const toggleSubtitlesPopup = () => ***REMOVED***
    setShowSubtitlesPopup(!showSubtitlesPopup);
    setShowVideoPopup(false);
***REMOVED***;

  const toggleVideoPopup = () => ***REMOVED***
    setShowVideoPopup(!showVideoPopup);
    setShowSubtitlesPopup(false);
***REMOVED***;

  return (
    <>
      <Typography variant="h6" component="h2" marginBottom="6px">
        ***REMOVED***t("downloads:specificEpisode:downloadOptions:title")***REMOVED***
      </Typography>
      <Stack spacing=***REMOVED***1***REMOVED*** direction="column" justifyContent="center" alignItems="flex-start">
        <Button variant="contained" onClick=***REMOVED***downloadMetadata***REMOVED***>
          Metadata
        </Button>
        <Button variant="contained" onClick=***REMOVED***downloadDescription***REMOVED***>
          Description
        </Button>
        <Button variant="contained" onClick=***REMOVED***downloadThumbnail***REMOVED***>
          Thumbnail
        </Button>
        <Button variant="contained" onClick=***REMOVED***toggleSubtitlesPopup***REMOVED*** disabled=***REMOVED***!video.tracks || video.tracks.length < 1***REMOVED***>
          Subtitles
        </Button>
        <Button variant="contained" onClick=***REMOVED***toggleVideoPopup***REMOVED***>
          Video
        </Button>
      </Stack>
      ***REMOVED***showSubtitlesPopup && (
        <DownloadPopupUI>
          <SubtitlePopup video=***REMOVED***video***REMOVED*** />
        </DownloadPopupUI>
      )***REMOVED***
      ***REMOVED***showVideoPopup && <h1>video</h1>***REMOVED***
    </>
  );
***REMOVED***;

export default VideoDownloadOptions;
