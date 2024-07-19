import api from "./api";
import { PostureSessionInput, Session } from "@src/interfaces/posture.types";

const route = "/posture/sessions";

export const saveSessionRecords = async (session: PostureSessionInput) => {
  const { data } = await api.post(route, session);

  return data;
};

export const getSessionById = async (sessionId: string) => {
  const { data } = await api.get(`${route}/${sessionId}`);

  return data;
};

export const getAllSessions = async (): Promise<Session[]> => {
  const response = await api.get(route);
  return response.data.data;
};
