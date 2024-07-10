import { UserBadgeType } from "./badges.types";

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
