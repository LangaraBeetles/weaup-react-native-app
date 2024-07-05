import api from "@src/services/api";

const route = "/notifications";

export const getNotifications = async (userId: string) => {
  const { data } = await api.get(`${route}?user_id=${userId}`);

  return data;
};
