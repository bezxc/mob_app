import { z } from "zod";
import { api } from "@/shared/api/baseApi";
import { ProfileInfoSchema, UserByLoginSchema } from "../model/schema";

const ZUP_URL = process.env.EXPO_PUBLIC_ZUP_API_URL;
const TMC_URL = process.env.EXPO_PUBLIC_TMC_API_URL;

export const getProfileInfo = (id: string) =>
  api({
    type: "private",
    method: "GET",
    path: `${ZUP_URL}/users/${id}`,
    requestSchema: z.void(),
    responseSchema: ProfileInfoSchema,
  })();

export const getUserByLogin = ({ login_ad }: { login_ad: string }) => {
  const param = new URLSearchParams();

  if (login_ad) {
    param.append("login_ad", login_ad);
  }

  return api({
    type: "private",
    method: "GET",
    path: `${ZUP_URL}/users?${param}`,
    requestSchema: z.void(),
    responseSchema: UserByLoginSchema,
  })();
};

export const setUserInfo = (id: string) =>
  api({
    type: "private",
    method: "PATCH",
    path: `${ZUP_URL}/users/${id}`,
    requestSchema: z.object({
      work_phone: z.string().optional(),
      home_phone: z.string().optional(),
      internal_phone: z.string().optional(),
      telegram: z.string().optional(),
    }),
    responseSchema: z.object({
      work_phone: z.string(),
      home_phone: z.string(),
      internal_phone: z.string(),
      telegram: z.string(),
    }),
  });

export const getTMCInfo = ({
  id,
  page,
  size,
}: {
  id: string;
  page?: number;
  size?: number;
}) => {
  const param = new URLSearchParams();

  if (page) {
    param.append("page", String(page));
  }

  if (size) {
    param.append("size", String(size));
  }

  return api({
    type: "private",
    method: "GET",
    path: `${TMC_URL}/inventory-assets/${id}?${param}`,
    requestSchema: z.void(),
    responseSchema: z.object({
      items: z.array(
        z.object({
          kan_uid: z.number(),
          code: z.string(),
          name: z.string(),
          serial_code: z.string(),
          is_active: z.boolean(),
        }),
      ),
      total: z.number(),
      page: z.number(),
      size: z.number(),
      pages: z.number(),
    }),
  })();
};

export const getPayslipsInfo = ({ id }: { id: string }) =>
  api({
    type: "private",
    method: "GET",
    path: `${ZUP_URL}/payslips/${id}`,
    requestSchema: z.void(),
    responseSchema: z.array(
      z.object({
        kan_uid: z.number(),
        doc_key: z.string(),
        organization_guid: z.string(),
        created_at: z.string(),
        doc_date: z.string(),
      }),
    ),
  })();

export const getOrganizationInfo = ({ id }: { id: string }) =>
  api({
    type: "private",
    method: "GET",
    path: `${ZUP_URL}/organizations/${id}`,
    requestSchema: z.void(),
    responseSchema: z.object({
      guid: z.string(),
      name: z.string(),
    }),
  })();

export const getAccuralsInfo = ({ id }: { id: string }) =>
  api({
    type: "private",
    method: "GET",
    path: `${ZUP_URL}/accurals/${id}`,
    requestSchema: z.void(),
    responseSchema: z.object({
      month: z.number(),
      quarter: z.number(),
      year: z.number(),
    }),
  })();
