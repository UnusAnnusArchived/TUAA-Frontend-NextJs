import { useToasts } from "@geist-ui/react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React from "react";
import { useRecoilState } from "recoil";
import { userAtom } from "../../src/atoms";
import { endpoint } from "../../src/endpoints";
import { LogoutResponse } from "../../src/types";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const Logout: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useRecoilState(userAtom);
  const [, setToast] = useToasts();
  const router = useRouter();
  const { t, i18n } = useTranslation();

  const { user } = loggedInUser;

  const logout = async () => {
    try {
      const res = await axios.post<LogoutResponse>(
        `${endpoint}/v2/account/logout`,
        { id: user.id, loginKey: loggedInUser.loginKey }
      );

      if (res.status === 200) {
        if (res.data.status === "success") {
          setLoggedInUser(null);
          router.push("/");
          setToast({
            type: "success",
            text: t("profile:logout:successLocal"),
          });
        } else {
          setToast({ type: "error", text: res.data.error });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logoutEverywhere = async () => {
    try {
      const res = await axios.post<LogoutResponse>(
        `${endpoint}/v2/account/logoutall`,
        { id: user.id }
      );

      if (res.status === 200) {
        if (res.data.status === "success") {
          setLoggedInUser(null);
          router.push("/");
          setToast({
            type: "success",
            text: t("profile:logout:successAll"),
          });
        } else {
          setToast({ type: "error", text: res.data.error });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <Typography variant="h6" component="h2" className="my-2">
        {t("profile:logout:title")}
      </Typography>
      <div className="d-flex flex-column flex-md-row justify-content-center">
        <Button
          variant="contained"
          onClick={logout}
          className="mx-3 my-2 my-md-1"
        >
          {t("profile:logout:local")}
        </Button>
        <Button
          variant="contained"
          onClick={logoutEverywhere}
          className="mx-3 my-2 my-md-1"
        >
          {t("profile:logout:all")}
        </Button>
      </div>
    </div>
  );
};

export default Logout;
