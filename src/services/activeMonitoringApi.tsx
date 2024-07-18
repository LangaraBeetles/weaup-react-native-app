import api from "./api";
import { activeMonitoringType } from "@src/interfaces/activemonitoring.types";

const route = "active_monitoring";

const getActiveMonitoring = async () => {
  const { data } = await api.get(route);
  return data;
};

const saveActiveMonitoring = async (activeMonitoring: activeMonitoringType) => {
  const { data } = await api.post(route, activeMonitoring);
  return data;
};

export { getActiveMonitoring, saveActiveMonitoring };
