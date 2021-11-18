import { atom } from "recoil";
import { LoginResponse } from "./types";

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

export const userAtom = atom<LoginResponse>({
  key: "userAtom",
  default: null,
  effects_UNSTABLE: [localStorageEffect("userAtom")],
});

export const previousPageAtom = atom<string>({
  key: "previousPageAtom",
  default: null,
});
