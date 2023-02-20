import { createTheme, Theme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { colorSchemeAtom } from "../../src/atoms";
import { ThemeProvider as ActualThemeProvider } from "@mui/material/styles";
import { lightTheme, darkTheme } from "./theme";

const ThemeProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [theme, setTheme] = useState(createTheme(darkTheme));

  const [colorScheme] = useRecoilState(colorSchemeAtom);

  useEffect(() => {
    if (colorScheme === "dark") {
      setTheme(createTheme(darkTheme));
    } else if (colorScheme === "light") {
      setTheme(createTheme(lightTheme));
    } else {
      alert("Invalid color scheme!");
    }
  }, [colorScheme]);

  return <ActualThemeProvider theme={theme}>{children}</ActualThemeProvider>;
};

export default ThemeProvider;
