import { z } from "zod";
import { divisionItemSchema, divisionItemV2Schema } from "./apiSchema";

export type IDivisionItem = z.infer<typeof divisionItemSchema>;
export type IDivisionItemV2 = z.infer<typeof divisionItemV2Schema>;
