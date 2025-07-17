import { z } from "zod";

export const vacancyCareerItemSchema = z.object({
  id: z.number().optional().nullable(),
  resume_user_kan_uid: z.number(),
  date_start: z.string(),
  date_end: z.string().nullable(),
  organization_name: z.string().nullable(),
  management_name: z.string().nullable(),
  department_name: z.string().nullable(),
  position: z.string(),
  responsibilities: z.string(),
  progress: z.string(),
  reason_for_dismissal: z.string(),
  is_current: z.boolean(),
});

export const getVacancyResumeResponseSchema = z.object({
  created_at: z.string(),
  updated_at: z.string(),
  resume_user_kan_uid: z.number(),
  supervisor_kan_uid: z.number(),
  is_married: z.boolean(),
  add_relatives: z.boolean(),
  add_courses: z.boolean(),
  desired_salary: z.number(),
  work_schedule: z.string(),
  office_programs: z.string(),
  driver_license: z.boolean(),
  motivation: z.string(),
  doc_key: z.string(),
  driving_experience: z.number().nullable(),
  career_histories: z.array(vacancyCareerItemSchema),
});

export const editVacancyResumeRequestSchema =
  getVacancyResumeResponseSchema.omit({
    created_at: true,
    updated_at: true,
  });
