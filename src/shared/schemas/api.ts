import { z } from "zod";

export const GetAllApiResponseSchema = <T extends z.ZodType>(items: T) =>
  z.object({
    items: z.array(items),
    page: z.number(),
    size: z.number(),
    pages: z.number(),
    total: z.number(),
  });
