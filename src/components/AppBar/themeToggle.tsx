"use client";

import React from "react";
import IconButton from "@mui/material/IconButton";
import { DarkMode, LightMode } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { useRecoilState } from "recoil";
import { T } from "@tolgee/react";
import { useColorScheme } from "@/hooks/localStorageHooks";

export function ThemeToggle() {
  const [colorScheme, setColorScheme] = useColorScheme();

  const handleToggleTheme = () => {
    setColorScheme((colorScheme) => (colorScheme === "light" ? "dark" : "light"));
  };

  return (
    <Tooltip
      title={colorScheme === "dark" ? <T keyName="header.enableLightMode" /> : <T keyName="header.enableDarkMode" />}
    >
      <IconButton sx={{ marginLeft: 1 }} onClick={handleToggleTheme} color="inherit">
        {colorScheme === "dark" ? <LightMode /> : <DarkMode />}
      </IconButton>
    </Tooltip>
  );
}
