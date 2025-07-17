import { z } from "zod";

export const CourseSchema = z.object({
  name: z.string(),
  specialization: z.string(),
  organization: z.string(),
  date_end: z.string(),
  user_kan_uid: z.number(),
  created_at: z.string(),
  id: z.number(),
});

export const UpdateCourseSchema = CourseSchema.omit({
  user_kan_uid: true,
}).partial();

export const CreateCourseSchema = CourseSchema.omit({
  id: true,
  created_at: true,
});

export const GetAllCoursesResponseSchema = z.array(CourseSchema);

export type UpdateCourseType = z.infer<typeof UpdateCourseSchema>;
export type CourseType = z.infer<typeof CourseSchema>;

export type GetAllCoursesResponseType = z.infer<
  typeof GetAllCoursesResponseSchema
>;
