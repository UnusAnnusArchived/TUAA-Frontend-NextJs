const isDev = process.env.NODE_ENV === "development";

const endpoint = process.env["localApiPort"] ? `http://localhost:${process.env["localApiPort"]}` : "https://api.unusann.us";
const localApi = isDev ? "http://localhost:3000/api" : "https://unusann.us/api";

export { endpoint, localApi };
