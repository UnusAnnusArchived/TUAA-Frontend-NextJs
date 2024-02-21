"use server";

import fs from "fs/promises";
import config from "@/config.json";
import { IError } from "@/types";
import { z } from "zod";
import { Metadata, IMetadata } from "@/zodTypes";

interface GetAllMetadata {
  seasons: IMetadata[][];
  errors: (IError<z.typeToFlattenedError<IMetadata>> | IError<any>)[];
}

interface ProcessSeason {
  season: IMetadata[];
  errors: IError<z.typeToFlattenedError<IMetadata> | string>[];
}

const getAllMetadata: () => Promise<GetAllMetadata> = async () => {
  const processSeason: (path: string) => Promise<ProcessSeason> = async (path: string) => {
    let season: IMetadata[] = [];
    let errors: IError<z.typeToFlattenedError<IMetadata> | string>[] = [];

    try {
      const dir = await fs.readdir(path);

      for (let i = 0; i < dir.length; i++) {
        try {
          const unparsedEpisode = JSON.parse(await fs.readFile(`${path}/${dir[i]}`, "utf-8"));

          const parsedEpisode = await Metadata.safeParseAsync(unparsedEpisode);

          if (parsedEpisode.success) {
            const episode = parsedEpisode.data;

            season.push(episode);
          } else {
            errors.push({ location: `${path}/${dir[i]}`, error: parsedEpisode.error.flatten() });
          }
        } catch (err: any) {
          errors.push({ location: `${path}/${dir[i]}`, error: err.toString() });
        }
      }

      return { season, errors };
    } catch (err: any) {
      return {
        season: [],
        errors: [...errors, { location: path, error: err.toString() }],
      };
    }
  };

  try {
    let seasons: IMetadata[][] = [];
    let errors: IError<z.typeToFlattenedError<IMetadata> | string>[] = [];

    const dir = await fs.readdir(config.metadataPath);

    for (let i = 0; i < dir.length; i++) {
      if ((await fs.stat(`${config.metadataPath}/${dir[i]}`)).isDirectory()) {
        const { season, errors: newErrors } = await processSeason(`${config.metadataPath}/${dir[i]}`);
        seasons.push(season);
        errors.push(...newErrors);
      }
    }

    return { seasons, errors };
  } catch (err: any) {
    return {
      seasons: [],
      errors: [{ location: config.metadataPath, error: err.toString() }],
    };
  }
};

export default getAllMetadata;
