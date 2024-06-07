export enum SessionStatesEnum {
  START = "START",
  PAUSE = "PAUSE",
  STOP = "STOP",
  CANCEL = "CANCEL",
  INIT = "INIT",
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
