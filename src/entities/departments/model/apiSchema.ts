import { z } from "zod";

export const departmentItemSchema = z.object({
  name: z.string(),
  guid: z.string(),
});

export const departmentsGetAllResponseSchema = z.object({
  total: z.number(),
  pages: z.number(),
  page: z.number(),
  size: z.number(),
  items: z.array(departmentItemSchema),
});
