import React from "react";
import styles from "../../styles/Layout.module.scss";
// import ***REMOVED*** Appbar ***REMOVED*** from "../appbar";
import ***REMOVED*** theme ***REMOVED*** from "../theme/theme";
import classNames from "classnames";
import ***REMOVED*** AppBar ***REMOVED*** from "../app-bar";
import ***REMOVED*** createStyles, makeStyles ***REMOVED*** from "@mui/styles";
import ***REMOVED*** Theme ***REMOVED*** from "@mui/material";

// const useStyles = makeStyles(***REMOVED***
//   main: ***REMOVED***
//     backgroundColor: theme.palette?.background.default,
// ***REMOVED***
// ***REMOVED***);

const useStyles = makeStyles((theme: Theme) =>
  createStyles(***REMOVED***
    main: ***REMOVED***
      backgroundColor: theme.palette?.background.default,
  ***REMOVED***
***REMOVED***)
);

const Layout: React.FC = (***REMOVED*** children ***REMOVED***) => ***REMOVED***
  const classes = useStyles(theme);

  return (
    <div className=***REMOVED***classNames(classes.main, styles.main)***REMOVED***>
      <AppBar />
      <div className=***REMOVED***styles.toolbar***REMOVED*** />
      <main className="container pb-5 text-white">***REMOVED***children***REMOVED***</main>
    </div>
  );
***REMOVED***;

export default Layout;
