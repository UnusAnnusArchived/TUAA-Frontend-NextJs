import { Record } from "pocketbase";

export enum Collection {
  Users = "users",
  Apps = "apps",
  Comments = "comments",
  Patreons = "patreons",
  Releases = "releases",
  TicketTags = "ticket_tags",
  Tickets = "tickets",
  UserPlaylists = "user_playlists",
  VideoProgress = "video_progress",
}

export type IVideo = {
  _metadataVersion: 3;
  sources: ISource[];
  uaid: string;
  season: number;
  episode: number;
  title: string;
  description: string;
  date: number;
  isLast?: boolean;
};

export type ISource = {
  type: "bunny";
  bunnyId: string;
};

export type Seasons = [IVideo[], IVideo[]];

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

export interface IPlaylist extends Record {
  user: string;
  name: string;
  description?: string;
  episodes: string;
  public: boolean;
  isFavorites: boolean;
}

export interface IUser extends Record {
  username: string;
  email?: string;
  emailVisability: boolean;
  verified: boolean;
  name: string;
  avatar: string;
  emails_account: boolean;
  emails_updates: boolean;
  isAdmin: boolean;
}

export interface EpisodeLinks {
  baseUrl: string;
  hls: string;
  directPlay: string;
  thumbnail: string;
  preview: string;
}
