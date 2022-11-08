import PocketBase from "pocketbase";
import endpoints from "./endpoints.json";

const pocketbase = new PocketBase(endpoints.pocketbase);

export default pocketbase;
