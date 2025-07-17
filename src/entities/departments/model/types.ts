import { z } from "zod";
import { departmentItemSchema } from "./apiSchema";

export type IDepartmentItem = z.infer<typeof departmentItemSchema>;
