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
import axios from "axios";
import { endpoint } from "../../src/endpoints";
import { ChangePFPResponse, CheckLoginKeyResponse } from "../../src/types";
import Fade from "@mui/material/Fade";
import LinearProgress from "@mui/material/LinearProgress";
import { useToasts } from "@geist-ui/react";
import { useTranslation } from "react-i18next";

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

  const { user } = loggedInUser;

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

  const uploadProgressHandler = (progressEvent: any) => {
    const final: number = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total
    );
    setProgress(final);
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
      formData.append("pfp", image);
      formData.append("loginKey", loggedInUser.loginKey);

      const imageUploadResult = await axios.post<ChangePFPResponse>(
        `${endpoint}/v2/account/changepfp`,
        formData,
        {
          onUploadProgress: (progressEvent) =>
            uploadProgressHandler(progressEvent),
        }
      );

      if (imageUploadResult.status === 200) {
        if (imageUploadResult.data.status === "success") {
          const success = await refetchUser();
          if (success) {
            setToast({
              type: "success",
              text: t("profile:pfp:success"),
            });
            handleClose();
            return;
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
    setIsSendingImage(false);
    setToast({
      type: "error",
      text: t("profile:pfp:error"),
    });
  };

  const refetchUser = async (): Promise<boolean> => {
    const res = await axios.post<CheckLoginKeyResponse>(
      `${endpoint}/v2/account/checkloginkey`,
      { loginKey: loggedInUser.loginKey }
    );

    if (res.status === 200) {
      if (res.data.isValid) {
        setLoggedInUser({ ...loggedInUser, ...res.data });
        return true;
      }
    }

    return false;
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
        <DialogTitle className="text-center">
          {t("profile:pfp:change")}
        </DialogTitle>

        <DialogContent>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <DialogContentText>
              {t("profile:pfp:description")}
            </DialogContentText>
            <DialogContentText>
              {t("profile:pfp:selected")}:{" "}
              {image ? image.name : t("profile:pfp:none")}
            </DialogContentText>

            {imageUrl && (
              <div className="mt-2">
                <Avatar src={imageUrl} sx={{ width: 200, height: 200 }} />
              </div>
            )}
            <div className="mt-3">
              <label htmlFor="contained-button-file">
                <Input
                  accept="image/*"
                  id="contained-button-file"
                  onChange={onFileChange}
                  type="file"
                />
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
          <Button
            onClick={handleSubmit}
            disabled={image == null || isSendingImage}
            autoFocus
          >
            {t("common:save")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ChangePic;
