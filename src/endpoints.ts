const isDev = process.env.NODE_ENV === "development";

const endpoint = isDev ? "http://localhost:3000/api" : "https://unusann.us/api"; //process.env["localApiPort"] ? `http://localhost:$***REMOVED***process.env["localApiPort"]***REMOVED***` : "https://api.unusann.us";
const localApi = isDev ? "http://localhost:3000/api" : "https://unusann.us/api";
const siteRoot = isDev ? "http://localhost:3000" : "https://unusann.us";
const cdn = process.env["cdn"] ?? "https://usc1.contabostorage.com/a7f68355d8c442d8a7a1076a0ac5d924:videos";

export ***REMOVED*** endpoint, localApi, siteRoot, cdn ***REMOVED***;
