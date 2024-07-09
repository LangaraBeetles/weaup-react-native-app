//converted other fields to string to avoid errors on hook form. TextInput only accepts strings
export type ChallengeInputType = {
  name: string;
  description: string;
  start_at: string;
  end_at: string;
  goal: string;
  duration: string;
  color: string;
  icon: string;
  status: ChallengeStatusType;

  step: CreateChallengeStep;
  url: string;
};

export type ChallengeType = {
  id: string;
  creator_id: string;
  name: string;
  description: string;
  start_at: Date;
  end_at: Date;
  goal: number;
  duration: number;
  color: string;
  icon: string;
  status: ChallengeStatusType;
  members: MemberType[];
};

export enum ChallengeStatusEnum {
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  FAILED = "failed",
  QUITTED = "quitted",
}

export type ChallengeStatusType = `${ChallengeStatusEnum}`;

export type MemberType = {
  user_id: string;
  joined_at: Date;
  left_at: Date | null;
};

type ChallengeUserType = {
  _id: string;
  daily_goal: number;
  device_id: string | null;
  email: string;
  hp: number;
  is_setup_complete: boolean;
  level: number;
  name: string;
  preferred_mode: string;
  provider_id: string;
  xp: number;
};

type ChallengeMemberType = {
  _id: string;
  joined_at: string;
  left_at: string | null;
  points: number;
  user: ChallengeUserType;
  user_id: string;
};

export type ChallengeIconType = "icon1" | "icon2" | "icon3";

export type ChallengeResponseType = {
  _id: string;
  color: string;
  icon: ChallengeIconType;
  creator_id: string;
  description: string;
  duration: number;
  end_at: string;
  goal: number;
  members: Array<ChallengeMemberType>;
  name: string;
  start_at: string;
  status: string;
};


export type CreateChallengeStep = "detail" | "goal" | "confirmation" | "result";