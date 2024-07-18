import api from "./api";

export const googleAuth = async (code: string) => {
  const {
    data: { data },
  } = await api.get(`/auth/google/callback/?code=${encodeURIComponent(code)}`);
  return data;
};
