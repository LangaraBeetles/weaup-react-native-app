import api from "./api";
import dayjs from "dayjs";
import { activeMonitoringType } from "@src/interfaces/activemonitoring.types";

const route = "active_monitoring";

const getActiveMonitoring = async (start?: string, end?: string) => {
  const start_date = dayjs(start ?? "").format("YYYY-MM-DD");
  const end_date = dayjs(end ?? "").format("YYYY-MM-DD");

  const { data } = await api.get(route, {
    params: {
      start_date,
      end_date,
    },
  });

  return data.data;
};

const saveActiveMonitoring = async (activeMonitoring: activeMonitoringType) => {
  const { data } = await api.post(route, activeMonitoring);
  return data;
};

export { getActiveMonitoring, saveActiveMonitoring };
