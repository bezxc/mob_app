import { z } from "zod";

export const ProfileInfoSchema = z.object({
  kan_uid: z.number(),
  full_name: z.string(),
  employee_guid: z.string(),
  working_rate: z.string(),
  date_of_admission: z.string(),
  date_of_dismissal: z.nullable(z.string()),
  type_of_employment: z.string(),
  type_of_event: z.string(),
  date_of_birth: z.string(),
  gender: z.string(),
  work_phone: z.string(),
  home_phone: z.string(),
  internal_phone: z.string(),
  telegram: z.string(),
  email: z.string(),
  decree: z.boolean(),
  discount_category: z.number(),
  date_of_experience: z.string(),
  rest_of_vacation: z.string(),
  planned_vacation: z.number(),
  login_ad: z.string(),
  position: z.object({
    guid: z.string(),
    name: z.string(),
  }),
  division: z.object({
    guid: z.string(),
    name: z.string(),
    direction: z.string(),
    dealership: z.string(),
    organization: z.object({
      guid: z.string(),
      name: z.string(),
      inn: z.string(),
      kpp: z.string(),
    }),
  }),
});

export const EducationSchema = z.array(
  z.object({
    guid: z.string().nullable(),
    kan_uid: z.number().nullable(),
    type_of_education: z.string().nullable(),
    specialization: z.string().nullable(),
    educational_institution: z.string().nullable(),
    year_of_graduation: z.number().nullable(),
    specialty_code: z.string().nullable(),
  }),
);

export const UserByLoginSchema = z.object({
  items: z.array(ProfileInfoSchema),
});

export const CreateRelativeSchema = z.object({
  full_name: z.string(),
  degree: z.enum(["Son", "Daughter", "Mother", "Father", "Husband", "Wife"]),
  birthday: z.string(),
  user_kan_uid: z.number(),
});

export const RelativeSchema = z.object({
  created_at: z.string(),
  full_name: z.string(),
  degree: z.enum(["Son", "Daughter", "Mother", "Father", "Husband", "Wife"]),
  birthday: z.string(),
  user_kan_uid: z.number(),
  id: z.number(),
});

export const HistoriesSchema = z.object({
  organization_name: z.string(),
  kan_uid: z.number(),
  date_start: z.string(),
  date_end: z.string().nullable(),
  working_rate: z.string(),
  position_name: z.string(),
  type_of_employment: z.string(),
  type_of_event: z.string(),
  division: z
    .object({
      guid: z.string(),
      name: z.string(),
      direction: z.string(),
      dealership: z.string(),
      organization: z.object({
        guid: z.string(),
        name: z.string(),
        inn: z.string(),
        kpp: z.string(),
      }),
      management: z.object({
        guid: z.string(),
        name: z.string(),
        department: z.object({
          guid: z.string(),
          name: z.string(),
        }),
      }),
    })
    .nullable(),
});

export const HistoriesResponseSchema = z.array(HistoriesSchema);

export type EducationType = z.infer<typeof EducationSchema>;
export type ProfileInfoType = z.infer<typeof ProfileInfoSchema>;
export type UserByLoginResponseType = z.infer<typeof UserByLoginSchema>;
export type HistoriesType = z.infer<typeof HistoriesSchema>;
export type HistoriesResponseType = z.infer<typeof HistoriesResponseSchema>;
export type RelativeSchemaType = z.infer<typeof RelativeSchema>;
