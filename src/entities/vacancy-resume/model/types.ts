import { z } from "zod";
import {
  editVacancyResumeRequestSchema,
  getVacancyResumeResponseSchema,
  vacancyCareerItemSchema,
} from "./apiSchema";

export type IVacancyResume = z.infer<typeof getVacancyResumeResponseSchema>;

export type IVacancyResumeCareer = z.infer<typeof vacancyCareerItemSchema>;

export type IChangeVacancyResume = z.infer<
  typeof editVacancyResumeRequestSchema
>;

export type IVacancyResumeFirstStep = Partial<
  Pick<
    IChangeVacancyResume,
    "is_married" | "driver_license" | "driving_experience" | "add_courses"
  >
>;
export type IVacancyResumeSecondStep = Partial<
  Pick<IChangeVacancyResume, "add_relatives">
>;
export type IVacancyResumeThirdStep = Partial<
  Pick<IChangeVacancyResume, "career_histories">
>;

export type IVacancyResumeFourthStep = Partial<
  Pick<
    IChangeVacancyResume,
    | "desired_salary"
    | "work_schedule"
    | "office_programs"
    | "motivation"
    | "supervisor_kan_uid"
  >
>;
export interface IVacancyResumeForm {
  enabled: boolean;
  firstStep: IVacancyResumeFirstStep;
  secondStep: IVacancyResumeSecondStep;
  thirdStep: IVacancyResumeThirdStep;
  fourthStep: IVacancyResumeFourthStep;
}

const initVacancyResumeForm = getVacancyResumeResponseSchema
  .omit({
    created_at: true,
    updated_at: true,
    doc_key: true,
    supervisor_kan_uid: true,
    resume_user_kan_uid: true,
    desired_salary: true,
    career_histories: true,
  })
  .extend({
    supervisor_kan_uid: z.number().optional(),
    desired_salary: z.number().optional(),
    career_histories: z.array(vacancyCareerItemSchema).optional(),
  });

export type IInitVacancyResumeForm = z.infer<typeof initVacancyResumeForm>;
