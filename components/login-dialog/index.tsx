import classNames from "classnames";
import pb from "../../src/pocketbase";
import styles from "./styles.module.scss";
import { useToasts } from "@geist-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import { previousPageAtom, userAtom } from "../../src/atoms";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Collection } from "../../src/types";

interface IProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginDialog: React.FC<IProps> = ({ open, setOpen }) => {
  const { t } = useTranslation();
  const [loggedInUser, setLoggedInUser] = useRecoilState(userAtom);
  const [previousPage, setPreviousPage] = useRecoilState(previousPageAtom);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [, setToast] = useToasts();

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const isValid = () => {
    return email.length > 0 && password.length > 0;
  };

  const onSubmit = async () => {
    if (!isValid()) {
      return;
    }

    try {
      const { record } = await pb.collection(Collection.Users).authWithPassword(email, password);
      setLoggedInUser(record);
      if (previousPage) {
        router.push(previousPage);
      } else router.push("/");
    } catch (err) {
      setToast({
        text: err.message ?? err.code,
        type: "error",
        delay: 1000,
      });
      console.error(err);
    }
  };

  const handleMouseDownPassword = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
  };

  return (
    <Dialog fullWidth open={open} onClose={handleClose}>
      <DialogTitle>{t("pages:login")}</DialogTitle>
      <DialogContent>
        <form id="login-form">
          <div className="d-flex flex-column justify-content-center align-items-center">
            <TextField
              className={classNames("my-3", styles.field)}
              id="email-archive"
              name="email-archive"
              label={t("login:password_auth_dialog:username_or_email")}
              variant="standard"
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormControl variant="standard" className={classNames("my-3", styles.field)}>
              <InputLabel htmlFor="standard-adornment-password">{t("login:password_auth_dialog:password")}</InputLabel>
              <Input
                id="password-archive"
                name="password-archive"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.currentTarget.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </div>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{t("common:close")}</Button>
        <Button variant="contained" onClick={onSubmit} disabled={!isValid()}>
          {t("login:password_auth_dialog:action")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginDialog;
