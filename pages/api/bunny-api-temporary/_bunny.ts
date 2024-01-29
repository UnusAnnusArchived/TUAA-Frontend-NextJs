import BunnyStream from "bunny-stream";
import config from "../../../src/config.json";

const bunny = new BunnyStream(config.bunny.accessKey);

export default bunny;
