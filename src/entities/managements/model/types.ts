import { z } from "zod";
import { managementItemSchema } from "./apiSchema";

export type IManagementItem = z.infer<typeof managementItemSchema>;
