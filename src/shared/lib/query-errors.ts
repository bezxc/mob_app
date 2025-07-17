import { AxiosError } from "axios";

export type IErrorMutateResponseType = Error & {
  detail?:
    | string
    | Array<Record<string, string | string[] | Record<string, string>>>;
};

export const errorForMutateQueries = (e: AxiosError) => {
  const errorObj = e.response?.data as IErrorMutateResponseType;
  if (errorObj.detail && typeof errorObj.detail === "string")
    return errorObj.detail;
  if (errorObj.detail && typeof errorObj.detail === "object")
    return errorObj.detail[0].msg;

  return "Произошла ошибка";
};
