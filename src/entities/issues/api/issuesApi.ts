import { z } from "zod";
import { api } from "@/shared/api/baseApi";
import { IGetAllQueryParams, IRadioItem } from "@/shared/types/types";
import {
  IssueCategorySchema,
  issuesGetAllResponseSchema,
  issuesGetCategoriesResponseSchema,
  issuesGetHistoryResponseSchema,
  issuesGetStatusesResponseSchema,
  IssuesItemSchema,
} from "../model/issuesApiSchema";

const ISSUES_URL = process.env.EXPO_PUBLIC_ISSUES_API_URL;

interface IGetUserIssuesListQueryParams extends IGetAllQueryParams {
  categoriesFilters?: IRadioItem[] | null;
  statusesFilters?: IRadioItem[] | null;
  dateStart?: string | null;
  dateEnd?: string | null;
  author_kan_uid?: string;
  page?: number;
  size?: number;
  order_by?: string;
}

export const getUserIssuesList = async ({
  categoriesFilters,
  statusesFilters,
  dateStart,
  dateEnd,
  page,
  size,
  author_kan_uid,
  order_by,
}: IGetUserIssuesListQueryParams) => {
  const params = new URLSearchParams();
  if (categoriesFilters) {
    params.append(
      "category_id__in",
      categoriesFilters.map((item) => item.value).join(",")
    );
  }
  if (page) {
    params.append("page", String(page));
  }
  if (size) {
    params.append("size", String(size));
  }
  if (order_by) {
    params.append("order_by", order_by);
  }
  if (author_kan_uid) {
    params.append("author_kan_uid", author_kan_uid);
  }
  if (statusesFilters) {
    params.append(
      "status_id__in",
      statusesFilters.map((item) => item.value).join(",")
    );
  }
  if (dateStart) {
    params.append("created_at__gte", `${dateStart}T00:00:00.000Z`);
  }
  if (dateEnd) {
    params.append("created_at__lte", `${dateEnd}T23:59:59.999Z`);
  }

  return api({
    type: "private",
    method: "GET",
    path: `${ISSUES_URL}/issues?${params}`,
    requestSchema: z.void(),
    responseSchema: issuesGetAllResponseSchema,
  })();
};

export const getIssueInfo = async ({ id }: { id: string }) => {
  return api({
    type: "private",
    method: "GET",
    path: `${ISSUES_URL}/issues/${id}`,
    requestSchema: z.void(),
    responseSchema: IssuesItemSchema,
  })();
};

export const getIssueHistory = async ({ id }: { id: string }) => {
  return api({
    type: "private",
    method: "GET",
    path: `${ISSUES_URL}/answer_histories/issue/${id}`,
    requestSchema: z.void(),
    responseSchema: issuesGetHistoryResponseSchema,
  })();
};

export const getCategoriesList = async ({
  isAcitve,
}: {
  isAcitve: boolean;
}) => {
  const params = new URLSearchParams();
  if (isAcitve) {
    params.append("is_active", "true");
  }
  return api({
    type: "private",
    method: "GET",
    path: `${ISSUES_URL}/categories?${params}`,
    requestSchema: z.void(),
    responseSchema: issuesGetCategoriesResponseSchema,
  })();
};

export const getStatusesByCategoryIdList = async ({
  categoryId,
}: {
  categoryId: string;
}) => {
  return api({
    type: "private",
    method: "GET",
    path: `${ISSUES_URL}/statuses?category_id=${categoryId}`,
    requestSchema: z.void(),
    responseSchema: issuesGetStatusesResponseSchema,
  })();
};

export const createIssue = api({
  type: "private",
  method: "POST",
  path: `${ISSUES_URL}/issues`,
  requestSchema: z.any(),
  responseSchema: IssuesItemSchema,
  customHeaders: {
    "Content-Type": "multipart/form-data",
  },
});

export const getIssuesCategoryById = async (categoryId: number) => {
  return api({
    type: "private",
    method: "GET",
    path: `${ISSUES_URL}/categories/${categoryId}`,
    requestSchema: z.void(),
    responseSchema: IssueCategorySchema,
  })();
};
