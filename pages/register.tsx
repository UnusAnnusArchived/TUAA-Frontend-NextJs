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
import styles from "../styles/Login.module.scss";
import classNames from "classnames";
import Button from "@mui/material/Button";
import { endpoint } from "../src/endpoints";
import axios from "axios";
import { LoginResponse, SignupResponse } from "../src/types";
import { useRecoilState } from "recoil";
import { previousPageAtom, userAtom } from "../src/atoms";
import { MetaHead } from "../components/meta-head";
import { useRouter } from "next/router";
import { useToasts } from "@geist-ui/react";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import pb from "../src/pocketbase";

const LoginPage: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useRecoilState(userAtom);
  const { t } = useTranslation();
  const [previousPage, setPreviousPage] = useRecoilState(previousPageAtom);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  const [, setToast] = useToasts();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const isValid = () => {
    return email.trim().length > 0 && password.trim().length > 5 && password.trim() === confirmPassword.trim();
  };

  const onSubmit = async () => {
    if (!isValid()) {
      return;
    }

    try {
      const res = await axios.post<SignupResponse>(
        `${endpoint}/v2/account/signup`,
        JSON.stringify({
          email: email.trim(),
          username: username.trim(),
          password: password.trim(),
          confirmpassword: confirmPassword.trim(),
        }),
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );

      const pbUser = await pb.users.create({
        email,
        password,
        passwordConfirm: confirmPassword,
      });

      await pb.users.authViaEmail(email, password);

      const user = (
        await axios.post<LoginResponse>(
          `${endpoint}/v2/account/login`,
          JSON.stringify({
            username: email,
            password,
            sendEmail: "false",
          }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
      ).data;

      await axios.post(`${endpoint}/v2/account/logout`, {
        loginKey: user.loginKey,
        id: user.user.id,
      });

      await pb.records.update("profiles", pbUser.profile.id, {
        name: username,
        legacy_id: user.user.id,
        emails_account: true,
        emails_updates: false,
      });

      await pb.users.requestVerification(email);

      if (res.status !== 200) {
        return;
      }

      const { data } = res;

      if (data) {
        if (data.success) {
          router.push("/login");
          setToast({
            type: "success",
            text: t("register:success"),
            delay: 10000,
          });
          return;
        }

        setToast({
          type: "error",
          text: data.error.message,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Layout>
      <MetaHead baseTitle={t("register:title")} />
      <Typography className="text-center my-2" variant="h5" component="h1">
        {t("register:titleLong")}
      </Typography>
      <form id="register-form">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <TextField
            className={classNames("my-3", styles.field)}
            id="email-archive"
            name="email-archive"
            label={t("register:email")}
            variant="standard"
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            className={classNames("my-3", styles.field)}
            id="username-archive"
            name="username-archive"
            label={t("register:username")}
            variant="standard"
            value={username}
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          />
          <FormControl variant="standard" className={classNames("my-3", styles.field)}>
            <InputLabel htmlFor="standard-adornment-password">{t("register:password")}</InputLabel>
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
            <InputLabel htmlFor="standard-adornment-password">{t("register:confirmPassword")}</InputLabel>
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
              {t("register:registerBtn")}
            </Button>
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default LoginPage;
