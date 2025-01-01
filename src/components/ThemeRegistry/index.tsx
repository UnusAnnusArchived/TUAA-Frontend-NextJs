"use client";

import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import NextAppDirEmotionCacheProvider from "./EmotionCache";
import useInitialTheme from "@/hooks/useTheme";
import { darkTheme } from "@/theme";
import { useIsClient } from "@uidotdev/usehooks";

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
      <ThemeProviderSwitcher>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {children}
      </ThemeProviderSwitcher>
    </NextAppDirEmotionCacheProvider>
  );
}

const ThemeProviderSwitcher: React.FC<React.PropsWithChildren> = ({ children }) => {
  const isClient = useIsClient();

  if (isClient) {
    return <ClientThemeProvider>{children}</ClientThemeProvider>;
  }

  return <ServerThemeProvider>{children}</ServerThemeProvider>;
};

const ServerThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>;
};

const ClientThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const theme = useInitialTheme();

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
