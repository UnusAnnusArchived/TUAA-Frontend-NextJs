"use client";

import { useLocalStorage } from "@uidotdev/usehooks";

export enum LocalStorageKeys {
  ColorScheme = "colorScheme",
}

export type ColorScheme = "dark" | "light";

export const useColorScheme = () => useLocalStorage<ColorScheme>(LocalStorageKeys.ColorScheme, "dark");
