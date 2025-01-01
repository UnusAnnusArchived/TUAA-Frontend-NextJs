"use client";

import { darkTheme, lightTheme } from "@/theme";
import { useColorScheme } from "./localStorageHooks";

const useInitialTheme = () => {
  const [colorScheme] = useColorScheme();

  if (colorScheme === "light") return lightTheme;
  return darkTheme;
};

export default useInitialTheme;
