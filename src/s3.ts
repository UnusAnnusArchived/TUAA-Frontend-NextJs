import { S3 } from "@aws-sdk/client-s3";
import config from "./config.json";

const s3 = new S3(config.s3);

export default s3;
