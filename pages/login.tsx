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
import { LoginResponse } from "../src/types";
import { useRecoilState } from "recoil";
import { previousPageAtom, userAtom } from "../src/atoms";
import { MetaHead } from "../components/meta-head";
import { useRouter } from "next/router";
import { useToasts } from "@geist-ui/react";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const [loggedInUser, setLoggedInUser] = useRecoilState(userAtom);
  const [previousPage, setPreviousPage] = useRecoilState(previousPageAtom);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  const [, setToast] = useToasts();

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
      const res = await axios.post<LoginResponse>(
        `${endpoint}/v2/account/login`,
        {
          username: email,
          password,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      if (res.status !== 200) {
        return;
      }

      const { data } = res;

      if (data) {
        if (data.isValid) {
          setLoggedInUser(data);
          if (previousPage && previousPage.length > 3) {
            router.push(previousPage);
          } else router.push("/");
          return;
        }

        setToast({
          type: "error",
          text: t("login:error"),
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Layout>
      <MetaHead title={`${t("login:title")} | The Unus Annus Archive`} />
      <Typography className="text-center my-2" variant="h5" component="h1">
        {t("login:titleLong")}
      </Typography>
      <form id="login-form">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <TextField
            className={classNames("my-3", styles.field)}
            id="email-archive"
            name="email-archive"
            label={t("login:usernameEmail")}
            variant="standard"
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormControl
            variant="standard"
            className={classNames("my-3", styles.field)}
          >
            <InputLabel htmlFor="standard-adornment-password">
              {t("login:password")}
            </InputLabel>
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
          <div
            className={classNames(
              "my-4 d-flex justify-content-end",
              styles.field
            )}
          >
            <Button
              variant="contained"
              disabled={!isValid()}
              onClick={onSubmit}
            >
              {t("login:loginBtn")}
            </Button>
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default LoginPage;
