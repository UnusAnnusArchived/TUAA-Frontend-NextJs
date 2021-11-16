import ***REMOVED*** darkScrollbar ***REMOVED*** from "@mui/material";
import ***REMOVED*** createTheme ***REMOVED*** from "@mui/material/styles";

export const theme = createTheme(***REMOVED***
  palette: ***REMOVED***
    mode: "dark",
    primary: ***REMOVED***
      main: "#ffffff",
      dark: "#ffffff",
      light: "#ffffff",
  ***REMOVED***
    secondary: ***REMOVED***
      main: "#3f3f3f",
  ***REMOVED***
    // background: ***REMOVED***
    //   default: "#121212",
    //   paper: "#3e3e3e",
    // ***REMOVED***,
***REMOVED***
  components: ***REMOVED***
    MuiCssBaseline: ***REMOVED***
      styleOverrides: ***REMOVED***
        body: darkScrollbar(),
    ***REMOVED***
  ***REMOVED***
***REMOVED***
***REMOVED***);
