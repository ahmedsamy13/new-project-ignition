// ─── Pre-configured Axios Instance ─────────────────────────────────
// All API calls should use this instance instead of raw axios.
// It provides base URL, interceptors, and auth token injection.

import axios from "axios";
import { env } from "@/shared/config/env";
import { APP_CONSTANTS } from "@/shared/config/constants";

export const apiClient = axios.create({
  baseURL: env.VITE_API_BASE_URL,
  timeout: 15_000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ─── Request Interceptor: Attach auth token ────────────────────────
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(APP_CONSTANTS.STORAGE_KEYS.AUTH_TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ─── Response Interceptor: Normalize errors ────────────────────────
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      localStorage.removeItem(APP_CONSTANTS.STORAGE_KEYS.AUTH_TOKEN);
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);
