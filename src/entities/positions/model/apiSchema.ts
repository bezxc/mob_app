import { z } from "zod";

export const positionItemSchema = z.object({
  guid: z.string(),
  name: z.string(),
});

export const positionsGetAllResponseSchema = z.object({
  total: z.number(),
  pages: z.number(),
  page: z.number(),
  size: z.number(),
  items: z.array(positionItemSchema),
});
