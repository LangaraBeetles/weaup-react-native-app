import axios from "axios";

import { useUser } from "@state/useUser";
import config from "@src/config";

const api = axios.create({
  baseURL: config.api_url,
});

api.interceptors.request.use(
  (request) => {
    const token = useUser.getState().user.token;
    const authToken = `Bearer ${token}`;
    request.headers.Authorization = authToken;

    return request;
  },
  (error) => {
    console.error(`Request error ${error}`);
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error(`Response error ${error}`);
    return Promise.reject(error);
  },
);

export default api;
