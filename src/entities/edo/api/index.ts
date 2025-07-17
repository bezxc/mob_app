import { z } from "zod";
import { api } from "@/shared/api/baseApi";
import { Buffer } from "buffer";

const EDO_URL = process.env.EXPO_PUBLIC_EDO_API_URL;

const base64urlEncode = (str: string) => {
  const base64 = Buffer.from(str).toString("base64");
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

interface IGetEdoDocsByUserGuidQueryParams {
  kan_uid: string;
  name__ilike?: string;
  reg_number__in?: string;
  publication_date__gte?: string;
  publication_date__lt?: string;
  is_controlled?: boolean;
  is_acquainted?: boolean;
  is_executed?: boolean;
  was_read?: boolean;
  page?: number;
  size?: number;
  pages?: number;
}

export const getEdoDocsByUserGuid = async (
  queryParams: IGetEdoDocsByUserGuidQueryParams,
) => {
  const params = new URLSearchParams(
    Object.entries(queryParams).reduce(
      (acc, [key, value]) => {
        if (value !== undefined && value !== "" && value !== null) {
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
    path: `${EDO_URL}/documents/?${params}`,
    requestSchema: z.void(),
    responseSchema: z.object({
      items: z.array(
        z.object({
          kan_uid: z.number(),
          was_read: z.boolean(),
          doc_key: z.string(),
          name: z.string(),
          reg_number: z.string(),
          doc_type: z.string(),
          publication_date: z.string(),
          is_controlled: z.boolean(),
          is_acquainted: z.boolean(),
          is_executed: z.boolean(),
          updated_at: z.string(),
        }),
      ),
      total: z.number(),
      page: z.number(),
      size: z.number(),
      pages: z.number(),
    }),
  })();
};

export const getEdoDocsRegNumbers = async (kan_uid: string) => {
  return api({
    type: "private",
    method: "GET",
    path: `${EDO_URL}/documents/numbers/${kan_uid}`,
    requestSchema: z.void(),
    responseSchema: z.array(
      z.object({
        reg_number: z.string(),
      }),
    ),
  })();
};

export const edoAcknowledgeDocument = async ({
  doc_key,
  was_read,
  kan_uid,
}: {
  doc_key: string;
  was_read: boolean;
  kan_uid: string;
}) => {
  const encodedDocKey = base64urlEncode(doc_key);

  return api({
    type: "private",
    method: "PATCH",
    path: `${EDO_URL}/documents/kan_uid/${kan_uid}/doc_key/${encodedDocKey}`,
    requestSchema: z.object({ was_read: z.boolean() }),
    responseSchema: z.object({
      kan_uid: z.number(),
      was_read: z.boolean(),
      doc_key: z.string(),
      name: z.string(),
      reg_number: z.string(),
      doc_type: z.string(),
      publication_date: z.string(),
      is_controlled: z.boolean(),
      is_acquainted: z.boolean(),
      is_executed: z.boolean(),
      updated_at: z.string(),
    }),
  })({
    was_read,
  });
};
