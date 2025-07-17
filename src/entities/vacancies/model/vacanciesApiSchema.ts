import { z } from "zod";

export const vacancyItemShortSchema = z.object({
  position_guid: z.string(),
  position_name: z.string(),
  management_guid: z.string(),
  management_name: z.string(),
  department_guid: z.string(),
  department_name: z.string(),
});

export const vacancyItemExpandedSchema = z.object({
  guid: z.string(),
  position_guid: z.string(),
  avg_wage_from: z.number(),
  avg_wage_to: z.number(),
  status: z.string(),
  responsibilities: z.string(),
  requirements: z.string(),
  working_conditions: z.string(),
  publication_date: z
    .string()
    .refine((date) => !Number.isNaN(Date.parse(date)), {
      message: "Invalid date format",
    }),
  is_active: z.boolean(),
  responses_count: z.number(),
});

export const vacancyItemSchema = vacancyItemExpandedSchema.merge(
  vacancyItemShortSchema
);

export const getAllVacanciesResponseSchema = z.object({
  items: z.array(vacancyItemSchema),
  total: z.number(),
  page: z.number(),
  size: z.number(),
  pages: z.number(),
});

export const vacancyResponsesSchema = z.object({
  resume_user_kan_uid: z.number(),
  vacancy_guid: z.string(),
  comment: z.string().nullable(),
  created_at: z.string().refine((date) => !Number.isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  vacancy: vacancyItemShortSchema,
});

export const getVacancyResponsesResponseSchema = z.object({
  items: z.array(vacancyResponsesSchema),
  total: z.number(),
  page: z.number(),
  size: z.number(),
  pages: z.number(),
});

export const createVacancyResponseSchema = z.object({
  resume_user_kan_uid: z.number(),
  vacancy_guid: z.string(),
  comment: z.string().nullable(),
  created_at: z.string().refine((date) => !Number.isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
});

export const getVacanciesDepartmentsItemSchema = z.object({
  department_guid: z.string(),
  department_name: z.string(),
});

export const getVacanciesDepartmentsResponseSchema = z.array(
  getVacanciesDepartmentsItemSchema
);
export const getVacanciesManagementsItemSchema = z.object({
  management_guid: z.string(),
  management_name: z.string(),
});

export const getVacanciesManagementsResponseSchema = z.array(
  getVacanciesManagementsItemSchema
);
