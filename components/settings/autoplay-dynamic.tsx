import dynamic from "next/dynamic";

// create dynamic import - React.FC mounts on client, not on server (since server doesnt have access to localStorage on client)
const AutoplayDynamic = dynamic(() => import("./autoplay"), { ssr: false });

export default AutoplayDynamic;
