import { z } from "zod";
import { api } from "@/shared/api/baseApi";
import { IGetAllQueryParams } from "@/shared/types/types";
import { formatDateWithTime } from "@/shared/utils";
import {
  colleaguesBirthdaysGetAllResponseSchema,
  colleaguesBirthdaysGetAllResponseSchemaV2,
  colleaguesGetAllResponseSchema,
  colleaguesGetAllResponseSchemaV2,
  colleaguesItemSchema,
  colleaguesItemSchemaV2,
  currentHistories,
} from "../model/apiSchema";

const ZUP_URL = process.env.EXPO_PUBLIC_ZUP_API_URL_V2;
const ZUP_URL_V2 = process.env.EXPO_PUBLIC_ZUP_API_URL_V2;

interface IGetColleaguesListQueryParams extends IGetAllQueryParams {
  full_name__ilike?: string;
  home_phone__ilike?: string;
  position_guid?: string;
  organization_guid?: string;
  division_guid?: string;
  management_guid?: string;
}

interface IGetColleaguesListQueryParamsV2
  extends IGetColleaguesListQueryParams {
  department_guid?: string;
  work_phone__ilike?: string;
  internal_phone__ilike?: string;
  type_of_event__not_in?: string;
}

interface IGetColleagueInfo {
  kan_uid: string;
}

export const getColleaguesList = async ({
  page,
  size,
  order_by,
  full_name__ilike,
  home_phone__ilike,
  division_guid,
  organization_guid,
  position_guid,
}: IGetColleaguesListQueryParams) => {
  const params = new URLSearchParams();

  if (page) {
    params.append("page", String(page));
  }
  if (size) {
    params.append("size", String(size));
  }
  if (order_by) {
    params.append("order_by", String(order_by));
  }
  if (full_name__ilike) {
    params.append("full_name__ilike", full_name__ilike);
  }
  if (home_phone__ilike) {
    params.append("home_phone__ilike", home_phone__ilike);
  }
  if (position_guid) {
    params.append("position_guid", position_guid);
  }
  if (division_guid) {
    params.append("division_guid", division_guid);
  }
  if (organization_guid) {
    params.append("organization_guid", organization_guid);
  }

  return api({
    type: "private",
    method: "GET",
    path: `${ZUP_URL}/users?${params}`,
    requestSchema: z.void(),
    responseSchema: colleaguesGetAllResponseSchema,
  })();
};

export const getColleaguesListV2 = async (
  queryParams: IGetColleaguesListQueryParamsV2,
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
    path: `${ZUP_URL_V2}/users?${params}`,
    requestSchema: z.void(),
    responseSchema: colleaguesGetAllResponseSchemaV2,
  })();
};

export const getColleagueInfo = async ({ kan_uid }: IGetColleagueInfo) => {
  return api({
    type: "private",
    method: "GET",
    path: `${ZUP_URL}/users/${kan_uid}`,
    requestSchema: z.void(),
    responseSchema: colleaguesItemSchema,
  })();
};

export const getColleagueInfoV2 = async ({ kan_uid }: IGetColleagueInfo) => {
  return api({
    type: "private",
    method: "GET",
    path: `${ZUP_URL_V2}/users/${kan_uid}`,
    requestSchema: z.void(),
    responseSchema: colleaguesItemSchemaV2,
  })();
};

export const getCurrentHistories = async ({ kan_uid }: IGetColleagueInfo) => {
  return api({
    type: "private",
    method: "GET",
    path: `${ZUP_URL_V2}/histories/current/${kan_uid}`,
    requestSchema: z.void(),
    responseSchema: currentHistories,
  })();
};

export const getColleaguesBirthdayList = async () => {
  const params = new URLSearchParams({
    date_of_birth: formatDateWithTime(new Date().toISOString(), "fullDate"),
  });
  return api({
    type: "private",
    method: "GET",
    path: `${ZUP_URL}/users/date_of_birth?${params}`,
    requestSchema: z.void(),
    responseSchema: colleaguesBirthdaysGetAllResponseSchema,
  })();
};

export const getColleaguesBirthdayListV2 = async () => {
  return api({
    type: "private",
    method: "GET",
    path: `${ZUP_URL_V2}/users/date_of_birth`,
    requestSchema: z.void(),
    responseSchema: colleaguesBirthdaysGetAllResponseSchemaV2,
  })();
};
