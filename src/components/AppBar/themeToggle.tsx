"use client";

import React from "react";
import IconButton from "@mui/material/IconButton";
import { DarkMode, LightMode } from "@mui/icons-material";
import useColorScheme from "#/useColorScheme";
import { Tooltip } from "@mui/material";
import { useRecoilState } from "recoil";
import { T } from "@tolgee/react";

export function ThemeToggle() {
  const [[theme, mode], setMode] = useColorScheme();

  const handleToggleTheme = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  return (
    <Tooltip title={mode === "dark" ? <T keyName="header.enableLightMode" /> : <T keyName="header.enableDarkMode" />}>
      <IconButton sx={{ marginLeft: 1 }} onClick={handleToggleTheme} color="inherit">
        {mode === "dark" ? <LightMode /> : <DarkMode />}
      </IconButton>
    </Tooltip>
  );
}
