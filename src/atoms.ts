//
// THIS FILE IS JUST FOR REFERENCE USE useLocalStorage HOOK INSTEAD DUMBASS
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// "use client";

// import { AtomEffect, DefaultValue, Loadable, RecoilState, RecoilValue, StoreID, WrappedValue, atom } from "recoil";
// import { getCookie, setCookie } from "cookies-next";

// const localStorageEffect: AtomEffect<any> = ({ setSelf, onSet, node }) => {
//   try {
//     const savedValue = localStorage.getItem(node.key);
//     if (savedValue != null) {
//       setSelf(JSON.parse(savedValue));
//     }
//   } catch (err) {
//     console.error(err);
//   }
//   onSet((newValue) => {
//     try {
//       localStorage.setItem(node.key, JSON.stringify(newValue));
//     } catch (err) {
//       console.error(err);
//     }
//   });
// };

// const sessionStorageEffect: AtomEffect<any> = ({ setSelf, onSet, node }) => {
//   try {
//     const savedValue = sessionStorage.getItem(node.key);
//     if (savedValue != null) {
//       setSelf(JSON.parse(savedValue));
//     }
//   } catch (err) {
//     console.error(err);
//   }
//   onSet((newValue) => {
//     try {
//       sessionStorage.setItem(node.key, JSON.stringify(newValue));
//     } catch (err) {
//       console.error(err);
//     }
//   });
// };

// const cookieEffect = (initialCookie: any) => {
//   const effect: AtomEffect<any> = ({ setSelf, onSet, node }) => {
//     try {
//       const cookie = getCookie(node.key);

//       if (cookie === undefined) {
//         setSelf(initialCookie);
//       } else {
//         setSelf(JSON.parse(cookie));
//       }
//     } catch (err) {
//       console.error(err);
//     }

//     onSet((newValue) => {
//       try {
//         setCookie(node.key, JSON.stringify(newValue), { expires: new Date(Date.now() + 3.154e10) });
//       } catch (err) {
//         console.error(err);
//       }
//     });
//   };

//   return effect;
// };

// // export const userAtom = atom<IUser>({
// //   key: "userAtom",
// //   default: null,
// //   effects_UNSTABLE: [localStorageEffect("userAtom")],
// // });

// export const previousPageAtom = atom<string>({
//   key: "previousPageAtom",
//   default: undefined,
//   effects: [sessionStorageEffect],
// });

// export const historyAtom = atom<string[]>({
//   key: "history",
//   default: [],
//   effects: [sessionStorageEffect],
// });

// export const selectedSeasonAtom = atom<number>({
//   key: "selectedSeason",
//   default: 0,
//   effects: [sessionStorageEffect],
// });

// // export const autoplayAtom = atom<boolean>({
// //   key: "autoplay",
// //   default: false,
// //   effects_UNSTABLE: [localStorageEffect("autoplay")],
// // });

// // export const showPatreonAtom = atom<boolean>({
// //   key: "patreon",
// //   default: true,
// //   effects_UNSTABLE: [localStorageEffect("patreon")],
// // });

// // export const oAuthProviderAtom = atom<PBAuthProvider>({
// //   key: "oa2_provider",
// //   default: null,
// //   effects_UNSTABLE: [localStorageEffect("oa2_provider")],
// // });
