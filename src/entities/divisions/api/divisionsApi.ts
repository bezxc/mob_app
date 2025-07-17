import { z } from "zod";
import { api } from "@/shared/api/baseApi";
import { IGetAllQueryParams } from "@/shared/types/types";
import {
  divisionsGetAllResponseSchema,
  divisionsGetAllResponseV2Schema,
} from "../model/apiSchema";

const ZUP_URL = process.env.EXPO_PUBLIC_ZUP_API_URL;
const ZUP_URL_V2 = process.env.EXPO_PUBLIC_ZUP_API_URL_V2;

interface IGetDivisionsListQueryParams extends IGetAllQueryParams {
  name__ilike?: string;
}

export const getDivisionsList = async ({
  page,
  size,
  name__ilike,
}: IGetDivisionsListQueryParams) => {
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
    path: `${ZUP_URL}/divisions?${params}`,
    requestSchema: z.void(),
    responseSchema: divisionsGetAllResponseSchema,
  })();
};

export const getDivisionsListV2 = async (
  queryParams: IGetDivisionsListQueryParams,
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
    path: `${ZUP_URL_V2}/divisions?${params}`,
    requestSchema: z.void(),
    responseSchema: divisionsGetAllResponseV2Schema,
  })();
};
