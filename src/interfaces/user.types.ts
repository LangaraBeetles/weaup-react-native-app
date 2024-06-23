export type UserType = {
  deviceIds: Array<string>;
  currentDeviceId: string | null;
  name: string;
  dailyGoal: number; // out of 100
  providerId: string;
};

export enum TrackingModeEnum {
  PHONE = "PHONE",
  EARBUDS = "EARBUDS",
}

export type TrackingModeType = `${TrackingModeEnum}`;
