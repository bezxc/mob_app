import { z } from "zod";

export const managementItemSchema = z.object({
  guid: z.string(),
  name: z.string(),
  department: z.object({
    name: z.string(),
    guid: z.string(),
  }),
});

export const managementsGetAllResponseSchema = z.object({
  total: z.number(),
  pages: z.number(),
  page: z.number(),
  size: z.number(),
  items: z.array(managementItemSchema),
});
