import type { Source as PlyrSource, Track as PlyrTrack } from "plyr";
import { Record } from "pocketbase";

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
  size: number;
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

export interface IComment extends Partial<Record> {
  episode: string;
  markdown: string;
  user: string;
  isEdited: boolean;
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

export interface IUser extends Partial<Record> {
  avatar: string;
  email: string;
  emailVisibility: boolean;
  emails_account: boolean;
  emails_updates: boolean;
  isAdmin: boolean;
  name: string;
  username: string;
  verified: boolean;
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
