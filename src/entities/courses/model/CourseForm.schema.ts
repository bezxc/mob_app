import { z } from "zod";

export const CourseFormSchema = z.object({
  name: z.string().min(1).trim(),
  specialization: z.string().min(1).trim(),
  organization: z.string().min(1).trim(),
  date_end: z.date(),
});

export type ICourseInitialFromSchemaType = z.input<typeof CourseFormSchema>;
export type ICourseFormSchemaType = z.output<typeof CourseFormSchema>;
