import { UserType } from "@src/interfaces/user.types";
import api from "./api";

export const googleAuth = async (code: string, user: UserType) => {
  const {
    data: { data },
  } = await api.get(`/auth/google/callback/`, {
    params: {
      code: encodeURIComponent(code),
      user: user,
    },
  });
  return data;
};

export const impersonate = async (email: string) => {
  const { data } = await api.get(`/mock/impersonate`, {
    params: {
      email,
    },
  });

  return data?.data;
};
