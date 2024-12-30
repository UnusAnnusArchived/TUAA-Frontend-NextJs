import PocketBase from "pocketbase";
import endpoints from "@/endpoints.json";
import config from "@/config.json";

const pb = new PocketBase(endpoints.pocketbase);

pb.autoCancellation(false);

try {
  pb.admins.authWithPassword(config.pocketbase.email, config.pocketbase.password);
} catch {
  throw new Error("Failed to auth with pocketbase! Is the login valid? Is the server online?");
}

setTimeout(() => {
  try {
    pb.admins.authWithPassword(config.pocketbase.email, config.pocketbase.password);
  } catch {
    throw new Error("Failed to auth with pocketbase! Is the login valid? Is the server online?");
  }
}, 1209600000); // Reauth after 2 weeks when the authentication is invalidated

export default pb;
