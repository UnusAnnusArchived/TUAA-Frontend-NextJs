export type IVideo = {
  _metadata_version?: 1 | 2 | 3;
  video?: string;
  season: number;
  episode: number;
  title: string;
  description: string;
  releasedate?: number;
  thumbnail?: string;
  sources?: IMetadataV2Source[] | IMetadataV3Source[];
  tracks?: IMetadataV2Track[];
  posters?: IMetadataV2Poster[];
  date?: number;
  duration?: number;
  audio?: IMetadataV3Audio[];
  captions?: IMetadataV3Caption[];
  thumbnails?: IMetadataV3Thumbnails;
  previewSprites?: any;
};

export type Seasons<T extends IMetadataV1 | IMetadataV2 | IMetadataV3 | IVideo> = [T[], T[]];

export type IMetadataV1 = {
  _metadata_version: 1;
  video: string;
  season: number;
  episode: number;
  title: string;
  description: string;
  releasedate: number;
  thumbnail: string;
};

export type IMetadataV2 = {
  _metadata_version: 2;
  sources: IMetadataV2Source[];
  tracks: IMetadataV2Track[];
  posters: IMetadataV2Poster[];
  season: number;
  episode: number;
  title: string;
  description: string;
  date: number;
  duration?: number;
};

export type IMetadataV2Source = {
  src: string;
  type: string;
  size: number;
};

export type IMetadataV2Track = {
  kind: string;
  label: string;
  srclang: string;
  src: string;
};

export type IMetadataV2Poster = {
  src: string;
  type: string;
  size?: number;
};

export type IMetadataV3 = {
  _metadata_version: 3;
  sources: Array<IMetadataV3Source>;
  audio: IMetadataV3Audio[];
  captions: IMetadataV3Caption[];
  thumbnails: IMetadataV3Thumbnails;
  season: number;
  episode: number;
  title: string;
  description: string;
  date: number;
  duration?: number;
};

export type IMetadataV3Source = IMetadataV3TUAASource | IMetadataV3EmbedSource | IMetadataV3DirectSource;

export type IMetadataV3TUAASource = {
  type: "tuaa";
  id: string;
  resolutions: IMetadataV3TUAASourceResolution[];
};

export type IMetadataV3EmbedSource = {
  type: "embed";
  id: string;
  name: string;
  src: string;
};

export type IMetadataV3DirectSource = {
  type: "direct";
  id: string;
  name: string;
  resolutions: IMetadataV3DirectSourceResolution[];
};

export type IMetadataV3DirectSourceResolution = {
  src: string;
  size: number;
};

export type IMetadataV3TUAASourceResolution = {
  src: string;
  size: number;
};

export type IMetadataV3Audio = {
  lang: string;
  label: string;
  src: string;
  default: boolean;
};

export type IMetadataV3Caption = {
  label: string;
  srclang: string;
  src: string;
  default: boolean;
};

export type IMetadataV3Thumbnails = {
  avif: IMetadataV3Thumbnail;
  webp: IMetadataV3Thumbnail;
  jpg: IMetadataV3Thumbnail;
};

export type IMetadataV3Thumbnail = {
  src: string;
  size?: number;
};

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
  id: string;
  created: string;
  updated: string;
  email: string;
  lastResetSentAt: string;
  verified: boolean;
  lastVerificationSentAt: string;
  profile: {
    "@collectionId": string;
    "@collectionName": string;
    created: string;
    updated: string;
    userId: string;
    id: string;
    name: string;
    avatar: string;
    legacy_id: string;
    emails_account: boolean;
    emails_updates: boolean;
  };
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

export interface PBAuthMethodsList {
  [key: string]: any;
  usernamePassword: boolean;
  emailPassword: boolean;
  authProviders: PBAuthProvider[];
}

export interface PBAuthProvider {
  name: string;
  state: string;
  codeVerifier: string;
  codeChallenge: string;
  codeChallengeMethod: string;
  authUrl: string;
}

export type IColorScheme = "light" | "dark";
