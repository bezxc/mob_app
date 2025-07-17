import { z } from "zod";
import { fileCallback } from "./utils";

export const IssueFileSchema = z
  .array(
    fileCallback({
      instanceError: "Выберите файл",
      typeError: "Тип выбранного файла не поддерживается",
    }).documentFileSchema
  )
  .max(3, "Можно загрузить не более 3 файлов")
  .optional();
