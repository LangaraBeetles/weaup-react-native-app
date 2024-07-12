import api from "./api";
import { PostureSessionInput } from "@src/interfaces/posture.types";

const route = "/posture/sessions";

export const saveSessionRecords = async (session: PostureSessionInput) => {
  const { data } = await api.post(route, session);

  return data;
};

interface PostureRecord {
  good_posture: boolean;
  recorded_at: string;
}

interface SessionData {
  __v: number;
  _id: string;
  createdAt: string;
  duration: number;
  ended_at: string;
  records: PostureRecord[];
  score: number;
  started_at: string;
  total_bad: number;
  total_good: number;
  total_records: number;
  updatedAt: string;
  user_id: string;
  xp: {
    initial: number;
    final: number;
  };
}

export const getSessionById = async (sessionId: string) => {
  const { data } = await api.get<{ data: SessionData }>(
    `${route}/${sessionId}`,
  );

  return data.data;
};
