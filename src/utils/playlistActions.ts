import pb from "../pocketbase";
import { Collection, IPlaylist, IUser } from "../types";

export const addVideoToPlaylist = async (user: IUser, videoId: string, playlistId: string) => {
  let playlist: IPlaylist;

  if (playlistId === "favorites") {
    try {
      playlist = await pb.collection(Collection.UserPlaylists).getFirstListItem<IPlaylist>("isFavorites=true");
    } catch {
      playlist = await handleCreateFavorites(user);
    }
  } else {
    try {
      playlist = await pb.collection(Collection.UserPlaylists).getOne<IPlaylist>(playlistId);
    } catch {
      throw new Error(`Failed to fetch playlist with ID ${playlistId}!`);
    }
  }

  let episodes = playlist.episodes.split(",");
  let videoExists = false;
  for (let i = 0; i < episodes.length; i++) {
    if (episodes[i].includes(videoId)) {
      videoExists = true;
      break;
    }
  }
  if (videoExists) {
    throw new Error("Video exists in playlist!");
  } else {
    episodes.push(videoId);
    try {
      await pb.collection(Collection.UserPlaylists).update<IPlaylist>(playlist.id, {
        episodes: episodes.join(","),
      } as IPlaylist);
    } catch {
      throw new Error("Failed to update collection!");
    }
  }
};

export const removeVideoFromPlaylist = async (user: IUser, videoId: string, playlistId: string) => {
  let playlist: IPlaylist;

  if (playlistId === "favorites") {
    try {
      playlist = await pb.collection(Collection.UserPlaylists).getFirstListItem<IPlaylist>("isFavorites=true");
    } catch {
      playlist = await handleCreateFavorites(user);
    }
  } else {
    try {
      playlist = await pb.collection(Collection.UserPlaylists).getOne<IPlaylist>(playlistId);
    } catch {
      throw new Error(`Failed to fetch playlist with ID ${playlistId}!`);
    }
  }

  let episodes = playlist.episodes.split(",");
  let videoExists = false;
  let videoIndex: number;
  for (let i = 0; i < episodes.length; i++) {
    if (episodes[i].includes(videoId)) {
      videoExists = true;
      videoIndex = i;
      break;
    }
  }
  if (videoExists) {
    episodes.splice(videoIndex, 1);
    try {
      await pb.collection(Collection.UserPlaylists).update<IPlaylist>(playlist.id, {
        episodes: episodes.join(","),
      } as IPlaylist);
    } catch {
      throw new Error("Failed to update collection!");
    }
  } else {
    throw new Error("Video does not exist in playlist!");
  }
};

export const handleCreateFavorites = async (user: IUser) => {
  return await pb.collection(Collection.UserPlaylists).create<IPlaylist>({
    user: user.id,
    name: `${user.name}'s Favorites`,
    description: "",
    episodes: "",
    public: false,
    isFavorites: true,
  } as IPlaylist);
};

export const handleCreatePlaylist = async (user: IUser, name: string, description: string, isPublic: boolean) => {
  return await pb.collection(Collection.UserPlaylists).create({
    user: user.id,
    name,
    description,
    episodes: "",
    public: isPublic,
    isFavorites: false,
  } as IPlaylist);
};
