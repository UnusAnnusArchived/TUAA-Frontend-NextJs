import type { NextApiRequest, NextApiResponse } from "next";
import { cdn } from "../../src/endpoints";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let url = req.query.url.toString();

    if (url.startsWith("http")) {
      url.replace("http://", "https://");
    }

    if (!url.startsWith("https")) {
      url = "https:" + url;
    }

    if (!url || url.length < 1) {
      res.status(400).json({ error: "url is required" });
      return;
    }

    if (
      !url.startsWith(`${cdn}/subs`) ??
      !url.startsWith("https://cdn.unusann.us/subs") ??
      !url.startsWith("https://cdn.unusannusarchive.tk/subs")
    ) {
      res.status(403).json({ error: "Unauthorized website/path!" });
      return;
    }

    const subtitles = await fetch(url);

    if (!subtitles.ok) {
      res.status(500).json({ error: "Server error" });
      return;
    }

    const text = await subtitles.text();

    res.setHeader("Content-Type", "text/vtt");
    res.setHeader("Access-Control-Allow-Origin", "unusann.us");
    res.status(200).send(text);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

export default handler;
