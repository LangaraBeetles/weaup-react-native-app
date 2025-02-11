import { source } from "../components/ui/Avatar";
import { UserAvatar } from "./user.types";

//converted other fields to string to avoid errors on hook form. TextInput only accepts strings
export type ChallengeInputType = {
  id?: string;

  name: string;
  description: string;
  start_at: string;
  end_at: string;
  goal: string;
  duration: string;
  color: string;
  icon: ChallengeIconType;
  status: ChallengeStatusType;

  step: CreateChallengeStep;
  url: string;
};

export type ChallengeType = {
  _id: string;
  creator_id: string;
  name: string;
  description: string;
  start_at: string;
  end_at: string;
  goal: number;
  duration: number;
  color: string;
  icon: "icon1" | "icon2" | "icon3";
  status: ChallengeStatusType;
  members: MemberType[];
  url: string;
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
  points: number;
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
  avatar_bg: UserAvatar;
  avatar_img: keyof typeof source;
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
