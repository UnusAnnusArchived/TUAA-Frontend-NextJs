import fs from "fs";
import config from "../../../../src/config.json";
import ***REMOVED*** handle404 ***REMOVED*** from "../../_handleErrors";
import axios from "axios";
import ***REMOVED*** NextApiRequest, NextApiResponse ***REMOVED*** from "next";
import ***REMOVED*** IVideo ***REMOVED*** from "../../../../src/types";

export default async function getvidpreviews(req: NextApiRequest, res: NextApiResponse) ***REMOVED***
  const split = (<string>req.query.video).toLowerCase().split(".");
  const season = split[0].replace("s", "");
  const episode = split[1].replace("e", "");

  const path = `$***REMOVED***config.metadataPath***REMOVED***/$***REMOVED***season***REMOVED***/$***REMOVED***episode***REMOVED***.json`;
  if (fs.existsSync(path)) ***REMOVED***
    const metadata: IVideo = JSON.parse(fs.readFileSync(path, "utf-8"));

    const previewLengthRequest = await axios.get(`https://cdn.unusann.us/$***REMOVED***season***REMOVED***/$***REMOVED***episode***REMOVED***/previews/length.txt`);
    const previewLength = parseInt(previewLengthRequest.data);
    if (!metadata.previewSprites) ***REMOVED***
      if (previewLengthRequest.status === 200) ***REMOVED***
        const previewSpriteRequest = await axios.get(`https://cdn.unusann.us/$***REMOVED***season***REMOVED***/$***REMOVED***episode***REMOVED***/previews/sprite.jpg`);
        let vttText = "WEBVTT\n\n";
        if (previewSpriteRequest.status === 200) ***REMOVED***
          for (let i = 0; i < previewLength; i++) ***REMOVED***
            vttText += `$***REMOVED***i + 1***REMOVED***\n$***REMOVED***genTime(i * 4)***REMOVED***.000 --> $***REMOVED***genTime(
              i * 4 + 4
            )***REMOVED***.000\nhttps://cdn.unusann.us/$***REMOVED***season***REMOVED***/$***REMOVED***episode***REMOVED***/previews/sprite.jpg#xywh=$***REMOVED***158 * i***REMOVED***,0,159,90\n\n`;
      ***REMOVED***
    ***REMOVED*** else ***REMOVED***
          for (let i = 0; i < previewLength; i++) ***REMOVED***
            const previewStr = `$***REMOVED***i + 1***REMOVED***`.padStart(8, "0");
            vttText += `$***REMOVED***i + 1***REMOVED***\n$***REMOVED***genTime(i * 4)***REMOVED***.000 --> $***REMOVED***genTime(
              i * 4 + 4
            )***REMOVED***.000\nhttps://cdn.unusann.us/$***REMOVED***season***REMOVED***/$***REMOVED***episode***REMOVED***/previews/$***REMOVED***previewStr***REMOVED***.jpg\n\n`;
      ***REMOVED***
    ***REMOVED***
        res.send(vttText);
  ***REMOVED*** else ***REMOVED***
        res.send("WEBVTT\n\n");
  ***REMOVED***
***REMOVED*** else ***REMOVED***
      let vttText = "WEBVTT\n\n";

      for (let i = 0; i < previewLength; i++) ***REMOVED***
        let currentSprite = `https://cdn.unusann.us/$***REMOVED***season***REMOVED***/$***REMOVED***episode***REMOVED***/previews/sprite01.jpg`;
        let currentSpriteX = 0;
        for (let ps = 0; ps < metadata.previewSprites.length; ps++) ***REMOVED***
          if (metadata.previewSprites[ps].length > i) ***REMOVED***
            currentSprite = metadata.previewSprites[ps].src;
            currentSpriteX = i - metadata.previewSprites[ps].length + metadata.previewSprites[0].length;
            break;
      ***REMOVED***
    ***REMOVED***
        vttText += `$***REMOVED***i + 1***REMOVED***\n$***REMOVED***genTime(i * 4)***REMOVED***.000 --> $***REMOVED***genTime(i * 4 + 4)***REMOVED***.000\n$***REMOVED***currentSprite***REMOVED***#xywh=$***REMOVED***
          158 * currentSpriteX
      ***REMOVED***0,158,90\n\n`;
  ***REMOVED***
      res.send(vttText);
***REMOVED***
***REMOVED*** else ***REMOVED***
    handle404(req, res);
***REMOVED***
***REMOVED***

function genTime(seconds: number): string ***REMOVED***
  return new Date(seconds * 1000).toISOString().substr(11, 8);
***REMOVED***
