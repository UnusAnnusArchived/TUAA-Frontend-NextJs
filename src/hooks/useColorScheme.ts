import { ColorScheme, colorSchemeAtom } from "@/atoms";
import { darkTheme, lightTheme } from "@/theme";
import { Theme } from "@mui/material";
import { useEffect, useState } from "react";
import { SetterOrUpdater, useRecoilState } from "recoil";

const useColorScheme: () => [[Theme, ColorScheme], SetterOrUpdater<ColorScheme>] = () => {
  const [loaded, setLoaded] = useState(false);
  const [initialMode, setInitialMode] = useState<ColorScheme>();
  const [mode, setMode] = useRecoilState(colorSchemeAtom);

  //We need to do this or else the state will only partially change if a browser is in a mode other than the default
  useEffect(() => {
    if (!loaded) {
      if (window) {
        const newMode = JSON.parse(window.localStorage.getItem(colorSchemeAtom.key) as string);
        setInitialMode(newMode);
        setLoaded(true);
      }
    }
  }, [loaded]);

  const getTheme = (mode: ColorScheme) => (mode === "dark" ? darkTheme : lightTheme);

  return [
    [
      loaded ? getTheme(mode) : initialMode ? getTheme(initialMode) : getTheme("dark"),
      loaded ? mode : initialMode ? initialMode : "dark",
    ],
    setMode,
  ];
};

export default useColorScheme;
