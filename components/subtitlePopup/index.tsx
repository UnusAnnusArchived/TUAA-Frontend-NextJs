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
} from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";
import endpoints from "../../src/endpoints.json";
import { IVideo } from "../../src/types";

interface IProps {
  video: IVideo;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const SubtitlePopup: React.FC<IProps> = ({ video, open, setOpen }) => {
  const { t } = useTranslation();
  const [, setToast] = useToasts();
  const [value, setValue] = useState<string>("");
  const [subtitleUrl, setSubtitleUrl] = useState<string>();
  const [subtitleSrclang, setSubtitleSrclang] = useState<string>();

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
    setSubtitleUrl(`${endpoints.download}${event.target.value}`);
    setSubtitleSrclang(video.tracks?.find?.((subtitle) => subtitle.src === event.target.value).srclang);
  };

  const handleClose = () => {
    setValue("");
    setSubtitleUrl(undefined);
    setSubtitleSrclang(undefined);
    setOpen(false);
  };

  const handleDownload = () => {
    window &&
      window.open(
        `${subtitleUrl}?filename=${encodeURIComponent(
          `${video.title} ${t("downloads:specific_episode_page:options:subtitles")}.${subtitleSrclang}.vtt`
        )}`,
        "_blank"
      );
    handleClose();
  };

  const copyLink = () => {
    navigator.clipboard.writeText(
      `${subtitleUrl}?filename=${encodeURIComponent(
        `${video.title} ${t("downloads:specific_episode_page:options:subtitles")}.${subtitleSrclang}.vtt`
      )}`
    );
    handleClose();
    setToast({ type: "default", text: t("common:copied_toast") });
  };

  return (
    <Dialog fullWidth open={open} onClose={handleClose}>
      <DialogTitle>{t("downloads:specific_episode_page:subtitles:header")}</DialogTitle>
      <DialogContent>
        <FormControl fullWidth>
          <InputLabel>{t("downloads:specific_episode_page:subtitles:language_selector")}</InputLabel>
          <Select
            label={t("downloads:specific_episode_page:subtitles:language_selector")}
            value={value}
            onChange={handleChange}
          >
            {video.tracks?.map((subtitle) => {
              if (subtitle.kind === "captions") {
                return (
                  <MenuItem key={subtitle.srclang} value={subtitle.src}>
                    {subtitle.label}
                  </MenuItem>
                );
              }
            })}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{t("common:cancel")}</Button>
        <Button onClick={copyLink} disabled={subtitleUrl === undefined}>
          {t("downloads:specific_episode_page:copy_action")}
        </Button>
        <Button onClick={handleDownload} variant="contained" disabled={subtitleUrl === undefined}>
          {t("downloads:specific_episode_page:download_action")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SubtitlePopup;
