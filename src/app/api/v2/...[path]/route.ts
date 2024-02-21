import { NextApiHandler } from "next";

const v1: NextApiHandler = (req, res) => {
  res.send({ error: "Deprecated" });
};

export default v1;
