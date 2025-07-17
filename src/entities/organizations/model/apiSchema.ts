import { z } from "zod";

export const organizationItemSchema = z.object({
  name: z.string(),
  guid: z.string(),
  inn: z.string(),
  kpp: z.string(),
});

export const organizationsGetAllResponseSchema = z.object({
  total: z.number(),
  pages: z.number(),
  page: z.number(),
  size: z.number(),
  items: z.array(organizationItemSchema),
});
