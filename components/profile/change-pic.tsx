import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useRecoilState } from "recoil";
import { userAtom } from "../../src/atoms";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Fade from "@mui/material/Fade";
import LinearProgress from "@mui/material/LinearProgress";
import { useToasts } from "@geist-ui/react";
import { useTranslation } from "react-i18next";
import pb from "../../src/pocketbase";
const Input = styled("input")({
  display: "none",
});

const ChangePic: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useRecoilState(userAtom);
  const [image, setImage] = useState<File>(null);
  const [imageUrl, setImageUrl] = useState<string>(null);
  const [isSendingImage, setIsSendingImage] = useState(false);
  const [progress, setProgress] = useState(0);
  const [, setToast] = useToasts();
  const { t, i18n } = useTranslation();

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const src = e.target.result;
      setImageUrl(src);
    };
    if (file) {
      try {
        reader.readAsDataURL(file);
      } catch (err) {}
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setImage(null);
    setImageUrl(null);
    setProgress(0);
    setIsSendingImage(false);
  };

  const handleSubmit = async () => {
    setIsSendingImage(true);
    try {
      const formData = new FormData();
      formData.append("avatar", image);

      const newProfile = await pb.collection("users").update(loggedInUser?.id, formData);
      setToast({
        type: "success",
        text: t("profile:pfp:success"),
      });
      handleClose();

      let tempUser = JSON.parse(JSON.stringify(loggedInUser));

      tempUser.profile.avatar = newProfile.avatar;

      setLoggedInUser(tempUser);
    } catch (error) {
      console.log(error);
      setIsSendingImage(false);
      setToast({
        type: "error",
        text: t("profile:pfp:error"),
      });
    }
  };

  const onCancel = () => {
    handleClose();
  };

  return (
    <div>
      <Button variant="text" onClick={handleClickOpen}>
        {t("profile:pfp:change")}
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle className="text-center">{t("profile:pfp:change")}</DialogTitle>

        <DialogContent>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <DialogContentText>{t("profile:pfp:description")}</DialogContentText>
            <DialogContentText>
              {t("profile:pfp:selected")}: {image ? image.name : t("profile:pfp:none")}
            </DialogContentText>

            {imageUrl && (
              <div className="mt-2">
                <Avatar src={imageUrl} sx={{ width: 200, height: 200 }} />
              </div>
            )}
            <div className="mt-3">
              <label htmlFor="contained-button-file">
                <Input accept="image/*" id="contained-button-file" onChange={onFileChange} type="file" />
                <Button variant="contained" component="span">
                  {t("profile:pfp:fileSelect")}
                </Button>
              </label>
            </div>
            <Fade in={isSendingImage}>
              <div className="w-100 mt-3">
                <LinearProgress value={progress} variant="determinate" />
              </div>
            </Fade>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel}>{t("common:cancel")}</Button>
          <Button onClick={handleSubmit} disabled={image == null || isSendingImage} autoFocus>
            {t("common:save")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ChangePic;
