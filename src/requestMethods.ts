import axios from "axios";

const BASE_URL = "https://zodiac-hub.onrender.com/api/v1";



export const publicRequest = axios.create({
  baseURL: BASE_URL,
  responseType: "json",
});
/*
const getToken = () => localStorage.getItem("token");

const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

userRequest.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
*/