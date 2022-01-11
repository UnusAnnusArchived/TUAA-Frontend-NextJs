import type ***REMOVED*** NextApiRequest, NextApiResponse ***REMOVED*** from "next";

export function handle401(req: NextApiRequest, res: NextApiResponse) ***REMOVED***
  res.status(401).send(***REMOVED***
    error: ***REMOVED***
      number: 401,
      code: "ERRDENIED",
      message: "401 Unauthorized! You do not have access to the requested resource."
***REMOVED***
***REMOVED***);
***REMOVED***

export function handle404(req: NextApiRequest, res: NextApiResponse) ***REMOVED***
  res.status(404).send(***REMOVED***
    error: ***REMOVED***
      number: 404,
      code: "ERRNOTFOUND",
      message: "404 Not Found! The resource you are trying to access does not exist."
***REMOVED***
***REMOVED***);
***REMOVED***

export function handle500(err: Error, req: NextApiRequest, res: NextApiResponse) ***REMOVED***
  res.status(500).send(***REMOVED***
    error: ***REMOVED***
      number: 500,
      code: "ERRINTERNAL",
      message: "500 Internal Server Error! The server was unable to complete your request due to a configuration error.",
      stack: err.stack
***REMOVED***
***REMOVED***);
***REMOVED***
