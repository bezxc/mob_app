import { z } from "zod";
import { issuesHistoryItemSchema, IssuesItemSchema } from "./issuesApiSchema";

export type TIssuesItem = z.infer<typeof IssuesItemSchema>;

export type TIssueHistoryItem = z.infer<typeof issuesHistoryItemSchema>;
