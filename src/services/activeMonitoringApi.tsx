import api from "./api";
import { activeMonitoringType } from "@src/interfaces/activemonitoring.types";

const route = "active_monitoring";

const getActiveMonitoring = async (userId?: string) => {
  const { data } = await api.get(route, {
    params: { user_id: userId },
  });
  return data;
};

const saveActiveMonitoring = async (activeMonitoring: activeMonitoringType) => {
  console.log("activeMonitoring:", activeMonitoring);
  const { data } = await api.post(route, activeMonitoring);
  return data;
};

export { getActiveMonitoring, saveActiveMonitoring };
