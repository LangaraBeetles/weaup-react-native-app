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
};

export enum TrackingModeEnum {
  PHONE = "PHONE",
  EARBUDS = "EARBUDS",
}

export type TrackingModeType = `${TrackingModeEnum}`;
