import type ***REMOVED*** Source as PlyrSource, Track as PlyrTrack ***REMOVED*** from "plyr";

export interface IVideo ***REMOVED***
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
***REMOVED***

interface IVideoPreviewSprite ***REMOVED***
  src: string;
  length: number;
***REMOVED***

interface IVideoPoster ***REMOVED***
  src: string;
  type: string;
  size: number;
***REMOVED***

export type Season = IVideo[];
export type Seasons = Season[];

export interface IEpisodeAround ***REMOVED***
  nextEp?: string;
  prevEp?: string;
***REMOVED***

export interface ChangePFPResponse ***REMOVED***
  status?: "success" | string;
  error?: "Not logged in!" | string;
***REMOVED***
export interface IComment ***REMOVED***
  episode: string;
  uid: string;
  comment: CommentBody;
  stats: CommentStats;
  user: CommentUser;
***REMOVED***
export interface CommentBody ***REMOVED***
  plaintext: string;
  html: string;
***REMOVED***
export interface CommentStats ***REMOVED***
  published: number;
  likes: number;
  dislikes: number;
***REMOVED***
export interface CommentUser ***REMOVED***
  id: string;
  username: string;
  pfp: IUserPFP;
***REMOVED***

export interface IStoredComment ***REMOVED***
  id?: string;
  episode: string;
  uid: string;
  user?: CommentUser;
  comment: CommentBody;
  stats: CommentStats;
***REMOVED***

export interface IUserPFP ***REMOVED***
  originalFilename: string;
  filename: string;
  width: number;
  height: number;
  format: "image/jpeg";
***REMOVED***

export interface LoginResponse ***REMOVED***
  isValid?: boolean;
  loginKey?: string;
  user?: LimitedUser;
***REMOVED***

export interface LimitedUser ***REMOVED***
  id: string;
  email: string;
  username: string;
  pfp: IUserPFP;
***REMOVED***

export interface LogoutResponse ***REMOVED***
  status: "success" | "error";
  error?: "Account does not exist!" | string;
***REMOVED***

export interface PostCommentResponse ***REMOVED***
  status?: "success";
  comment?: IComment;
  error?: ***REMOVED***
    code: 3 | "401" | number | string;
    message: "Invalid message length!" | "Unauthorized!" | string;
***REMOVED***;
***REMOVED***

export interface CheckLoginKeyResponse ***REMOVED***
  isValid: boolean;
  user?: LimitedUser;
***REMOVED***

export interface SignupResponse ***REMOVED***
  success: boolean;
  loginURI?: "/api/v2/account/login";
  error?: ***REMOVED***
    code: 0 | 1 | 2 | number;
    message: "Passwords do not match!" | "Account exists!" | "Missing info!" | string;
***REMOVED***;
***REMOVED***

export interface ILanguage ***REMOVED***
  name: string;
  code: string;
***REMOVED***

export interface IRokuFeed ***REMOVED***
  providerName: "The Unus Annus Archive";
  lastUpdated: string;
  language: "en";
  playlists: IRokuPlaylist[];
  series: IRokuSeries[];
***REMOVED***

export interface IRokuPlaylist ***REMOVED***
  name: "Specials" | "Season 1";
  itemIds: string[];
***REMOVED***

export interface IRokuSeries ***REMOVED***
  id: "UnusAnnus";
  title: "Unus Annus";
  seasons: IRokuSeason[];
  genres: ["comedy"];
  thumbnail: "https://cdn.unusann.us/roku-assets/series-thumbnail.jpg";
  releaseDate: "2019-11-15";
  shortDescription: "What would you do if you only had a year left to live? Would you squander the time you were given? Or would you make every second count? Welcome to Unus Annus. In exactly 365 days this channel will be...";
  longDescription: "What would you do if you only had a year left to live? Would you squander the time you were given? Or would you make every second count? Welcome to Unus Annus. In exactly 365 days this channel will be deleted along with all of the daily uploads accumulated since then. Nothing will be saved. Nothing will be reuploaded. This is your one chance to join us at the onset of our adventure. To be there from the beginning. To make every second count. Subscribe now and relish what little time we have left or have the choice made for you as we disappear from existence forever. But remember... everything has an end. Even you. Memento mori. Unus annus.";
***REMOVED***

export interface IRokuSeason ***REMOVED***
  seasonNumber: "0" | "1";
  episodes: IRokuEpisode[];
***REMOVED***

export interface IRokuEpisode ***REMOVED***
  id: string;
  title: string;
  content: ***REMOVED***
    dateAdded: string;
    videos: IRokuVideo[];
    duration: number;
    captions: IRokuCaption[];
    language: "en";
***REMOVED***;
  thumbnail: string;
  releaseDate: string;
  episodeNumber: number;
  shortDescription: string;
  longDescription?: string;
***REMOVED***

export interface IRokuVideo ***REMOVED***
  url: string;
  quality: "SD" | "HD" | "FHD" | "UHD";
  videoType: string;
***REMOVED***

export interface IRokuCaption ***REMOVED***
  url: string;
  language: string;
  captionType: "SUBTITLE";
***REMOVED***

export interface ISwiftMetadata ***REMOVED***
  specials: IVideo[];
  season1: IVideo[];
***REMOVED***

export interface IUser ***REMOVED***
  id: string;
  email: string;
  username: string;
  hash: string;
  salt: string;
  pfp: IUserPFP;
  loginKeys: string[];
  isAdmin?: boolean;
***REMOVED***
