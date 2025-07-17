import { QueryKey, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { z } from "zod";
import { api } from "../api/baseApi";

const BFF_URL = process.env.EXPO_PUBLIC_MINIO_PROXY_URL;

export interface GetPresignUrlParams {
  url: string;
  bucket:
    | "news"
    | "avatars"
    | "payslips"
    | "issue_center"
    | "edo_documents"
    | "privileges";
  pdf?: boolean;
  queryKey?: QueryKey;
}

export interface DeleteObjectParams {
  key: string;
  bucket: "avatars";
}

export interface PutObject {
  file: string;
  kan_uid: string;
  fileType: string;
  size?: number;
}

export interface UseGetPresignUrlResult {
  presignUrl: string;
  error: string | null;
  fileExists: boolean;
  isLoading: boolean;
}

export const getPresignedUrl = async ({
  url,
  bucket,
  pdf,
}: GetPresignUrlParams) => {
  const objectPath = pdf ? `${url}.pdf` : url;

  return api({
    type: "private",
    method: "GET",
    path: `${BFF_URL}/${bucket}?path=${objectPath}`,
    requestSchema: z.void(),
    responseSchema: z.object({
      url: z.string(),
      fileExists: z.boolean(),
    }),
  })();
};

export const uploadImageToBucket = async ({
  file,
  kan_uid,
  fileType,
}: PutObject) => {
  const formData = new FormData();

  formData.append("file", {
    uri: file,
    type: fileType,
    name: `${kan_uid}.jpeg`,
  } as any);

  return api({
    type: "private",
    method: "POST",
    path: `${BFF_URL}/avatars`,
    requestSchema: z.any(),
    customHeaders: {
      "Content-Type": "multipart/form-data",
    },
    responseSchema: z.object({
      success: z.boolean(),
    }),
  })(formData);
};

export const deleteObjectFromBucket = async ({ key }: DeleteObjectParams) => {
  return api({
    type: "private",
    method: "DELETE",
    path: `${BFF_URL}/avatars?path=${key}`,
    requestSchema: z.void(),
    responseSchema: z.object({
      success: z.boolean(),
    }),
  })();
};

export function useGetPresignUrl(
  params: GetPresignUrlParams
): UseGetPresignUrlResult {
  const url = encodeURIComponent(params.url);
  const { data, error, isLoading, isError } = useQuery({
    queryKey: params.queryKey || ["presignUrl", params.bucket, url, params.pdf],
    queryFn: () => getPresignedUrl({ ...params, url }),
    enabled: Boolean(url),
    retry: false,
  });

  return {
    presignUrl: data?.url ?? "",
    error:
      error instanceof Error ? error.message : error ? String(error) : null,
    fileExists: !isError ? Boolean(data?.fileExists) : false,
    isLoading,
  };
}
