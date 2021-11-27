import React, { useEffect } from "react";
import styles from "../../styles/Layout.module.scss";
import { theme } from "../theme/theme";
import classNames from "classnames";
import { AppBar } from "../app-bar";
import { createStyles, makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import axios from "axios";
import { useRecoilState } from "recoil";
import { userAtom } from "../../src/atoms";
import { endpoint } from "../../src/endpoints";
import { CheckLoginKeyResponse } from "../../src/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      backgroundColor: theme.palette?.background.default,
    },
  })
);

const Layout: React.FC = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useRecoilState(userAtom);

  const classes = useStyles(theme);

  const refetchUser = async (): Promise<boolean> => {
    const res = await axios.post<CheckLoginKeyResponse>(
      `${endpoint}/v2/account/checkloginkey`,
      { loginKey: loggedInUser.loginKey }
    );

    if (res.status === 200) {
      if (res.data.isValid) {
        return true;
      }
    }

    return false;
  };

  const checkUser = async () => {
    const res = await refetchUser();

    if (!res) {
      setLoggedInUser(null);
    }
  };

  useEffect(() => {
    if (loggedInUser) checkUser();
  }, []);

  useEffect(() => {
    if (loggedInUser) checkUser();
  }, [loggedInUser]);

  return (
    <div className={classNames(classes.main, styles.main)}>
      <AppBar />
      <div className={styles.toolbar} />
      <main className="container pb-5 text-white">{children}</main>
    </div>
  );
};

export default Layout;
