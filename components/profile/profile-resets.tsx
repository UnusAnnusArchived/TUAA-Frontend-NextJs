import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import { userAtom } from "../../src/atoms";
import pb from "../../src/pocketbase";

const ResetProfile: React.FC = () => {
  const { t } = useTranslation();
  const [loggedInUser] = useRecoilState(userAtom);
  const [emailChangeDialog, setEmailChangeDialog] = useState(false);
  const [sentEmail, setSentEmail] = useState(false);
  const [sentPassword, setSentPassword] = useState(false);
  const [newEmail, setNewEmail] = useState("");

  const resetEmail = async () => {
    await pb.collection("users").requestEmailChange(newEmail);
    closeEmailChangeDialog();
  };

  const resetPassword = async () => {
    await pb.collection("users").requestPasswordReset(loggedInUser?.email);
    setSentPassword(true);
  };

  const openEmailChangeDialog = () => {
    setEmailChangeDialog(true);
  };

  const closeEmailChangeDialog = () => {
    setEmailChangeDialog(false);
    setSentEmail(true);
  };

  const onNewEmailChange: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
    setNewEmail(evt.target.value);
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <Typography variant="h6" component="h2" className="my-2">
        {t("profile:reset:header")}
      </Typography>
      <Button style={{ marginBottom: 5 }} variant="contained" onClick={openEmailChangeDialog} disabled={sentEmail}>
        {sentEmail ? t("profile:reset:email:disabled") : t("profile:reset:email:action")}
      </Button>
      <Button style={{ marginTop: 5 }} variant="contained" onClick={resetPassword} disabled={sentPassword}>
        {sentPassword ? t("profile:reset:password:disabled") : t("profile:reset:password:action")}
      </Button>

      <Dialog fullWidth open={emailChangeDialog} onClose={closeEmailChangeDialog}>
        <DialogTitle id="alert-dialog-title">{t("profile:reset:email:dialog:header")}</DialogTitle>
        <DialogContent>
          <TextField
            multiline
            autoFocus
            margin="dense"
            label={t("profile:reset:email:dialog:label")}
            type="email"
            fullWidth
            variant="standard"
            value={newEmail}
            onChange={onNewEmailChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEmailChangeDialog}>{t("common:cancel")}</Button>
          <Button variant="contained" onClick={resetEmail} autoFocus>
            {t("profile:reset:email:dialog:send")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ResetProfile;
