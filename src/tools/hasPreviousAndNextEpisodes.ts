"use server";

import episodeExists from "./episodeExists";
import fs from "fs/promises";
import config from "@/config.json";

const hasPreviousAndNextEpisodes = async (season: number, episode: number, isLast: boolean) => {
  if (isLast) {
    // Next episode is in next season
    return [episodeExists(season, episode - 1), episodeExists(season + 1, 1)];
  } else if (episode === 1) {
    // Previous episode is in previous season
    // Find how many episodes are in the previous season
    const dirPath = `${config.metadataPath}/${(season - 1).toString().padStart(2, "0")}`;
    const dir = await fs.readdir(dirPath);
    return [episodeExists(season - 1, dir.length), episodeExists(season, episode + 1)];
  } else {
    // Same season
    return [episodeExists(season, episode - 1), episodeExists(season, episode + 1)];
  }
};
