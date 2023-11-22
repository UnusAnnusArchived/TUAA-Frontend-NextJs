"use server";

import getAllMetadata from "@/tools/getAllMetadata";
import { IMetadata } from "@/zodTypes";

const getResults = async (query: string, page: number = 1, itemsPerPage: number = 12) => {
  const { seasons } = await getAllMetadata();

  let results: IMetadata[] = [];
  for (let s = 0; s < seasons.length; s++) {
    const season = seasons[s];

    for (let e = 0; e < season.length; e++) {
      const episode = season[e];

      if (
        episode.title.toLowerCase().includes(query.toLowerCase()) ||
        episode.description.toLowerCase().includes(query.toLowerCase()) ||
        `s${episode.season.toString().padStart(2, "0")}.e${episode.episode.toString().padStart(3, "0")}` ===
          query.toLowerCase()
      ) {
        results.push(episode);
      }
    }
  }

  const paginatedResults: IMetadata[] = [];

  for (let i = page - 1 * itemsPerPage; i < page * itemsPerPage; i++) {
    paginatedResults.push(results[i]);
  }

  return paginatedResults;
};

export default getResults;
