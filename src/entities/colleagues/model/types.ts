import { z } from "zod";
import { colleaguesItemSchema, colleaguesItemSchemaV2 } from "./apiSchema";

export type IColleaguesItem = z.infer<typeof colleaguesItemSchema>;
export type IColleaguesItemV2 = z.infer<typeof colleaguesItemSchemaV2>;
