import { useToasts } from "@geist-ui/react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { ChangeEventHandler, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import { userAtom } from "../../src/atoms";
import pb from "../../src/pocketbase";
import { Collection } from "../../src/types";

interface IProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteAccountDialog: React.FC<IProps> = ({ open, setOpen }) => {
  const { t } = useTranslation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsCorrect, setPasswordsCorrect] = useState(false);
  const [passwordError, setPasswordError] = useState<boolean | string>(false);
  const [loggedInUser, setLoggedInUser] = useRecoilState(userAtom);
  const [, setToast] = useToasts();

  const close = () => {
    setOpen(false);
  };

  const deleteAccount = async () => {
    if (password === confirmPassword) {
      try {
        const response = await pb.collection(Collection.Users).authWithPassword(loggedInUser.email, password);
        if (response.token) {
          pb.collection(Collection.Users).delete(response.record.id);
          setLoggedInUser(null);
          setToast({
            text: t("profile:delete:success"),
            type: "success",
          });
          close();
        } else {
          setPasswordsCorrect(false);
          setPasswordError(t("profile:delete:dialog:invalid_password"));
        }
      } catch {
        setPasswordsCorrect(false);
        setPasswordError(t("profile:delete:dialog:invalid_password"));
      }
    }
  };

  const handlePasswordUpdate: ChangeEventHandler<HTMLInputElement> = (evt) => {
    setPassword(evt.target.value);
    if (evt.target.value !== "" && confirmPassword !== "" && evt.target.value === confirmPassword) {
      setPasswordsCorrect(true);
    } else {
      setPasswordsCorrect(false);
    }
  };

  const handleConfirmPasswordUpdate: ChangeEventHandler<HTMLInputElement> = (evt) => {
    setConfirmPassword(evt.target.value);
    if (password !== "" && evt.target.value !== "" && password === evt.target.value) {
      setPasswordsCorrect(true);
    } else {
      setPasswordsCorrect(false);
    }
  };

  return (
    <Dialog fullWidth open={open} onClose={close}>
      <DialogTitle id="alert-dialog-title">{t("profile:delete:dialog:header")}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{t("profile:delete:dialog:description")}</DialogContentText>
        <form>
          <TextField
            error={!!passwordError}
            key="delete-acc-pass"
            margin="dense"
            label={t("common:account:password")}
            type="password"
            fullWidth
            variant="standard"
            value={password}
            onChange={handlePasswordUpdate}
            InputProps={{ autoComplete: "false" }}
            helperText={!!passwordError ? passwordError : undefined}
          />
          <TextField
            error={!!passwordError}
            key="delete-acc-pass-confirm"
            margin="dense"
            label={t("common:account:confirm_password")}
            type="password"
            fullWidth
            variant="standard"
            value={confirmPassword}
            onChange={handleConfirmPasswordUpdate}
            InputProps={{ autoComplete: "false" }}
            helperText={!!passwordError ? passwordError : undefined}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>{t("common:close")}</Button>
        <Button
          disabled={!passwordsCorrect}
          style={{
            backgroundColor: passwordsCorrect ? "#d11a2a" : "#b03b44",
            color: passwordsCorrect ? "#ffffff" : "#b8b8b8",
          }}
          variant="contained"
          onClick={deleteAccount}
        >
          {t("profile:delete:action")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteAccountDialog;
