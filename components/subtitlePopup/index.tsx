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
import { cdn } from "../../src/endpoints.json";
import { IVideo } from "../../src/types";

interface IProps {
  video: IVideo;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const SubtitlePopup: React.FC<IProps> = ({ video, open, setOpen }) => {
  const { t } = useTranslation();
  const [subtitleUrl, setSubtitleUrl] = useState<string>();

  const handleChange = (event: SelectChangeEvent) => {
    setSubtitleUrl(`${cdn}${event.target.value}`);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog fullWidth open={open} onClose={handleClose}>
      <DialogTitle>{t("downloads:specific_episode_page:subtitles:header")}</DialogTitle>
      <DialogContent>
        <FormControl fullWidth>
          <InputLabel>{t("downloads:specific_episode_page:subtitles:language_selector")}</InputLabel>
          <Select label={t("downloads:specific_episode_page:subtitles:language_selector")} onChange={handleChange}>
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
        <Button onClick={handleClose} href={subtitleUrl} variant="contained" disabled={subtitleUrl === undefined}>
          {t("downloads:specific_episode_page:download_action")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SubtitlePopup;
