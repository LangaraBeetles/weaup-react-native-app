import api from "./api";

const route = "/auth/refresh";

export const refreshToken = async (token: string) => {
  const { data } = await api.post(`${route}/${token}`);

  return data;
};
