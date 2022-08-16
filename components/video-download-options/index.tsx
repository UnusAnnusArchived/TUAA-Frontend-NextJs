import ***REMOVED*** Typography, Button, Stack, FormControl, InputLabel, Select, MenuItem ***REMOVED*** from "@mui/material";
import ***REMOVED*** FaTimes ***REMOVED*** from "react-icons/fa";
import ***REMOVED*** useState ***REMOVED*** from "react";
import ***REMOVED*** useTranslation ***REMOVED*** from "react-i18next";
import type ***REMOVED*** IVideo ***REMOVED*** from "../../src/types";
import DownloadPopupUI from "../download-popup-ui";
import SubtitlePopup from "../subtitlePopup";
import VideoPopup from "../videoPopup";
import ***REMOVED*** cdn ***REMOVED*** from "../../src/endpoints";

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
    fetch(`$***REMOVED***cdn***REMOVED***$***REMOVED***video.thumbnail ?? video.posters[0].src***REMOVED***`)
      .then((res) => res.blob())
      .then((blob) => ***REMOVED***
        const dataUrl = new FileReader();
        dataUrl.onload = function (e) ***REMOVED***
          const url = e.target.result as string;
          const element = document.createElement("a");
          element.setAttribute("href", url);
          element.setAttribute("download", `$***REMOVED***video.title***REMOVED*** Thumbnail.webp`);
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
        <Button variant="contained" onClick=***REMOVED***toggleVideoPopup***REMOVED***>
          Video
        </Button>
        <Button variant="contained" onClick=***REMOVED***toggleSubtitlesPopup***REMOVED*** disabled=***REMOVED***!video.tracks || video.tracks.length < 1***REMOVED***>
          Subtitles
        </Button>
        <Button variant="contained" onClick=***REMOVED***downloadThumbnail***REMOVED***>
          Thumbnail
        </Button>
        <Button variant="contained" onClick=***REMOVED***downloadDescription***REMOVED***>
          Description
        </Button>
        <Button variant="contained" onClick=***REMOVED***downloadMetadata***REMOVED***>
          Metadata
        </Button>
      </Stack>
      ***REMOVED***showSubtitlesPopup && (
        <DownloadPopupUI>
          <div style=***REMOVED******REMOVED*** marginBottom: 30, display: "flex" ***REMOVED******REMOVED***>
            <h3 style=***REMOVED******REMOVED*** flexGrow: 1 ***REMOVED******REMOVED***>Subtitles</h3>
            <a href="#" style=***REMOVED******REMOVED*** color: "#ffffff" ***REMOVED******REMOVED*** onClick=***REMOVED***toggleSubtitlesPopup***REMOVED***>
              <FaTimes style=***REMOVED******REMOVED*** fontSize: "1.5rem" ***REMOVED******REMOVED*** />
            </a>
          </div>
          <SubtitlePopup video=***REMOVED***video***REMOVED*** />
        </DownloadPopupUI>
      )***REMOVED***
      ***REMOVED***showVideoPopup && (
        <DownloadPopupUI>
          <div style=***REMOVED******REMOVED*** marginBottom: 30, display: "flex" ***REMOVED******REMOVED***>
            <h3 style=***REMOVED******REMOVED*** flexGrow: 1 ***REMOVED******REMOVED***>Video</h3>
            <a href="#" style=***REMOVED******REMOVED*** color: "#ffffff" ***REMOVED******REMOVED*** onClick=***REMOVED***toggleVideoPopup***REMOVED***>
              <FaTimes style=***REMOVED******REMOVED*** fontSize: "1.5rem" ***REMOVED******REMOVED*** />
            </a>
          </div>
          <VideoPopup video=***REMOVED***video***REMOVED*** />
        </DownloadPopupUI>
      )***REMOVED***
    </>
  );
***REMOVED***;

export default VideoDownloadOptions;
