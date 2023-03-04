import { useToasts } from "@geist-ui/react";
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
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import endpoints from "../../src/endpoints.json";
import { IMetadataV2Source, IVideo } from "../../src/types";

interface IProps {
  video: IVideo;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const VideoPopup: React.FC<IProps> = ({ video, open, setOpen }) => {
  const { t } = useTranslation();
  const [, setToast] = useToasts();
  const [value, setValue] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<string>();
  const [videoSize, setVideoSize] = useState<number>();
  const router = useRouter();

  useEffect(() => {
    if (video.video) {
      setVideoUrl(`${endpoints.download}${video.video}`);
      setVideoSize(1080);
    }
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
    setVideoUrl(`${endpoints.download}${event.target.value}`);
    setVideoSize(
      (video.sources as unknown as IMetadataV2Source[])?.find?.((source) => source.src === event.target.value).size
    );
  };

  const handleClose = () => {
    setValue("");
    setVideoUrl(undefined);
    setVideoSize(undefined);
    setOpen(false);
  };

  const handleDownload = () => {
    window && window.open(`${videoUrl}?filename=${encodeURIComponent(`${video.title} (${videoSize}p).mp4`)}`, "_blank");
    handleClose();
  };

  const copyLink = () => {
    navigator.clipboard.writeText(`${videoUrl}?filename=${encodeURIComponent(`${video.title} (${videoSize}p).mp4`)}`);
    handleClose();
    setToast({ type: "default", text: t("common:copied_toast") });
  };

  return (
    <Dialog fullWidth open={open} onClose={handleClose}>
      <DialogTitle>{t("downloads:specific_episode_page:video:header")}</DialogTitle>
      <DialogContent>
        {video.video ? (
          <Typography>{t("downloads:specific_episode_page:video:no_resolutions")}</Typography>
        ) : (
          <FormControl fullWidth>
            <InputLabel>{t("downloads:specific_episode_page:video:resolution_selector")}</InputLabel>
            <Select
              label={t("downloads:specific_episode_page:video:resolution_selector")}
              value={value}
              onChange={handleChange}
            >
              {video.sources?.map((source) => {
                return (
                  <MenuItem key={source.src} value={source.src}>
                    {source.size}p
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{t("common:cancel")}</Button>
        <Button onClick={copyLink} disabled={videoUrl === undefined}>
          {t("downloads:specific_episode_page:copy_action")}
        </Button>
        <Button onClick={handleDownload} variant="contained" disabled={videoUrl === undefined}>
          {t("downloads:specific_episode_page:download_action")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VideoPopup;
