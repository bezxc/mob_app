import { z } from "zod";
import { api } from "@/shared/api/baseApi";
import { HistoriesResponseSchema } from "../model/schema";

const ZUP_URL_V2 = process.env.EXPO_PUBLIC_ZUP_API_URL_V2;

export const getUserHistories = (id: string) =>
  api({
    type: "private",
    method: "GET",
    path: `${ZUP_URL_V2}/histories/${id}`,
    requestSchema: z.void(),
    responseSchema: HistoriesResponseSchema,
  })();
