import type { NextApiRequest, NextApiResponse } from "next";
import { IEpisodeAround } from "../../src/types";
import { numberToNPlaces } from "../../src/utils";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const currentEpisodeCode = req.query.episode.toString();
    // const currentSeasonCode = currentEpisodeCode.substring(0, 3);
    const currentEpisode = parseInt(currentEpisodeCode.slice(-3));
    const next = currentEpisode + 1;
    const prev = currentEpisode - 1;

    if (currentEpisodeCode.includes("s01")) {
      const prevEp = `s01.e${numberToNPlaces(currentEpisode - 1)}`;
      const nextEp = `s01.e${numberToNPlaces(currentEpisode + 1)}`;

      const response: IEpisodeAround = {
        nextEp: next >= 1 && next <= 368 ? nextEp : null,
        prevEp: prev >= 1 && prev <= 368 ? prevEp : null,
      };

      res.status(200).json(response);
    } else if (currentEpisodeCode.includes("s00")) {
      const prevEp = `s00.e${numberToNPlaces(currentEpisode - 1)}`;
      const nextEp = `s00.e${numberToNPlaces(currentEpisode + 1)}`;

      const response: IEpisodeAround = {
        nextEp: next >= 1 && next <= 14 ? nextEp : null,
        prevEp: prev >= 1 && prev <= 14 ? prevEp : null,
      };
      res.status(200).json(response);
    } else {
      res.status(404).json(null);
    }
  } catch (err) {
    res.status(500).json(null);
  }
};

export default handler;
