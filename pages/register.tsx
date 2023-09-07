import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { Layout } from "../components/layout";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import styles from "../styles/Register.module.scss";
import classNames from "classnames";
import Button from "@mui/material/Button";
import { useRecoilState } from "recoil";
import { previousPageAtom, userAtom } from "../src/atoms";
import { MetaHead } from "../components/meta-head";
import { useRouter } from "next/router";
import { useToasts } from "@geist-ui/react";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import pb from "../src/pocketbase";
import { Collection } from "../src/types";

const LoginPage: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useRecoilState(userAtom);
  const { t } = useTranslation();
  const [previousPage, setPreviousPage] = useRecoilState(previousPageAtom);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const [, setToast] = useToasts();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const isValid = () => {
    return (
      email.trim().length > 0 &&
      name.trim().length > 0 &&
      !username.includes(" ") &&
      username.trim().length >= 4 &&
      username.trim().length <= 100 &&
      password.trim().length >= 8 &&
      password.trim().length <= 72 &&
      password.trim() === confirmPassword.trim()
    );
  };

  const onSubmit = async () => {
    if (!isValid()) {
      return;
    }

    try {
      const user = await pb.collection(Collection.Users).create({
        email: email.trim(),
        name: name.trim(),
        username: username.trim(),
        password,
        passwordConfirm: confirmPassword,
        emails_account: true,
        emails_updates: false,
      });

      await pb.collection(Collection.Users).authWithPassword(email, password);

      await pb.collection(Collection.Users).requestVerification(email);

      setLoggedInUser(user);

      if (previousPage) {
        router.push(previousPage);
      } else router.push("/");
      router.push("/");
      setToast({
        type: "success",
        text: t("register:success"),
        delay: 10000,
      });
    } catch (err) {
      setToast({
        type: "error",
        text: err.message ?? err.code,
      });
    }
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Layout>
      <MetaHead baseTitle={t("pages:register")} />
      <Typography className="text-center my-2" variant="h5" component="h1">
        {t("register:header")}
      </Typography>
      <form id="register-form">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <TextField
            className={classNames("my-3", styles.field)}
            id="email-archive"
            name="email-archive"
            label={t("common:account:email")}
            variant="standard"
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            className={classNames("my-3", styles.field)}
            id="name-archive"
            name="name-archive"
            label={t("common:account:name")}
            variant="standard"
            value={name}
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            className={classNames("my-3", styles.field)}
            id="username-archive"
            name="username-archive"
            label={t("common:account:username")}
            variant="standard"
            value={username}
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          />
          <FormControl variant="standard" className={classNames("my-3", styles.field)}>
            <InputLabel htmlFor="standard-adornment-password">{t("common:account:password")}</InputLabel>
            <Input
              id="password-archive"
              name="password-archive"
              type={showPassword ? "text" : "password"}
              value={password}
              autoComplete="new-password"
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
          <FormControl variant="standard" className={classNames("my-3", styles.field)}>
            <InputLabel htmlFor="standard-adornment-password">{t("common:account:confirm_password")}</InputLabel>
            <Input
              id="confirm-password-archive"
              name="confirm-password-archive"
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              autoComplete="new-password"
              onChange={(event) => setConfirmPassword(event.currentTarget.value)}
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
          <div className={classNames("my-4 d-flex justify-content-end", styles.field)}>
            <Button variant="contained" disabled={!isValid()} onClick={onSubmit}>
              {t("register:submit")}
            </Button>
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default LoginPage;
