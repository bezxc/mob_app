import { z } from "zod";
import { organizationItemSchema } from "./apiSchema";

export type IOrganizationItem = z.infer<typeof organizationItemSchema>;
