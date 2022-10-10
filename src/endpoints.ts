import config from "./config.json";
import fs from "fs";

let branchId;
if (fs.existsSync("branch.json")) {
  const branch = JSON.parse(fs.readFileSync("branch.json", "utf-8"));
  branchId = branch.branchId;
}

const isDev = process.env.NODE_ENV === "development";

const endpoint = isDev
  ? "http://localhost:3000/api"
  : branchId === "beta"
  ? "https://beta.unusann.us/api"
  : "https://unusann.us/api";
const localApi = isDev ? "http://localhost:3000/api" : "https://unusann.us/api";
const siteRoot = isDev ? "http://localhost:3000" : "https://unusann.us";
const cdn = process.env["cdn"] ?? "https://usc1.contabostorage.com/a7f68355d8c442d8a7a1076a0ac5d924:videos";
const db = config.pocketbase.host;

export { endpoint, localApi, siteRoot, cdn, db };
