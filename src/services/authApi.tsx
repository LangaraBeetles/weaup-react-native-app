import config from "@src/config";
import axios from "axios";
import api from "./api";

export const googleAuth = async (code: string) => {
  const {
    data: { data },
  } = await axios.get(
    `${config.api_url}/auth/google/callback/?code=${encodeURIComponent(code)}`,
  );
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
