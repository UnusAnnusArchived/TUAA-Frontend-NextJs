import bunny from "@/bunny";
import config from "@/config.json";
import { AxiosRequestConfig } from "axios";

const getBunnyEpisode = async (guid: string, axiosConfig?: AxiosRequestConfig) => {
  return await bunny.library(config.bunny.libraryId).video(guid).info(axiosConfig);
};

export default getBunnyEpisode;
