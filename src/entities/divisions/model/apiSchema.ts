import { z } from "zod";

export const divisionItemSchema = z.object({
  guid: z.string(),
  name: z.string(),
  direction: z.string(),
  dealership: z.string(),
  organization: z.object({
    name: z.string(),
    guid: z.string(),
    inn: z.string(),
    kpp: z.string(),
  }),
});

export const divisionsGetAllResponseSchema = z.object({
  total: z.number(),
  pages: z.number(),
  page: z.number(),
  size: z.number(),
  items: z.array(divisionItemSchema),
});

export const divisionItemV2Schema = z.object({
  guid: z.string(),
  name: z.string(),
  direction: z.string(),
  dealership: z.string(),
  organization: z.object({
    name: z.string(),
    guid: z.string(),
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
});

export const divisionsGetAllResponseV2Schema = z.object({
  total: z.number(),
  pages: z.number(),
  page: z.number(),
  size: z.number(),
  items: z.array(divisionItemV2Schema),
});
