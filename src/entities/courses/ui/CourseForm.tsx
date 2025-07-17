import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useUnit } from "effector-react";
import { Dispatch, FC, SetStateAction } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";
import { ControlledDatePicker } from "@/features/controlled-datepicker";
import { $auth } from "@/shared/api/auth.store";
import { Colors } from "@/shared/styles/tokens";
import { ControlledInput, GradientButton } from "@/shared/ui";
import { filterChangedFormFields } from "@/shared/utils";
import { createCourse, updateCourse } from "../api/courses";
import {
  CourseFormSchema,
  ICourseFormSchemaType,
  ICourseInitialFromSchemaType,
} from "../model/CourseForm.schema";
import { UpdateCourseType } from "../model/CoursesApi.schema";

interface ICourseForm {
  date_end: string;
  name: string;
  specialization: string;
  organization: string;
  edit: boolean;
  setEdit: Dispatch<SetStateAction<boolean>>;
  id: number;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  isVisible: boolean;
}

export const CourseForm: FC<Partial<ICourseForm>> = ({
  setEdit,
  edit,
  id,
  name,
  specialization,
  organization,
  date_end,
  setIsVisible,
  isVisible,
}) => {
  const { kanUid } = useUnit($auth);
  const queryClient = useQueryClient();

  const methods = useForm<
    ICourseInitialFromSchemaType,
    unknown,
    ICourseFormSchemaType
  >({
    resolver: zodResolver(CourseFormSchema),
    defaultValues: {
      date_end: date_end ? new Date(date_end) : undefined,
      name: name || "",
      specialization: specialization || "",
      organization: organization || "",
    },
  });

  const {
    handleSubmit,
    formState: { isDirty, dirtyFields, errors },
    reset,
  } = methods;

  const { mutate: createCourseMutate, isError } = useMutation({
    mutationFn: ({
      name,
      date_end,
      organization,
      specialization,
    }: ICourseFormSchemaType) =>
      createCourse({
        user_kan_uid: Number(kanUid),
        name,
        specialization,
        organization,
        date_end: dayjs(date_end).format("YYYY-MM-DD"),
      }),
    onSuccess: () => {
      Toast.show({
        text1: "Курс добавлен",
      });
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      reset();
      if (setIsVisible) setIsVisible(false);
    },
  });

  const { mutate: updateCourseMutate } = useMutation({
    mutationFn: (data: UpdateCourseType) => updateCourse(id!)(data),
    onSuccess: () => {
      Toast.show({
        text1: "Курс обновлен",
      });
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      if (setEdit) setEdit(false);
    },
  });

  const onSubmit: SubmitHandler<ICourseFormSchemaType> = async (newData) => {
    if (edit) {
      const changedFields = filterChangedFormFields(newData, dirtyFields);
      updateCourseMutate({
        ...changedFields,
        date_end: dayjs(newData.date_end).format("YYYY-MM-DD"),
      });
    } else {
      createCourseMutate(newData);
    }
  };

  const inputFields = [
    {
      name: "specialization",
      labelText: "Специализация",
      error: errors.specialization?.message,
    },
    {
      name: "name",
      labelText: "Название курса",
      error: errors.name?.message,
    },
    {
      name: "organization",
      labelText: "Обучающая организация",
      error: errors.organization?.message,
    },
  ];

  return (
    <FormProvider {...methods}>
      <View style={styles.container}>
        {inputFields.map((field, index) => (
          <ControlledInput
            key={index}
            isRequired
            labelStyle={{ color: Colors.gray70 }}
            inputStyle={[
              styles.inputStyles,
              field.error
                ? { borderWidth: 1, borderColor: Colors.redAccent }
                : null,
            ]}
            style={styles.inputContainer}
            name={field.name}
            labelText={field.labelText}
            withError={false}
          />
        ))}
        <ControlledDatePicker
          labelStyle={{ color: Colors.gray70 }}
          name="date_end"
          label="Дата окончания"
          isRequired
        />
        <View
          style={{ flexGrow: 1, gap: 10, flexDirection: "row", marginTop: 8 }}
        >
          <GradientButton
            colors={["#1D77ED", "#56A0FF", "#2572D6"]}
            onPress={() => {
              if (edit && setEdit) setEdit(false);
              if (isVisible && setIsVisible) setIsVisible(false);
            }}
            style={{ flexGrow: 1 }}
            gradientStyles={{ paddingVertical: 15 }}
          >
            Отмена
          </GradientButton>

          <GradientButton
            style={{ flexGrow: 1 }}
            onPress={handleSubmit(onSubmit)}
            disabled={!isDirty}
            gradientStyles={{ paddingVertical: 15 }}
          >
            Сохранить
          </GradientButton>
        </View>
      </View>
    </FormProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: Colors.grayLight,
    borderRadius: 20,
    marginBottom: 12,
  },
  inputStyles: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  inputContainer: {
    paddingRight: 0,
    paddingLeft: 0,
    paddingTop: 0,
    paddingVertical: 12,
  },
});
