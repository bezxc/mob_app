import { useQuery } from "@tanstack/react-query";
import { useUnit } from "effector-react";
import { ActivityIndicator, View } from "react-native";
import { $auth } from "@/shared/api/auth.store";
import { getAllCoursesByUserId } from "../api/courses";
import { CoursedCard } from "./CourseCard";

export const CoursesList = () => {
  const { kanUid } = useUnit($auth);

  const { data: courses } = useQuery({
    queryKey: ["courses", { kanUid }],
    queryFn: () => {
      return getAllCoursesByUserId(Number(kanUid));
    },
  });

  return (
    <View style={{ gap: 12 }}>
      {courses ? (
        courses.map((course) => <CoursedCard key={course.id} {...course} />)
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};
