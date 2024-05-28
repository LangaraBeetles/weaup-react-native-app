export type UserType = {
  deviceIds: Array<string>;
  currentDeviceId: string | null;
  name: string;
  dailyGoal: number; // out of 100
};
