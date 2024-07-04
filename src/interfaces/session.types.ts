export enum SessionStatesEnum {
  ACTIVE = "ACTIVE",
  PAUSED = "PAUSED",
  INACTIVE = "INACTIVE",
}

export enum TimerStatesEnum {
  RUNNING = "RUNNING",
  PAUSED = "PAUSED",
  STOPPED = "STOPPED",
}

export type SessionStatesType = {
  SessionStatesEnum: `${SessionStatesEnum}`;
  TimerStatesEnum: `${TimerStatesEnum}`;
};
