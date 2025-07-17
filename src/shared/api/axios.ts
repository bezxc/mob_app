import axios, {
  AxiosError,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig,
} from "axios";
import { $auth, removeUserCredentials, setTokens } from "./auth.store";

const AUTH_URL = process.env.EXPO_PUBLIC_AUTH_API_URL;

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const getRefreshToken = async (refreshToken: string, login: string) => {
  return await axios.post(`${AUTH_URL}/refresh`, {
    refresh_token: refreshToken,
    login,
  });
};

const baseConfig: CreateAxiosDefaults = {
  baseURL: `${AUTH_URL}`,
  withCredentials: true,
};

export const instanceWithoutInterceptors = axios.create(baseConfig);
export const instance = axios.create(baseConfig);

instance.interceptors.request.use(
  (config) => {
    const accessToken = $auth.getState().accessToken;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest: CustomAxiosRequestConfig | undefined = error.config;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const { refreshToken, login } = $auth.getState();
        const response = await getRefreshToken(refreshToken, login);

        console.log("СТУХЛО И ВОНЯЕТ :>>", originalRequest);

        const { data } = response;

        originalRequest.headers.Authorization = `Bearer ${data.access_token}`;

        setTokens({
          accessToken: data.access_token,
          refreshToken: data.refresh_token,
          infoToken: data.info_token,
        });

        return instance(originalRequest);
      } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 403) {
          console.log("object :>>", error);
          removeUserCredentials();
          return;
        }
      }
    }

    return Promise.reject(error);
  },
);
