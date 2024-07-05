import api from "./api";
import { PostureSessionInput } from "@src/interfaces/posture.types";

const route = "/posture/sessions";

export const saveSessionRecords = async (session: PostureSessionInput) => {
  const { data } = await api.post(route, session);

  return data;
};
