import axios from "axios";

import { useUser } from "@state/useUser";
import config from "@src/config";

const api = axios.create({
  baseURL: config.api_url_local ?? config.api_url,
});

api.interceptors.request.use(
  (request) => {
    const token = useUser.getState().user.token;
    const authToken = `Bearer ${token}`;
    request.headers.Authorization = authToken;
    // console.log({ token });
    console.log(`${request.baseURL}${request.url}`);

    return request;
  },
  (error) => {
    console.log(`Request error ${error}`);
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(`Response error ${error}`);
    return Promise.reject(error);
  },
);

export default api;
