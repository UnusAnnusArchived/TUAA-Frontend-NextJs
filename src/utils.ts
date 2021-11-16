export const numberToNPlaces = (num: number, places: number = 3): string => ***REMOVED***
  const str = num.toString();
  let pad = "";
  for (let i = 0; i < places; i++) ***REMOVED***
    pad += "0";
***REMOVED***
  return pad.substring(0, pad.length - str.length) + str;
***REMOVED***;
