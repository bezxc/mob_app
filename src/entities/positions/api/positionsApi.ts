import { z } from "zod";
import { api } from "@/shared/api/baseApi";
import { IGetAllQueryParams } from "@/shared/types/types";
import { positionsGetAllResponseSchema } from "../model/apiSchema";

const ZUP_URL = process.env.EXPO_PUBLIC_ZUP_API_URL;

interface IGetPositionsListQueryParams extends IGetAllQueryParams {
  name__ilike?: string;
}

export const getPositionsList = async ({
  page,
  size,
  name__ilike,
}: IGetPositionsListQueryParams) => {
  const params = new URLSearchParams();

  if (page) {
    params.append("page", String(page));
  }
  if (size) {
    params.append("size", String(size));
  }

  if (name__ilike) {
    params.append("name__ilike", name__ilike);
  }
  return api({
    type: "private",
    method: "GET",
    path: `${ZUP_URL}/positions?${params}`,
    requestSchema: z.void(),
    responseSchema: positionsGetAllResponseSchema,
  })();
};
