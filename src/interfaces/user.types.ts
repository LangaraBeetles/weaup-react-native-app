import { source } from "../components/ui/Avatar";
import { UserBadgeType } from "./badges.types";

export type UserAvatar =
  | "blue1"
  | "blue2"
  | "yellow1"
  | "yellow2"
  | "red1"
  | "red2"
  | "gray1";

export type UserType = {
  id: string;
  deviceId: string;
  name: string;
  email: string;
  dailyGoal: number; // out of 100
  providerId: string;
  level: number;
  xp: number;
  hp: number;
  preferredMode: TrackingModeType;
  dailyStreakCounter: number;
  token: string | null;
  isSetupComplete: boolean;
  avatar_bg: UserAvatar;
  avatar_img: keyof typeof source;
  badges: UserBadgeType[];
};

export enum TrackingModeEnum {
  phone = "phone",
  earbuds = "earbuds",
}

export type TrackingModeType = `${TrackingModeEnum}`;

export type UserInputType = {
  name: string;
  preferred_mode: `${TrackingModeEnum}`;
  daily_goal: number;
  is_setup_complete: boolean;
  device_id: string;
  xp: number;
  hp: number;
  level: number;
  daily_streak_counter: number;
  badges: UserBadgeType[];
};
