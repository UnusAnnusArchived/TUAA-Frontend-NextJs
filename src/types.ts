import type { JSX } from "react";
export type Layout<P = undefined> = (props: {
  children: React.ReactNode;
  params: P;
}) => JSX.Element | Promise<JSX.Element>;

export interface IError<T = any> {
  location: string;
  error: T;
}

export enum Collection {
  Users = "users",
  Apps = "apps",
  Comments = "comments",
  Meta = "meta",
  Patreons = "patreons",
  Releases = "releases",
  TicketTags = "ticket_tags",
  Tickets = "tickets",
  UserPlaylists = "user_playlists",
  VideoProgress = "video_progress",
}

export interface PBRecord {
  id: string;
  created: string;
  updated: string;
  [key: string]: string | number | boolean;
}

export type WithExpand<T extends PBRecord, E extends { [key in keyof T]?: Partial<PBRecord> }> = T & {
  expand: E;
};

export interface Comment extends PBRecord {
  episode: string;
  markdown: string;
  user: string;
  isEdited: boolean;
}

export interface User extends PBRecord {
  username: string;
  email: string;
  emailVisibility: boolean;
  verified: boolean;
  name: string;
  avatar: string;
  emails_account: boolean;
  emails_updates: boolean;
  isAdmin: boolean;
  lang: "en" | "cs" | "fil" | "fr" | "de" | "es" | "sv" | "";
}
