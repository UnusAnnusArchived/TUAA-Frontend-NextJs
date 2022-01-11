import React, ***REMOVED*** useEffect ***REMOVED*** from "react";
import styles from "../../styles/Layout.module.scss";
import ***REMOVED*** theme ***REMOVED*** from "../theme/theme";
import classNames from "classnames";
import ***REMOVED*** AppBar ***REMOVED*** from "../app-bar";
import ***REMOVED*** createStyles, makeStyles ***REMOVED*** from "@mui/styles";
import ***REMOVED*** Theme ***REMOVED*** from "@mui/material";
import axios from "axios";
import ***REMOVED*** useRecoilState ***REMOVED*** from "recoil";
import ***REMOVED*** userAtom ***REMOVED*** from "../../src/atoms";
import ***REMOVED*** endpoint ***REMOVED*** from "../../src/endpoints";
import ***REMOVED*** CheckLoginKeyResponse ***REMOVED*** from "../../src/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles(***REMOVED***
    main: ***REMOVED***
      backgroundColor: theme.palette?.background.default,
  ***REMOVED***
***REMOVED***)
);

const Layout: React.FC = (***REMOVED*** children ***REMOVED***) => ***REMOVED***
  const [loggedInUser, setLoggedInUser] = useRecoilState(userAtom);

  const classes = useStyles(theme);

  const refetchUser = async (): Promise<boolean> => ***REMOVED***
    const res = await axios.post<CheckLoginKeyResponse>(
      `$***REMOVED***endpoint***REMOVED***/v2/account/checkloginkey`,
      ***REMOVED*** loginKey: loggedInUser.loginKey ***REMOVED***
    );

    if (res.status === 200) ***REMOVED***
      if (res.data.isValid) ***REMOVED***
        return true;
  ***REMOVED***
***REMOVED***

    return false;
***REMOVED***;

  const checkUser = async () => ***REMOVED***
    const res = await refetchUser();

    if (!res) ***REMOVED***
      setLoggedInUser(null);
***REMOVED***
***REMOVED***;

  useEffect(() => ***REMOVED***
    if (loggedInUser) checkUser();
***REMOVED*** []);

  useEffect(() => ***REMOVED***
    if (loggedInUser) checkUser();
***REMOVED*** [loggedInUser]);

  return (
    <React.Fragment>
      <noscript>
        <style>
          ***REMOVED***`body ***REMOVED*** all: unset; ***REMOVED*** #main ***REMOVED*** display: none!important; ***REMOVED***`***REMOVED***
        </style>
        ***REMOVED***/*eslint-disable-next-line*/***REMOVED***
        <h1>Please enable JavaScript, or go to our <a href="/legacy/01">Legacy browser page</a>.</h1>
      </noscript>

      <div id="main" className=***REMOVED***classNames(classes.main, styles.main)***REMOVED***>
        <AppBar />
        <div className=***REMOVED***styles.toolbar***REMOVED*** />
        <main id="main" className="container pb-5 text-white">***REMOVED***children***REMOVED***</main>
    </div>
    </React.Fragment>
  );
***REMOVED***;

export default Layout;
