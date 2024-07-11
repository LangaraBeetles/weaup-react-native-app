import config from "@src/config";
import axios from "axios";

export const googleAuth = async (code: string) => {
  const {
    data: { data },
  } = await axios.get(
    `${config.api_url}/auth/google/callback/?code=${encodeURIComponent(code)}`,
  );
  return data;
};
