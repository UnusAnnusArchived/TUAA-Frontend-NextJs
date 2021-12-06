import dynamic from "next/dynamic";

// create dynamic import - React.FC mounts on client, not on server (since server doesnt have access to localStorage on client)
const NextEpisodeButtonDynamic = dynamic(() => import("./next-episode-button"), { ssr: false });

export default NextEpisodeButtonDynamic;
