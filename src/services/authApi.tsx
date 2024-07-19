import api from "./api";

export const googleAuth = async (code: string) => {
  const {
    data: { data },
  } = await api.get(`/auth/google/callback/?code=${encodeURIComponent(code)}`);
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
