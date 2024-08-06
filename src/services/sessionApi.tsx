import api from "./api";
import dayjs from "dayjs";
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

export const getAllSessions = async (start?: string, end?: string) => {
  const start_date = dayjs(start ?? "").format("YYYY-MM-DD");
  const end_date = dayjs(end ?? "").format("YYYY-MM-DD");

  const response = await api.get<{ data: Session[] }>(route, {
    params: {
      start_date,
      end_date,
    },
  });
  return response.data.data;
};
