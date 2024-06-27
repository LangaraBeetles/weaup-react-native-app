export type UserType = {
  id: string;
  deviceIds: Array<string>;
  currentDeviceId: string | null;
  name: string;
  dailyGoal: number; // out of 100
  providerId: string;
  level: number;
  xp: number;
  hp: number;
  daily_streak_counter: number;
  token: string | null;
  email: string | null;
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
};
