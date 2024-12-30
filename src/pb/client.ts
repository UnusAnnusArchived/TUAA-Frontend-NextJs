import PocketBase from "pocketbase";
import endpoints from "@/endpoints.json";

const pb = new PocketBase(endpoints.pocketbase);

pb.autoCancellation(false);

export default pb;
