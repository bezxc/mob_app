import { z } from "zod";
import { positionItemSchema } from "./apiSchema";

export type IPositionitem = z.infer<typeof positionItemSchema>;
