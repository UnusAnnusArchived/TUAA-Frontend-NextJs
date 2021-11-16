export const numberToNPlaces = (num: number, places: number = 3): string => {
  const str = num.toString();
  let pad = "";
  for (let i = 0; i < places; i++) {
    pad += "0";
  }
  return pad.substring(0, pad.length - str.length) + str;
};
