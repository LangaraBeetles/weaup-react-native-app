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
};

export enum TrackingModeEnum {
  PHONE = "PHONE",
  EARBUDS = "EARBUDS",
}

export type TrackingModeType = `${TrackingModeEnum}`;
