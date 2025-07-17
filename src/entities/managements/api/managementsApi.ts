import { z } from "zod";
import { api } from "@/shared/api/baseApi";
import { IGetAllQueryParams } from "@/shared/types/types";
import { managementsGetAllResponseSchema } from "../model/apiSchema";

const ZUP_URL = process.env.EXPO_PUBLIC_ZUP_API_URL;

interface IGetManagementsListQueryParams extends IGetAllQueryParams {
  name__ilike?: string;
}

export const getManagementsList = async (
  queryParams: IGetManagementsListQueryParams,
) => {
  const params = new URLSearchParams(
    Object.entries(queryParams).reduce(
      (acc, [key, value]) => {
        if (value !== undefined && value !== "") {
          acc[key] = String(value);
        }
        return acc;
      },
      {} as Record<string, string>,
    ),
  );

  return api({
    type: "private",
    method: "GET",
    path: `${ZUP_URL}/managements?${params}`,
    requestSchema: z.void(),
    responseSchema: managementsGetAllResponseSchema,
  })();
};
