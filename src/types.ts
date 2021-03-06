import type { Source as PlyrSource, Track as PlyrTrack } from "plyr";

export interface IVideo {
  season: number;
  episode: number;
  title: string;
  description: string;
  date?: number;
  releasedate?: number;
  duration: number;
  sources?: PlyrSource[];
  video?: string;
  tracks: PlyrTrack[];
  posters?: IVideoPoster[];
  thumbnail?: string;
  previewSprites?: IVideoPreviewSprite[];
}

interface IVideoPreviewSprite {
  src: string;
  length: number;
}

interface IVideoPoster {
  src: string;
  type: string;
}

export type Season = IVideo[];
export type Seasons = Season[];

export interface IEpisodeAround {
  nextEp?: string;
  prevEp?: string;
}

export interface ChangePFPResponse {
  status?: "success" | string;
  error?: "Not logged in!" | string;
}
export interface IComment {
  episode: string;
  uid: string;
  comment: CommentBody;
  stats: CommentStats;
  user: CommentUser;
}
export interface CommentBody {
  plaintext: string;
  html: string;
}
export interface CommentStats {
  published: number;
  likes: number;
  dislikes: number;
}
export interface CommentUser {
  id: string;
  username: string;
  pfp: IUserPFP;
}

export interface IStoredComment {
  id?: string;
  episode: string;
  uid: string;
  user?: CommentUser;
  comment: CommentBody;
  stats: CommentStats;
}

export interface IUserPFP {
  originalFilename: string;
  filename: string;
  width: number;
  height: number;
  format: "image/jpeg";
}

export interface LoginResponse {
  isValid?: boolean;
  loginKey?: string;
  user?: LimitedUser;
}

export interface LimitedUser {
  id: string;
  email: string;
  username: string;
  pfp: IUserPFP;
}

export interface LogoutResponse {
  status: "success" | "error";
  error?: "Account does not exist!" | string;
}

export interface PostCommentResponse {
  status?: "success";
  comment?: IComment;
  error?: {
    code: 3 | "401" | number | string;
    message: "Invalid message length!" | "Unauthorized!" | string;
  };
}

export interface CheckLoginKeyResponse {
  isValid: boolean;
  user?: LimitedUser;
}

export interface SignupResponse {
  success: boolean;
  loginURI?: "/api/v2/account/login";
  error?: {
    code: 0 | 1 | 2 | number;
    message: "Passwords do not match!" | "Account exists!" | "Missing info!" | string;
  };
}

export interface ILanguage {
  name: string;
  code: string;
}

export interface IRokuFeed {
  providerName: "The Unus Annus Archive";
  lastUpdated: string;
  language: "en";
  playlists: IRokuPlaylist[];
  series: IRokuSeries[];
}

export interface IRokuPlaylist {
  name: "Specials" | "Season 1";
  itemIds: string[];
}

export interface IRokuSeries {
  id: "UnusAnnus";
  title: "Unus Annus";
  seasons: IRokuSeason[];
  genres: ["comedy"];
  thumbnail: "https://cdn.unusann.us/roku-assets/series-thumbnail.jpg";
  releaseDate: "2019-11-15";
  shortDescription: "What would you do if you only had a year left to live? Would you squander the time you were given? Or would you make every second count? Welcome to Unus Annus. In exactly 365 days this channel will be...";
  longDescription: "What would you do if you only had a year left to live? Would you squander the time you were given? Or would you make every second count? Welcome to Unus Annus. In exactly 365 days this channel will be deleted along with all of the daily uploads accumulated since then. Nothing will be saved. Nothing will be reuploaded. This is your one chance to join us at the onset of our adventure. To be there from the beginning. To make every second count. Subscribe now and relish what little time we have left or have the choice made for you as we disappear from existence forever. But remember... everything has an end. Even you. Memento mori. Unus annus.";
}

export interface IRokuSeason {
  seasonNumber: "0" | "1";
  episodes: IRokuEpisode[];
}

export interface IRokuEpisode {
  id: string;
  title: string;
  content: {
    dateAdded: string;
    videos: IRokuVideo[];
    duration: number;
    captions: IRokuCaption[];
    language: "en";
  };
  thumbnail: string;
  releaseDate: string;
  episodeNumber: number;
  shortDescription: string;
  longDescription?: string;
}

export interface IRokuVideo {
  url: string;
  quality: "SD" | "HD" | "FHD" | "UHD";
  videoType: string;
}

export interface IRokuCaption {
  url: string;
  language: string;
  captionType: "SUBTITLE";
}

export interface ISwiftMetadata {
  specials: IVideo[];
  season1: IVideo[];
}

export interface IUser {
  id: string;
  email: string;
  username: string;
  hash: string;
  salt: string;
  pfp: IUserPFP;
  loginKeys: string[];
  isAdmin?: boolean;
}
