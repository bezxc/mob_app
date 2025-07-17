import { z } from "zod";
import { api } from "@/shared/api/baseApi";
import { UserSchema } from "../model/schema";

const ZUP_URL_V2 = process.env.EXPO_PUBLIC_ZUP_API_URL_V2;

export const getUserInfo = (id: string) =>
  api({
    type: "private",
    method: "GET",
    path: `${ZUP_URL_V2}/users/${id}`,
    requestSchema: z.void(),
    responseSchema: UserSchema,
  })();
