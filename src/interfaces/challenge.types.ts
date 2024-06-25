export type ChallengeType = {
  id: string;
  creator_id: string;
  name: string;
  description: string | null;
  start_at: Date;
  end_at: Date; // out of 100
  goal: number;
  duration: number;
  status: ChallengeStatusType;
  members: MemberType[] | null;
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
