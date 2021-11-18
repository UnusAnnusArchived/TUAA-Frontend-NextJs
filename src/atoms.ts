import ***REMOVED*** atom ***REMOVED*** from "recoil";
import ***REMOVED*** LoginResponse ***REMOVED*** from "./types";

const localStorageEffect =
  (key) =>
  (***REMOVED*** setSelf, onSet ***REMOVED***) => ***REMOVED***
    try ***REMOVED***
      const savedValue = localStorage.getItem(key);
      if (savedValue != null) ***REMOVED***
        setSelf(JSON.parse(savedValue));
  ***REMOVED***
***REMOVED*** catch (e) ***REMOVED******REMOVED***
    onSet((newValue) => ***REMOVED***
      try ***REMOVED***
        localStorage.setItem(key, JSON.stringify(newValue));
  ***REMOVED*** catch (e) ***REMOVED******REMOVED***
***REMOVED***);
***REMOVED***;

export const userAtom = atom<LoginResponse>(***REMOVED***
  key: "userAtom",
  default: null,
  effects_UNSTABLE: [localStorageEffect("userAtom")],
***REMOVED***);

export const previousPageAtom = atom<string>(***REMOVED***
  key: "previousPageAtom",
  default: null,
***REMOVED***);
