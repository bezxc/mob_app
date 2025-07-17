import { z } from "zod";
import { IssueFileSchema } from "./IssueFilesSchema";

export const IssueIdeasFormSchema = z.object({
  body: z.string().min(3, "Заполните описание").trim(),
  benefit: z.string().min(3, "Заполните преимущества").trim(),
  files: IssueFileSchema,
});

export type IIssueIdeasFormSchemaInitialType = z.input<
  typeof IssueIdeasFormSchema
>;
export type IIssueIdeasFormSchemaType = z.output<typeof IssueIdeasFormSchema>;
