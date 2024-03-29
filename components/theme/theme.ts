import { createTheme } from "@mui/material/styles";
import type { ThemeOptions } from "@mui/material/styles";

const baseTheme: ThemeOptions = {
  breakpoints: {
    values: {
      xl: 1200,
      lg: 992,
      md: 768,
      sm: 540,
      xs: 0,
    },
  },
};

export const darkTheme: ThemeOptions = {
  ...baseTheme,
  palette: {
    mode: "dark",
    primary: {
      main: "#ffffff",
    },
  },
  typography: {
    allVariants: {
      color: "#ffffff",
    },
  },
};

export const lightTheme: ThemeOptions = {
  ...baseTheme,
  palette: {
    mode: "light",
    primary: {
      main: "#000000",
    },
  },
  typography: {
    allVariants: {
      color: "#000000",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#eeeeee",
          color: "#000000",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        elevation: {
          backgroundColor: "#eeeeee",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: "#eeeeee",
          color: "#000000",
          ":hover": {
            backgroundColor: "#dddddd",
            color: "#000000",
          },
        },
        text: {
          ":hover": {
            color: "#000000",
          },
        },
      },
    },
  },
};

export const theme = createTheme(darkTheme);
