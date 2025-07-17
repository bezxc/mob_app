import { z } from "zod";
import { vacancyCareerItemSchema } from "@/entities/vacancy-resume";

export const FirstStepSchema = z.object(
  {
    is_married: z.boolean(),
    driver_license: z.boolean(),
    driving_experience: z
      .number({ invalid_type_error: "Заполните стаж вождения" })
      .min(1, "Укажите корректный стаж вождения")
      .nullable(),
    add_courses: z.boolean(),
  },
  { invalid_type_error: "Заполните 1 шаг" },
);

export const FourthStepSchema = z.object(
  {
    desired_salary: z
      .number({ required_error: "Укажите пожелание по зарплате" })
      .min(1, "Укажите пожелание по зарплате")
      .nullable()
      .refine((val) => typeof val === "number", {
        message: "Укажите пожелание по зарплате",
      }),
    motivation: z.string({ required_error: "Укажите мотивацию в работе" }),
    office_programs: z
      .string({ required_error: "Укажите знание офисных программ" })
      .min(1, "Укажите знание офисных программ"),
    work_schedule: z
      .string({ required_error: "Укажите желаемый график работы" })
      .min(1, "Укажите желаемый график работы"),
    supervisor_kan_uid: z
      .number()
      .nullable()
      .refine((val) => typeof val === "number", {
        message: "Укажите текущего руководителя",
      }),
  },
  {
    invalid_type_error: "Заполните 4 шаг",
  },
);

const validateThirdStep = vacancyCareerItemSchema
  .omit({
    responsibilities: true,
    progress: true,
    reason_for_dismissal: true,
  })
  .extend({
    responsibilities: z
      .string({
        required_error: "Заполните должностные обязанности",
      })
      .min(1, "Заполните должностные обязанности"),
    progress: z
      .string({ required_error: "Заполните ваши достижения" })
      .min(1, "Заполните ваши достижения"),
    reason_for_dismissal: z
      .string({
        required_error: "Заполните причину увольнения/перехода",
      })
      .min(1, "Заполните причину увольнения/перехода"),
  });

export const SecondStepSchema = z.object(
  {
    add_relatives: z.boolean(),
  },
  {
    invalid_type_error: "Заполните 2 шаг",
  },
);

export const ResumeFormsSchema = z.object({
  first_step: FirstStepSchema,
  second_step: SecondStepSchema,
  third_step: z.object({
    career_histories: z.array(validateThirdStep, {
      invalid_type_error: "Заполните 3 шаг",
    }),
  }),
  fourth_step: FourthStepSchema,
});

export type IFirstStepSchemaInitialType = z.input<typeof FirstStepSchema>;
export type IFirstStepSchemaType = z.infer<typeof FirstStepSchema>;

export type ISecondStepSchemaInitialType = z.input<typeof SecondStepSchema>;
export type ISecondStepSchemaType = z.infer<typeof SecondStepSchema>;

export type IFourthStepSchemaInitialType = z.input<typeof FourthStepSchema>;
export type IFourthStepSchemaType = z.infer<typeof FourthStepSchema>;
