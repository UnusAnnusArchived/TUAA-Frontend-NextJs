import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import s3 from "../../../src/s3";
import type { NextApiHandler } from "next";

const getpath: NextApiHandler = async (req, res) => {
  try {
    let key = req.query.key as string;
    if (key.startsWith("/")) {
      key = key.substring(1);
    }

    const command = new GetObjectCommand({
      Bucket: "videos",
      Key: key,
    });

    const signedUrl = await getSignedUrl(s3, command, {
      expiresIn: 86400, // 24 hours - longest video is 12 hours so we want it available for at least that amount of time
    });

    res.redirect(signedUrl);
  } catch (err) {
    res.status(500).send(err);
  }
};

export default getpath;
