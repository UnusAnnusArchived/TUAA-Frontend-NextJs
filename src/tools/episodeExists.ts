"use server";

import fs from "fs";
import config from "@/config.json";

const episodeExists = (season: number, episode: number) => {
  const path = `${config.metadataPath}/${season.toString().padStart(2, "0")}/${episode
    .toString()
    .padStart(3, "0")}.json`;

  return fs.existsSync(path);
};

export default episodeExists;
