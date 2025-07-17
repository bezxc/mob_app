import { AxiosRequestConfig, Method, RawAxiosRequestHeaders } from "axios";
import { z } from "zod";
import { instance, instanceWithoutInterceptors } from "./axios";

interface APICallPayload<Request, Response> {
  method: Method;
  path: string;
  requestSchema: z.ZodType<Request>;
  responseSchema: z.ZodType<Response>;
  type?: "private" | "public";
  customHeaders?: RawAxiosRequestHeaders;
}

export function api<Request, Response>({
  type = "private",
  method,
  path,
  requestSchema,
  responseSchema,
  customHeaders,
}: APICallPayload<Request, Response>) {
  return async (requestData: Request) => {
    requestSchema.parse(requestData);
    let url = path;
    let data = null;

    if (requestData) {
      if (method === "GET" || method === "DELETE") {
        url += `${requestData}`;
      } else {
        data = requestData;
      }
    }

    const config: AxiosRequestConfig = {
      method,
      url,
      data,
      headers: customHeaders || {},
    };

    // console.log("🚀 ~ REQUEST", config);

    const response =
      type === "private"
        ? await instance(config)
        : await instanceWithoutInterceptors(config);

    // console.log("🚀 ~ RESPONSE", response.data);

    const result = responseSchema.safeParse(response.data);

    if (!result.success) {
      console.error("🚨 Safe-Parsing Failed", method, url, result.error);
      throw new Error(result.error.message);
    } else {
      return result.data;
    }
  };
}
