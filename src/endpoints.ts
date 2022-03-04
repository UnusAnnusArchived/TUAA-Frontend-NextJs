const isDev = process.env.NODE_ENV === "development";

const endpoint = isDev ? "http://localhost:3000/api" : "https://unusann.us/api"; //process.env["localApiPort"] ? `http://localhost:${process.env["localApiPort"]}` : "https://api.unusann.us";
const localApi = isDev ? "http://localhost:3000/api" : "https://unusann.us/api";
const siteRoot = isDev ? "http://localhost:3000" : "https://unusann.us";

export { endpoint, localApi, siteRoot };
