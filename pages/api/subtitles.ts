import type ***REMOVED*** NextApiRequest, NextApiResponse ***REMOVED*** from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => ***REMOVED***
  try ***REMOVED***
    let url = req.query.url.toString();

    if (url.startsWith("http")) ***REMOVED***
      url.replace("http://", "https://");
***REMOVED***

    if (!url.startsWith("https")) ***REMOVED***
      url = "https:" + url;
***REMOVED***

    if (!url || url.length < 1) ***REMOVED***
      res.status(400).json(***REMOVED*** error: "url is required" ***REMOVED***);
      return;
***REMOVED***

    if (!url.startsWith("https://cdn.unusann.us/subs") || !url.startsWith("https://cdn.unusannusarchive.tk/subs")) ***REMOVED***
      res.status(403).json(***REMOVED*** error: "Unauthorized website/path!" ***REMOVED***);
      return;
***REMOVED***

    const subtitles = await fetch(url);

    if (!subtitles.ok) ***REMOVED***
      res.status(500).json(***REMOVED*** error: "Server error" ***REMOVED***);
      return;
***REMOVED***

    const text = await subtitles.text();

    res.setHeader("Content-Type", "text/vtt");
    res.setHeader("Access-Control-Allow-Origin", "unusann.us");
    res.status(200).send(text);
***REMOVED*** catch (error) ***REMOVED***
    console.log(error);
    res.status(500).json(***REMOVED*** error: "Server error" ***REMOVED***);
***REMOVED***
***REMOVED***;

export default handler;
