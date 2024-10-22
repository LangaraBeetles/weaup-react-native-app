export type PostureStatus = "good" | "mid" | "bad" | "not_reading";

export type PostureRecordInput = {
  good_posture: boolean;
  recorded_at: string;
  score: number;
};

export type PostureSessionRecord = {
  good_posture: boolean;
  recorded_at: string;
};

export type PostureSessionInput = {
  started_at: string;
  ended_at: string;
  score: number;
  dailyStreakCounter: number;
  records: Array<PostureSessionRecord>;
  xp: {
    initial: number;
    final: number;
  };
};

interface SessionRecord {
  _id: string;
  user_id: string;
  good_posture: boolean;
  recorded_at: string;
  createdAt: string;
  updatedAt: string;
}

export interface Session {
  _id: string;
  user_id: string;
  started_at: string;
  ended_at: string;
  total_good: number;
  total_bad: number;
  total_records: number;
  score: number | null;
  duration: string;
  createdAt: string;
  updatedAt: string;
}

export interface Record {
  key: string;
  records: Array<SessionRecord>;
  count: number;
  score: number | null;
}

export interface PostureData {
  term: "day" | "week" | "month";
  start_date: string;
  end_date: string;
  overview: {
    good_posture_count: number;
    bad_posture_count: number;
  };
  records_by_term: Array<Record>;
  total_corrections: number;
  sessions: Array<Session>;
}
