import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { FC, useState } from "react";
import { StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";
import { Colors, Fonts } from "@/shared/styles/tokens";
import { CardMenu, InputInfo } from "@/shared/ui";
import { deleteCourse } from "../api/courses";
import { CourseType } from "../model/CoursesApi.schema";
import { CourseForm } from "./CourseForm";

interface ICoursedCardProps
  extends Omit<CourseType, "created_at" | "user_kan_uid"> {
  withEdit?: boolean;
}

export const CoursedCard: FC<ICoursedCardProps> = ({
  date_end,
  name,
  organization,
  specialization,
  id,
  withEdit = true,
}) => {
  const [edit, setEdit] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const { mutate: deleteCourseMutation } = useMutation({
    mutationFn: () => deleteCourse(id),
    onSuccess: () => {
      Toast.show({
        text1: "Запись удалена",
      });
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });

  return (
    <View style={styles.container}>
      {!edit ? (
        <View key={id} style={styles.courseCard}>
          {withEdit && (
            <View style={styles.menuButton}>
              <CardMenu
                editFn={() => setEdit((prev) => !prev)}
                deleteFn={deleteCourseMutation}
              />
            </View>
          )}
          <View style={styles.infoContainer}>
            <InputInfo
              style={styles.inputInfo}
              label="Специализация"
              description={specialization}
              descriptionStyle={styles.description}
              labelStyle={styles.label}
            />
            <InputInfo
              label="Название курса"
              description={name}
              style={styles.inputInfo}
              descriptionStyle={styles.description}
              labelStyle={styles.label}
            />
            <InputInfo
              label="Обучающая организация"
              description={organization}
              style={styles.inputInfo}
              descriptionStyle={styles.description}
              labelStyle={styles.label}
            />
            <InputInfo
              style={styles.inputInfo}
              label="Дата окончания"
              description={dayjs(date_end).format("DD.MM.YYYY").toString()}
              descriptionStyle={styles.description}
              labelStyle={styles.label}
            />
          </View>
        </View>
      ) : (
        <CourseForm
          edit
          setEdit={setEdit}
          date_end={date_end}
          name={name}
          organization={organization}
          specialization={specialization}
          id={id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  courseCard: {
    backgroundColor: Colors.grayLight,
    borderRadius: 20,
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  infoContainer: {
    flexGrow: 1,
  },
  menuButton: {
    zIndex: 10,
    position: "absolute",
    top: 15,
    right: 15,
  },
  notFoundText: {
    marginTop: 12,
    fontFamily: Fonts.TRegular,
    fontSize: 15,
  },
  title: {
    fontFamily: Fonts.TBold,
    fontSize: 22,
  },
  description: {
    fontFamily: Fonts.SFSemiBold,
    fontSize: 14,
  },
  label: {
    color: Colors.gray70,
  },
  inputInfo: {
    backgroundColor: Colors.grayLight,
    paddingVertical: 12,
  },
});
