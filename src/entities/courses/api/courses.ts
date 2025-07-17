import { z } from "zod";
import { api } from "@/shared/api/baseApi";
import {
  CourseSchema,
  CreateCourseSchema,
  GetAllCoursesResponseSchema,
  UpdateCourseSchema,
} from "../model/CoursesApi.schema";

const USER_INFO_URL = process.env.EXPO_PUBLIC_USER_INFO_API_URL;

export const getAllCoursesByUserId = (userId: number | null) => {
  const params = new URLSearchParams();

  if (userId) {
    params.append("user_kan_uid", userId.toString());
  }

  return api({
    type: "private",
    method: "GET",
    path: `${USER_INFO_URL}/courses?${params}`,
    requestSchema: z.void(),
    responseSchema: GetAllCoursesResponseSchema,
  })();
};

export const createCourse = api({
  type: "private",
  method: "POST",
  path: `${USER_INFO_URL}/courses`,
  requestSchema: CreateCourseSchema,
  responseSchema: CourseSchema,
});

export const updateCourse = (id: number) => {
  return api({
    type: "private",
    method: "PATCH",
    path: `${USER_INFO_URL}/courses/${id}`,
    requestSchema: UpdateCourseSchema,
    responseSchema: CourseSchema,
  });
};

export const deleteCourse = (id: number) => {
  return api({
    type: "private",
    method: "DELETE",
    path: `${USER_INFO_URL}/courses/${id}`,
    requestSchema: z.void(),
    responseSchema: CourseSchema,
  })();
};
