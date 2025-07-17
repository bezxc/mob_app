import * as DocumentPicker from "expo-document-picker";

interface IReturnDocument {
  uri: string;
  name: string;
  type?: string;
  size?: number;
}
type IPickDocument = () => Promise<IReturnDocument[] | null>;

// Поддерживаемые форматы файлов
const SUPPORTED_FILE_TYPES = [
  "application/msword", // .doc
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
  "application/pdf", // .pdf
  "application/vnd.ms-powerpoint", // .ppt
  "application/vnd.openxmlformats-officedocument.presentationml.presentation", // .pptx
  "application/vnd.ms-excel", // .xls
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
  "image/png", // .png
  "image/jpeg", // .jpg, .jpeg
  "image/jpg", // .jpg (если отдельно требуется)
  "image/img", // .img
  "video/mp4", // .mp4
];

export const pickDocument: IPickDocument = async () => {
  const result = await DocumentPicker.getDocumentAsync({
    type: SUPPORTED_FILE_TYPES,
    multiple: true,
  });

  if (!result.canceled) {
    const filesArr = result.assets.map((file) => {
      return {
        uri: file.uri,
        name: file.name,
        type: file.mimeType,
        size: file.size,
      };
    });
    return filesArr;
  }
  return null;
};
