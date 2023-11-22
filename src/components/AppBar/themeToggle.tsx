"use client";

import React from "react";
import IconButton from "@mui/material/IconButton";
import { DarkMode, LightMode } from "@mui/icons-material";
import useColorScheme from "#/useColorScheme";
import { Tooltip } from "@mui/material";
import { useClientTranslation } from "@/hooks/useTranslation";
import { useRecoilState } from "recoil";
import T from "../T";

export function ThemeToggle() {
  const [t] = useClientTranslation(useRecoilState);
  const [[theme, mode], setMode] = useColorScheme();

  const handleToggleTheme = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  return (
    <Tooltip title={mode === "dark" ? <T>{t.header.enableLightMode}</T> : <T>{t.header.enableDarkMode}</T>}>
      <IconButton sx={{ marginLeft: 1 }} onClick={handleToggleTheme} color="inherit">
        {mode === "dark" ? <LightMode /> : <DarkMode />}
      </IconButton>
    </Tooltip>
  );
}
