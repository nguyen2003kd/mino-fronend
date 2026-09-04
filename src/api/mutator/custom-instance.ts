import axios, {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";
import useAuthStore from "@/stores/auth";
import baseConfig from "../../configs/base";

const mainAxiosInstance = axios.create({
  baseURL: baseConfig.backendDomain,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
mainAxiosInstance.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().access_token;

  if (accessToken) {
    config.headers.set("Authorization", `Bearer ${accessToken}`);
  }

  return config;
});
mainAxiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Handle 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Clear auth data and redirect to login
      if (typeof window !== "undefined") {
        const isAuthPage =
          window.location.pathname.startsWith("/login") ||
          window.location.pathname.startsWith("/register") ||
          window.location.pathname.startsWith("/forgot-password");

        // Only redirect if not on auth pages
        if (!isAuthPage) {
          useAuthStore.getState().resetStore();
          localStorage.removeItem("auth-store");
          window.location.href = "/login";
        }
      }
    }

    // Handle other errors
    const errorMessage =
      (error.response?.data as Record<string, unknown>)?.message ||
      error.message ||
      "An unexpected error occurred";

    return Promise.reject({
      status: error.response?.status,
      message: errorMessage,
      data: error.response?.data,
    });
  },
);
export function mainInstance<T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> {
  return mainAxiosInstance
    .request<T>({
      ...config,
      ...options,
      headers: {
        ...config.headers,
        ...options?.headers,
      },
    })
    .then((response) => response.data);
}
