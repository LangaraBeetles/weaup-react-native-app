import { UserInputType } from "@src/interfaces/user.types";
import api from "@src/services/api";

const route = "/user";

export const updateUser = async (
  userId: string,
  user: Partial<UserInputType>,
) => {
  const { data } = await api.patch(`${route}/${userId}`, user);

  return data;
};

export const getUserById = async (id: string) => {
  const response = await api.get(`${route}/${id}`);
  return response.data;
};
