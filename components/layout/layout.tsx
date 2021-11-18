import React from "react";
import styles from "../../styles/Layout.module.scss";
// import { Appbar } from "../appbar";
import { theme } from "../theme/theme";
import classNames from "classnames";
import { AppBar } from "../app-bar";
import { createStyles, makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";

// const useStyles = makeStyles({
//   main: {
//     backgroundColor: theme.palette?.background.default,
//   },
// });

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      backgroundColor: theme.palette?.background.default,
    },
  })
);

const Layout: React.FC = ({ children }) => {
  const classes = useStyles(theme);

  return (
    <div className={classNames(classes.main, styles.main)}>
      <AppBar />
      <div className={styles.toolbar} />
      <main className="container pb-5 text-white">{children}</main>
    </div>
  );
};

export default Layout;
