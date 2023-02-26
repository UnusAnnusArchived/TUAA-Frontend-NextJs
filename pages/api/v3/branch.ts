import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";

const branch = (req: NextApiRequest, res: NextApiResponse) => {
  if (fs.existsSync("branch.json")) {
    res.send(JSON.parse(fs.readFileSync("branch.json", "utf-8")));
  } else {
    res.send({ branch: "Unknown Branch" });
  }
};

export default branch;
