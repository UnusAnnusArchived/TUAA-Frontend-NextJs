import { NextApiRequest, NextApiResponse } from "next";
import bunny from "../_bunny";
import config from "../../../../src/config.json";

const getBunnyEpisode = async (req: NextApiRequest, res: NextApiResponse) => {
  const guid = req.query.guid as string;

  res.send(await bunny.library(config.bunny.libraryId).video(guid).info());
};

export default getBunnyEpisode;
