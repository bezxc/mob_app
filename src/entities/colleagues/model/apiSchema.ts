import { z } from "zod";

export const colleaguesItemSchema = z.object({
  kan_uid: z.number(),
  full_name: z.string(),
  position: z.object({
    guid: z.string(),
    name: z.string(),
  }),
  division: z.object({
    guid: z.string(),
    name: z.string(),
    organization: z.object({
      guid: z.string(),
      name: z.string(),
    }),
  }),
  email: z.string(),
  telegram: z.string(),
  date_of_birth: z.string(),
  home_phone: z.string(),
  internal_phone: z.string(),
  work_phone: z.string(),
});

export const currentHistories = z.array(
  z.object({
    organization_name: z.string(),
    kan_uid: z.number(),
    date_start: z.string(),
    date_end: z.string().nullable(),
    working_rate: z.string(),
    position_name: z.string(),
    type_of_employment: z.string(),
    type_of_event: z.string(),
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
      management: z.object({
        guid: z.string(),
        name: z.string(),
        department: z.object({
          guid: z.string(),
          name: z.string(),
        }),
      }),
    }),
  }),
);

export const colleaguesGetAllResponseSchema = z.object({
  total: z.number(),
  pages: z.number(),
  page: z.number(),
  size: z.number(),
  items: z.array(colleaguesItemSchema),
});
export const colleaguesBirthdaysGetAllResponseSchema =
  z.array(colleaguesItemSchema);

export const colleaguesItemSchemaV2 = z.object({
  kan_uid: z.number(),
  full_name: z.string(),
  position: z.object({
    guid: z.string(),
    name: z.string(),
  }),
  division: z.object({
    guid: z.string(),
    name: z.string(),
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
  }),
  email: z.string(),
  telegram: z.string(),
  date_of_birth: z.string(),
  home_phone: z.string(),
  internal_phone: z.string(),
  work_phone: z.string(),
  gender: z.enum(["Женский", "Мужской", ""]),
});

export const colleaguesGetAllResponseSchemaV2 = z.object({
  total: z.number(),
  pages: z.number(),
  page: z.number(),
  size: z.number(),
  items: z.array(colleaguesItemSchemaV2),
});

export const colleaguesBirthdaysGetAllResponseSchemaV2 = z.array(
  colleaguesItemSchemaV2,
);
