const isDev = process.env.NODE_ENV === "development";

const endpoint = process.env["localApiPort"] ? `http://localhost:$***REMOVED***process.env["localApiPort"]***REMOVED***` : "https://api.unusann.us";
const localApi = isDev ? "http://localhost:3000/api" : "https://unusann.us/api";

export ***REMOVED*** endpoint, localApi ***REMOVED***;
