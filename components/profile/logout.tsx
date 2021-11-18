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

const Logout: React.FC = () => ***REMOVED***
  const [loggedInUser, setLoggedInUser] = useRecoilState(userAtom);
  const [, setToast] = useToasts();
  const router = useRouter();

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
            text: "You have logged out successfully",
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
            text: "You have been logged out from all devices",
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
        Logout options
      </Typography>
      <div className="d-flex justify-content-center">
        <Button variant="contained" onClick=***REMOVED***logout***REMOVED*** className="mx-3 my-1">
          Log out from this device
        </Button>
        <Button
          variant="contained"
          onClick=***REMOVED***logoutEverywhere***REMOVED***
          className="mx-3 my-1"
        >
          Log out everywhere
        </Button>
      </div>
    </div>
  );
***REMOVED***;

export default Logout;
