export type PostureStatus = "good" | "mid" | "bad" | "not_reading";

export type PostureRecordInput = {
  good_posture: boolean;
  recorded_at: string;
};
