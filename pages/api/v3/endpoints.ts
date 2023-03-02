import { NextApiHandler } from "next";
import endpoints from "../../../src/endpoints.json";

const buildInfo: NextApiHandler = (req, res) => {
  res.send(endpoints);
};

export default buildInfo;
