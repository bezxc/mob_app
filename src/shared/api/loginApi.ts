import { z } from "zod";
import { api } from "@/shared/api/baseApi";

const AUTH_URL = process.env.EXPO_PUBLIC_AUTH_API_URL;

export const login = api({
  method: "POST",
  type: "public",
  path: `${AUTH_URL}/login`,
  requestSchema: z.object({
    login: z.string(),
    password: z.string(),
  }),
  responseSchema: z.object({
    access_token: z.string(),
    info_token: z.string(),
    refresh_token: z.string(),
  }),
});

export const logOut = (refresh_token: string) => {
  const params = new URLSearchParams();

  if (refresh_token) {
    params.append("refresh_token", refresh_token);
  }

  return api({
    method: "POST",
    type: "public",
    path: `${AUTH_URL}/logout?${params}`,
    requestSchema: z.void(),
    responseSchema: z.null(),
  })();
};
