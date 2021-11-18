import ***REMOVED*** useToasts ***REMOVED*** from "@geist-ui/react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React from "react";
import ***REMOVED*** useRecoilState ***REMOVED*** from "recoil";
import ***REMOVED*** userAtom ***REMOVED*** from "../../src/atoms";
import ***REMOVED*** endpoint ***REMOVED*** from "../../src/endpoints";
import ***REMOVED*** LogoutResponse ***REMOVED*** from "../../src/types";
import ***REMOVED*** useRouter ***REMOVED*** from "next/router";
import ***REMOVED*** useTranslation ***REMOVED*** from "react-i18next";

const Logout: React.FC = () => ***REMOVED***
  const [loggedInUser, setLoggedInUser] = useRecoilState(userAtom);
  const [, setToast] = useToasts();
  const router = useRouter();
  const ***REMOVED*** t, i18n ***REMOVED*** = useTranslation();

  const ***REMOVED*** user ***REMOVED*** = loggedInUser;

  const logout = async () => ***REMOVED***
    try ***REMOVED***
      const res = await axios.post<LogoutResponse>(
        `$***REMOVED***endpoint***REMOVED***/api/v2/account/logout`,
        ***REMOVED*** id: user.id, loginKey: loggedInUser.loginKey ***REMOVED***
      );

      if (res.status === 200) ***REMOVED***
        if (res.data.status === "success") ***REMOVED***
          setLoggedInUser(null);
          router.push("/");
          setToast(***REMOVED***
            type: "success",
            text: t("profile:logout:successLocal"),
      ***REMOVED***);
    ***REMOVED*** else ***REMOVED***
          setToast(***REMOVED*** type: "error", text: res.data.error ***REMOVED***);
    ***REMOVED***
  ***REMOVED***
***REMOVED*** catch (error) ***REMOVED***
      console.log(error);
***REMOVED***
***REMOVED***;

  const logoutEverywhere = async () => ***REMOVED***
    try ***REMOVED***
      const res = await axios.post<LogoutResponse>(
        `$***REMOVED***endpoint***REMOVED***/api/v2/account/logoutall`,
        ***REMOVED*** id: user.id ***REMOVED***
      );

      if (res.status === 200) ***REMOVED***
        if (res.data.status === "success") ***REMOVED***
          setLoggedInUser(null);
          router.push("/");
          setToast(***REMOVED***
            type: "success",
            text: t("profile:logout:successAll"),
      ***REMOVED***);
    ***REMOVED*** else ***REMOVED***
          setToast(***REMOVED*** type: "error", text: res.data.error ***REMOVED***);
    ***REMOVED***
  ***REMOVED***
***REMOVED*** catch (error) ***REMOVED***
      console.log(error);
***REMOVED***
***REMOVED***;

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <Typography variant="h6" component="h2" className="my-2">
        ***REMOVED***t("profile:logout:title")***REMOVED***
      </Typography>
      <div className="d-flex flex-column flex-md-row justify-content-center">
        <Button
          variant="contained"
          onClick=***REMOVED***logout***REMOVED***
          className="mx-3 my-2 my-md-1"
        >
          ***REMOVED***t("profile:logout:local")***REMOVED***
        </Button>
        <Button
          variant="contained"
          onClick=***REMOVED***logoutEverywhere***REMOVED***
          className="mx-3 my-2 my-md-1"
        >
          ***REMOVED***t("profile:logout:all")***REMOVED***
        </Button>
      </div>
    </div>
  );
***REMOVED***;

export default Logout;
