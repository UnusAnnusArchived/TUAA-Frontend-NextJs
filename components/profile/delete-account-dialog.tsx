import { useToasts } from "@geist-ui/react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { ChangeEventHandler, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userAtom } from "../../src/atoms";
import pb from "../../src/pocketbase";

interface IProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteAccountDialog: React.FC<IProps> = ({ open, setOpen }) => {
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
        const response = await pb.users.authViaEmail(loggedInUser.email, password);
        if (response.token) {
          pb.users.delete(response.user.id);
          setLoggedInUser(null);
          setToast({
            text: "Sucessfully deleted your account and all associated information.",
            type: "success",
          });
          close();
        } else {
          setPasswordsCorrect(false);
          setPasswordError("Invalid Password!");
        }
      } catch {
        setPasswordsCorrect(false);
        setPasswordError("Invalid Password!");
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
    <Dialog
      fullWidth
      open={open}
      onClose={close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Delete Account?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to permanently delete your account? This will delete all your comments and cannot be
          undone! To continue please enter your password below.
        </DialogContentText>
        <form>
          <TextField
            error={!!passwordError}
            key="delete-acc-pass"
            margin="dense"
            label="Password"
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
            label="Confirm Password"
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
        <Button onClick={close}>Cancel</Button>
        <Button
          disabled={!passwordsCorrect}
          style={{
            backgroundColor: passwordsCorrect ? "#d11a2a" : "#b03b44",
            color: passwordsCorrect ? "#ffffff" : "#b8b8b8",
          }}
          variant="contained"
          onClick={deleteAccount}
        >
          Delete Account
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteAccountDialog;
