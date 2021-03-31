import axios from "axios";
import { getAccessToken } from "./tokenService";
import { login } from "../hooks/useAuth";

axios.defaults.baseURL = "https://api.spotify.com/v1";

axios.interceptors.request.use(
  req => {
    const accessToken = getAccessToken();

    if (accessToken) {
      req.headers["Authorization"] = "Bearer " + accessToken;
    }

    return req;
  },
  error => {
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    if (response.status === 401) {
      login();
    }

    return response.data;
  },
  error => {
    Promise.reject(error);
  }
);
