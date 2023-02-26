import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";

const buildInfo = (req: NextApiRequest, res: NextApiResponse) => {
  if (fs.existsSync("build.json")) {
    res.send(JSON.parse(fs.readFileSync("build.json", "utf-8")));
  } else {
    res.send({ build: 0, date: 0 });
  }
};

export default buildInfo;
