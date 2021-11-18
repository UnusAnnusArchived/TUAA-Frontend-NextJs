import type ***REMOVED*** Source as PlyrSource, Track as PlyrTrack ***REMOVED*** from "plyr";

export interface IVideo ***REMOVED***
  season: number;
  episode: number;
  title: string;
  description: string;
  date: number;
  duration: number;
  sources: PlyrSource[];
  tracks: PlyrTrack[];
  posters?: IVideoPoster[];
  thumbnail?: string;
***REMOVED***

interface IVideoPoster ***REMOVED***
  src: string;
  type: string;
***REMOVED***

export type Season = IVideo[];
export type Seasons = Season[];

export interface IEpisodeAround ***REMOVED***
  nextEp?: string;
  prevEp?: string;
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
  pfp: UserPFP;
***REMOVED***

export interface UserPFP ***REMOVED***
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
  pfp: UserPFP;
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