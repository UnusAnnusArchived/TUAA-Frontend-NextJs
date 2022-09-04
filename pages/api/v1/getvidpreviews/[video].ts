import fs from "fs";
import config from "../../../../src/config.json";
import { handle404 } from "../../_handleErrors";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { IVideo } from "../../../../src/types";

export default async function getvidpreviews(req: NextApiRequest, res: NextApiResponse) {
  const split = (<string>req.query.video).toLowerCase().split(".");
  const season = split[0].replace("s", "");
  const episode = split[1].replace("e", "");

  const path = `${config.metadataPath}/${season}/${episode}.json`;
  if (fs.existsSync(path)) {
    res.setHeader("Content-Type", "text/vtt");

    const metadata:IVideo = JSON.parse(fs.readFileSync(path, "utf-8"));

    const previewLengthRequest = await axios.get(`https://cdn.unusann.us/${season}/${episode}/previews/length.txt`);
    const previewLength = parseInt(previewLengthRequest.data);
    if (!metadata.previewSprites) {
      if (previewLengthRequest.status === 200) {
        const previewSpriteRequest = await axios.get(`https://cdn.unusann.us/${season}/${episode}/previews/sprite.jpg`);
        let vttText = "WEBVTT\n\n";
        if (previewSpriteRequest.status === 200) {
          for (let i = 0; i < previewLength; i++) {
            vttText += `${i+1}\n${genTime(i*4)}.000 --> ${genTime((i*4)+4)}.000\nhttps://cdn.unusann.us/${season}/${episode}/previews/sprite.jpg#xywh=${158*i},0,159,90\n\n`;
          }
        } else {
          for (let i = 0; i < previewLength; i++) {
            const previewStr = `${i+1}`.padStart(8, "0");
            vttText += `${i+1}\n${genTime(i*4)}.000 --> ${genTime((i*4)+4)}.000\nhttps://cdn.unusann.us/${season}/${episode}/previews/${previewStr}.jpg\n\n`;
          }
        }
        res.send(vttText);
      } else {
        res.send("WEBVTT\n\n");
      }
    } else {
      let vttText = "WEBVTT\n\n";

      for (let i = 0; i < previewLength; i++) {
        let currentSprite = `https://cdn.unusann.us/${season}/${episode}/previews/sprite01.jpg`;
        let currentSpriteX = 0;
        for (let ps = 0; ps < metadata.previewSprites.length; ps++) {
          if (metadata.previewSprites[ps].length > i) {
            currentSprite = metadata.previewSprites[ps].src;
            currentSpriteX = (i-metadata.previewSprites[ps].length)+metadata.previewSprites[0].length;
            break;
          }
        }
        vttText += `${i+1}\n${genTime(i*4)}.000 --> ${genTime((i*4)+4)}.000\n${currentSprite}#xywh=${158*currentSpriteX},0,158,90\n\n`;
      }
      res.send(vttText);
    }
  } else {
    handle404(req, res);
  }
}

function genTime(seconds:number):string {
  return new Date(seconds*1000).toISOString().substr(11, 8);
}
