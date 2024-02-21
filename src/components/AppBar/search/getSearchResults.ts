"use server";

import getAllMetadata from "@/tools/getAllMetadata";
import { IMetadata } from "@/zodTypes";
import Fuse from "fuse.js";

const getSearchResults = async (query: string) => {
  const { seasons } = await getAllMetadata();

  let episodes: IMetadata[] = seasons.flat();

  const fuse = new Fuse(episodes, {
    keys: ["title", "description", "uaid"],
    findAllMatches: true,
  });

  const results = fuse.search(query);

  return results
    .map((result) => {
      return result.item;
    })
    .slice(0, 60);
};

export default getSearchResults;
