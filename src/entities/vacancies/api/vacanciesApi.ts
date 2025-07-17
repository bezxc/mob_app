import { z } from "zod";
import { api } from "@/shared/api/baseApi";
import { IGetAllQueryParams } from "@/shared/types/types";
import {
  createVacancyResponseSchema,
  getAllVacanciesResponseSchema,
  getVacanciesDepartmentsResponseSchema,
  getVacanciesManagementsResponseSchema,
  getVacancyResponsesResponseSchema,
  vacancyItemSchema,
} from "../model/vacanciesApiSchema";

const VACANCIES_URL = process.env.EXPO_PUBLIC_VACANCIES_API_URL;

interface IGetAllVacanciesQueryParams extends IGetAllQueryParams {
  is_active?: boolean;
  position_guid__in?: string;
  avg_wage_from__gte?: number;
  avg_wage_to__lte?: number | null;
  position_name__ilike?: string;
  department_guid__in?: string;
  management_guid__in?: string;
}

export const getAllVacancies = async (
  queryParams: IGetAllVacanciesQueryParams,
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
    path: `${VACANCIES_URL}/vacancies?${params}`,
    requestSchema: z.void(),
    responseSchema: getAllVacanciesResponseSchema,
  })();
};

export const getVacancyInfo = async (guid: string) => {
  return api({
    type: "private",
    method: "GET",
    path: `${VACANCIES_URL}/vacancies/${guid}`,
    requestSchema: z.void(),
    responseSchema: vacancyItemSchema,
  })();
};

interface IGetVacancyResponsesArgs {
  guid: string;
  resume_user_kan_uid?: string;
  page?: number;
  size?: number;
}

export const getVacancyResponses = async (
  queryParams: IGetVacancyResponsesArgs,
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

  const { guid } = queryParams;

  return api({
    type: "private",
    method: "GET",
    path: `${VACANCIES_URL}/vacancies/${guid}/responses?${params}`,
    requestSchema: z.void(),
    responseSchema: getVacancyResponsesResponseSchema,
  })();
};

interface ICreateVacancyResponseArgs {
  vacancyGuid: string;
  kanUid: string;
}
export const createVacancyResponse = ({
  vacancyGuid,
  kanUid,
}: ICreateVacancyResponseArgs) => {
  api({
    type: "private",
    method: "POST",
    path: `${VACANCIES_URL}/vacancies/${vacancyGuid}/responses/${kanUid}`,
    requestSchema: z.null(),
    responseSchema: createVacancyResponseSchema,
  })(null);
};

interface IGetAllVacancyResponsesArgs extends IGetAllQueryParams {
  resume_user_kan_uid__in?: string;
}
export const getAllVacancyResponses = async (
  queryParams: IGetAllVacancyResponsesArgs,
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
    path: `${VACANCIES_URL}/vacancies/responses?${params}`,
    requestSchema: z.void(),
    responseSchema: getVacancyResponsesResponseSchema,
  })();
};

export const getVacanciesDepartments = async ({
  department_name__ilike,
}: {
  department_name__ilike?: string;
}) => {
  const params = new URLSearchParams();

  params.append("is_active", "true");

  if (department_name__ilike) {
    params.append("department_name__ilike", String(department_name__ilike));
  }

  return api({
    type: "private",
    method: "GET",
    path: `${VACANCIES_URL}/vacancies/departments?${params}`,
    requestSchema: z.void(),
    responseSchema: getVacanciesDepartmentsResponseSchema,
  })();
};
export const getVacanciesManagements = async ({
  management_name__ilike,
}: {
  management_name__ilike?: string;
}) => {
  const params = new URLSearchParams();

  params.append("is_active", "true");

  if (management_name__ilike) {
    params.append("management_name__ilike", String(management_name__ilike));
  }

  return api({
    type: "private",
    method: "GET",
    path: `${VACANCIES_URL}/vacancies/managements?${params}`,
    requestSchema: z.void(),
    responseSchema: getVacanciesManagementsResponseSchema,
  })();
};
