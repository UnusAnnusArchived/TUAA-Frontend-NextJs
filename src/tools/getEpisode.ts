import fs from "fs/promises";
import config from "@/config.json";
import { IMetadata, Metadata } from "@/zodTypes";

const getEpisode = async (uaid: string) => {
  try {
    const [[_, season, episode]] = uaid.matchAll(/^s(\d\d)\.e(\d\d\d)$/g);

    const metadata: IMetadata = JSON.parse(
      await fs.readFile(`${config.metadataPath}/${season}/${episode}.json`, "utf-8")
    );

    const parsedMetadata = await Metadata.safeParseAsync(metadata);

    if (parsedMetadata.success) {
      return JSON.stringify(parsedMetadata.data);
    } else {
      throw JSON.stringify({
        location: `${config.metadataPath}/${season}/${episode}.json`,
        error: parsedMetadata.error.flatten(),
      });
    }
  } catch (err: any) {
    console.log(err);
    throw err.toString();
  }
};

export default getEpisode;
