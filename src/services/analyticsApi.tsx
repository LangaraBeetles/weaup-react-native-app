import { PostureData } from "@src/interfaces/posture.types";
import api from "@src/services/api";
import dayjs from "dayjs";

const route = "analytics";

export const getAnalytics = async (start?: string, end?: string) => {
  const start_date = dayjs(start ?? "").format("YYYY-MM-DD");
  const end_date = dayjs(end ?? "").format("YYYY-MM-DD");

  console.log(start_date, end_date);
  const { data } = await api.get<{ data: PostureData }>(`${route}`, {
    params: {
      start_date,
      end_date,
    },
  });
  return data.data;
};
