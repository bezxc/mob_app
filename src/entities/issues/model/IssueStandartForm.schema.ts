import { z } from "zod";
import { IssueFileSchema } from "./IssueFilesSchema";

export const IssueStandartFormSchema = z.object({
  body: z.string().min(2, "Заполните описание").trim(),

  files: IssueFileSchema,
});

export type IIssueStandartFormSchemaInitialType = z.input<
  typeof IssueStandartFormSchema
>;
export type IIssueStandartFormSchemaType = z.output<
  typeof IssueStandartFormSchema
>;
