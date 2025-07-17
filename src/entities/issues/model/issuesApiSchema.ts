import { z } from "zod";

export const IssuesItemStatusSchema = z.object({
  title: z.string(),
  status_type: z.enum(["START", "DEFAULT", "END"]),
  is_active: z.boolean(),
  id: z.number(),
  created_at: z.string().datetime(),
  category_id: z.number(),
});

export const IssuesItemCategoryTypeSchema = z.object({
  title: z.string(),
  id: z.number(),
});

export const IssuesItemCategorySchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  user_kan_uid: z.number().nullable(),
  is_active: z.boolean(),
  created_at: z.string(),
  category_type: IssuesItemCategoryTypeSchema,
});

export const IssueCategorySchema = IssuesItemCategorySchema.extend({
  statuses: z.array(IssuesItemStatusSchema),
});

export const IssuesItemTaskSchema = z.object({
  id: z.number(),
  issue_id: z.number(),
  url: z.string(),
  date_of_task: z.string(),
  created_at: z.string(),
});

export const IssuesItemFileSchema = z.object({
  doc_key: z.string(),
  created_at: z.string(),
});

export const IssuesItemSchema = z.object({
  author_kan_uid: z.number(),
  body: z.string().nullable(),
  benefit: z.string().nullable(),
  applicant_vacancy: z.string().nullable(),
  applicant_phone: z.string().nullable(),
  applicant_full_name: z.string().nullable(),
  id: z.number(),
  comment: z.string().nullable(),
  answer: z.string().nullable(),
  curator_kan_uid: z.number().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
  category: IssuesItemCategorySchema,
  status: IssuesItemStatusSchema,
  tasks: z.array(IssuesItemTaskSchema),
  files: z.array(IssuesItemFileSchema),
});

export const issuesGetAllResponseSchema = z.object({
  total: z.number(),
  pages: z.number(),
  page: z.number(),
  size: z.number(),
  items: z.array(IssuesItemSchema),
});

export const issuesHistoryItemSchema = z.object({
  id: z.number(),
  issue_id: z.number(),
  answer: z.string().nullable(),
  created_at: z.string().datetime(),
  status: IssuesItemStatusSchema,
});

export const issuesGetHistoryResponseSchema = z.array(issuesHistoryItemSchema);
export const issuesGetCategoriesResponseSchema = z.array(
  IssuesItemCategorySchema
);
export const issuesGetStatusesResponseSchema = z.object({
  items: z.array(IssuesItemStatusSchema),
  page: z.number(),
  size: z.number(),
  pages: z.number(),
  total: z.number(),
});

export type IssuesItemCategory = z.infer<typeof IssuesItemCategorySchema>;
export type TIssuesCategory = z.infer<typeof IssueCategorySchema>;
