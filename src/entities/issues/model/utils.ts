import Toast from "react-native-toast-message";
import { z } from "zod";
import { IIssueFriendFormSchemaType } from "./IssueFriendForm.schema";
import { IIssueIdeasFormSchemaType } from "./IssueIdeasForm.schema";
import { IIssueStandartFormSchemaType } from "./IssueStandartForm.schema";

interface IFileCallbackArg {
  instanceError: string;
  requiredError: string;
  sizeError: string;
  typeError: string;
}
export const fileCallback = ({
  sizeError = "Размер файла превышен",
  typeError = "Тип файла не поддерживается",
}: Partial<IFileCallbackArg>) => {
  const fileSchema = z.object({
    uri: z.string().min(1, "uri файла отсутствует"),
    name: z.string().min(1, "имя файла отсутствует"),
    type: z.string().optional(),
    size: z.number(),
  });
  const sizeFileSchema = fileSchema.refine(
    (file) => {
      if (file.size === 0) return false;
      const fileSizeInMB = file.size / (1024 * 1024);
      return fileSizeInMB <= 5;
    },
    {
      message: sizeError,
    },
  );

  const documentFileSchema = sizeFileSchema.refine(
    (file) => {
      const allowedExtensions = [
        "doc",
        "docx",
        "pdf",
        "ppt",
        "pptx",
        "xls",
        "xlsx",
        "png",
        "jpeg",
        "jpg",
        "mp3",
        "mp4",
      ];
      if (file.name) {
        const fileExtension = file.name.split(".").pop()?.toLowerCase();
        return allowedExtensions.includes(fileExtension as string);
      }
      return false;
    },
    {
      message: typeError,
    },
  );
  return {
    fileSchema,
    sizeFileSchema,
    documentFileSchema,
  };
};

type TData =
  | IIssueIdeasFormSchemaType
  | IIssueFriendFormSchemaType
  | IIssueStandartFormSchemaType;

export const getFormData = (
  data: TData,
  kanUid: string,
  categoryId: number,
): FormData => {
  const formData = new FormData();

  const { files, ...otherData } = data;

  formData.append(
    "data",
    JSON.stringify({
      ...otherData,
      author_kan_uid: kanUid,
      category_id: categoryId,
    }),
  );

  if (files && Array.isArray(files)) {
    files.forEach(async (file) => {
      try {
        //так умеет только React Native :)
        formData.append(`file`, file as unknown as Blob, file.name);
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Ошибка загрузки файла",
          text2: `Не удалось загрузить файл ${file.name || file.uri}`,
        });
      }
    });
  }

  return formData;
};
