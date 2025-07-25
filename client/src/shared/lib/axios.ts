import axios, { AxiosError } from "axios";
import clientEnv from "./clientEnv";

const api = axios.create({
  baseURL: clientEnv.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Add token from localStorage to every request
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

interface AxiosErrorResponse {
  message: string;
  statusCode: number;
  errors: { field: string; message: string }[];
  stack: null;
}

export function isAxiosErrorWithResponse(
  error: unknown
): error is AxiosError<AxiosErrorResponse> {
  return axios.isAxiosError(error) && error.response !== undefined;
}

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
