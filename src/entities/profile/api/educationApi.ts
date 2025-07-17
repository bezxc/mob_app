import { z } from "zod";
import { api } from "@/shared/api/baseApi";
import { EducationSchema } from "../model/schema";

const ZUP_URL = process.env.EXPO_PUBLIC_ZUP_API_URL;

export const getEducationInfo = async (id: string) =>
  api({
    type: "private",
    method: "GET",
    path: `${ZUP_URL}/educations/uid/${id}`,
    requestSchema: z.void(),
    responseSchema: EducationSchema,
  })();
