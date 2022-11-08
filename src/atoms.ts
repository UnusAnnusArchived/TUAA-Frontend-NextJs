import { User } from "pocketbase";
import { atom } from "recoil";

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

export const userAtom = atom<User>({
  key: "userAtom",
  default: null,
  effects_UNSTABLE: [localStorageEffect("userAtom")],
});

export const previousPageAtom = atom<string>({
  key: "previousPageAtom",
  default: null,
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
