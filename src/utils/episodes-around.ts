import ***REMOVED*** IEpisodeAround ***REMOVED*** from "../../src/types";
import ***REMOVED*** numberToNPlaces ***REMOVED*** from "../../src/utils";

const getEpisodesAround = (currentEpisodeCode: string) => ***REMOVED***
  try ***REMOVED***
    // const currentSeasonCode = currentEpisodeCode.substring(0, 3);
    const currentEpisode = parseInt(currentEpisodeCode.slice(-3));
    const next = currentEpisode + 1;
    const prev = currentEpisode - 1;

    if (currentEpisodeCode.includes("s01")) ***REMOVED***
      const prevEp = `s01.e$***REMOVED***numberToNPlaces(currentEpisode - 1)***REMOVED***`;
      const nextEp = `s01.e$***REMOVED***numberToNPlaces(currentEpisode + 1)***REMOVED***`;

      const response: IEpisodeAround = ***REMOVED***
        nextEp: next >= 1 && next <= 368 ? nextEp : null,
        prevEp: prev >= 1 && prev <= 368 ? prevEp : null,
  ***REMOVED***;

      return response;
***REMOVED*** else if (currentEpisodeCode.includes("s00")) ***REMOVED***
      const prevEp = `s00.e$***REMOVED***numberToNPlaces(currentEpisode - 1)***REMOVED***`;
      const nextEp = `s00.e$***REMOVED***numberToNPlaces(currentEpisode + 1)***REMOVED***`;

      const response: IEpisodeAround = ***REMOVED***
        nextEp: next >= 1 && next <= 14 ? nextEp : null,
        prevEp: prev >= 1 && prev <= 14 ? prevEp : null,
  ***REMOVED***;
      return response;
***REMOVED*** else ***REMOVED***
      return null;
***REMOVED***
***REMOVED*** catch (err) ***REMOVED***
    return null;
***REMOVED***
***REMOVED***;

export default getEpisodesAround;
