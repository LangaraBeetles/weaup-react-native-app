import { PostureData } from "@src/interfaces/posture.types";
import api from "@src/services/api";
import dayjs from "dayjs";

const route = "analytics";

export const getAnalytics = async (date: string) => {
  const start_date = dayjs(date ?? "").format("YYYY-MM-DD");
  const { data } = await api.get<{ data: PostureData }>(`${route}`, {
    params: {
      start_date,
      end_date: start_date,
    },
  });
  return data.data;
};
