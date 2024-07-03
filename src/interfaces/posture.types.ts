export type PostureStatus = "good" | "mid" | "bad" | "not_reading";

export type PostureRecordInput = {
  good_posture: boolean;
  recorded_at: string;
};

interface SessionRecord {
  _id: string;
  user_id: string;
  good_posture: boolean;
  recorded_at: string;
  createdAt: string;
  updatedAt: string;
}

interface Session {
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

interface HourlyRecord {
  hour: string;
  records: Array<SessionRecord>;
  count: number;
  score: number | null;
}

export interface PostureData {
  start_date: string;
  end_date: string;
  overview: {
    good_posture_count: number;
    bad_posture_count: number;
  };
  records_by_hour: Array<HourlyRecord>;
  total_corrections: number;
  sessions: Array<Session>;
}
