import type ***REMOVED*** NextApiRequest, NextApiResponse ***REMOVED*** from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => ***REMOVED***
  try ***REMOVED***
    let url = req.query.url.toString();

    if (!url.startsWith("https")) ***REMOVED***
      url = "https:" + url;
***REMOVED***

    if (!url || url.length < 1) ***REMOVED***
      res.status(400).json(***REMOVED*** error: "url is required" ***REMOVED***);
      return;
***REMOVED***

    const subtitles = await fetch(url);

    if (!subtitles.ok) ***REMOVED***
      res.status(500).json(***REMOVED*** error: "Server error" ***REMOVED***);
      return;
***REMOVED***

    const text = await subtitles.text();

    res.setHeader("Content-Type", "text/vtt");
    res.status(200).send(text);
***REMOVED*** catch (error) ***REMOVED***
    console.log(error);
    res.status(500).json(***REMOVED*** error: "Server error" ***REMOVED***);
***REMOVED***
***REMOVED***;

export default handler;
