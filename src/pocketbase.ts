import PocketBase from "pocketbase";
import config from "./config.json";

const pocketbase = new PocketBase(config.pocketbase.host);

export default pocketbase;
