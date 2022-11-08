import fs from "fs";
import { handle404, handle500 } from "../../../../_handleErrors";
import { cdn } from "../../../../../../src/endpoints.json";
import { metadataPath } from "../../../../../../src/config.json";
import type { NextApiHandler } from "next";
import type { IVideo } from "../../../../../../src/types";

const torrentSource: NextApiHandler = (req, res) => {
  const season = req.query.season.toString();
  const uaid = req.query.episode.toString();
  const episode = uaid.split(".")[1].substring(1);

  try {
    const metadata: IVideo = JSON.parse(fs.readFileSync(`${metadataPath}/${seasons[season]}/${episode}.json`, "utf-8"));

    if (metadata.video) {
      return res.redirect(`${cdn}${metadata.video}`);
    }

    res.redirect(`${cdn}${metadata.sources[0].src}`);
  } catch (err) {
    if (err.code === "ENOENT") {
      return handle404(req, res);
    }

    handle500(err, req, res);
  }
};

const seasons = {
  Specials: "00",
  "Season 1": "01",
};

export default torrentSource;
