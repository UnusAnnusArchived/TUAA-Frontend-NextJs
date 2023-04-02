import { atom } from "recoil";
import type { Record } from "pocketbase";
import type { PBAuthProvider } from "./types";
import { IColorScheme } from "./types";

const localStorageEffect =
  (key) =>
  ({ setSelf, onSet }) => {
    try {
      const savedValue = localStorage.getItem(key);
      if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
      }
    } catch (e) {}
    onSet((newValue) => {
      try {
        localStorage.setItem(key, JSON.stringify(newValue));
      } catch (e) {}
    });
  };

export const userAtom = atom<Record>({
  key: "userAtom",
  default: null,
  effects_UNSTABLE: [localStorageEffect("userAtom")],
});

export const previousPageAtom = atom<string>({
  key: "previousPageAtom",
  default: null,
  effects_UNSTABLE: [localStorageEffect("previousPageAtom")],
});

export const autoplayAtom = atom<boolean>({
  key: "autoplay",
  default: false,
  effects_UNSTABLE: [localStorageEffect("autoplay")],
});

export const showPatreonAtom = atom<boolean>({
  key: "patreon",
  default: true,
  effects_UNSTABLE: [localStorageEffect("patreon")],
});

export const oAuthProviderAtom = atom<PBAuthProvider>({
  key: "oa2_provider",
  default: null,
  effects_UNSTABLE: [localStorageEffect("oa2_provider")],
});

export const colorSchemeAtom = atom<IColorScheme>({
  key: "colorScheme",
  default: "dark",
  effects_UNSTABLE: [localStorageEffect("colorScheme")],
});
