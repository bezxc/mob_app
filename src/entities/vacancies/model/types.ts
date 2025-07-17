import { z } from "zod";
import {
  vacancyItemSchema,
  vacancyResponsesSchema,
} from "./vacanciesApiSchema";

export type TVacancyItem = z.infer<typeof vacancyItemSchema>;
export type TVacancyResponseItem = z.infer<typeof vacancyResponsesSchema>;
