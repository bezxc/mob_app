import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useUnit } from "effector-react";
import { router } from "expo-router";
import { FormProvider, useForm } from "react-hook-form";
import { Platform, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-actions-sheet";
import { getCurrentHistories } from "@/entities/colleagues";
import {
  $vacancyResumeForm,
  CurrentWorkCareerCard,
  setVacancyResumeFormThirdStep,
} from "@/entities/vacancy-resume";
import { $auth } from "@/shared/api/auth.store";
import { Colors, Fonts } from "@/shared/styles/tokens";
import { ControlledInput, LinearGradientButton } from "@/shared/ui";
import {
  CurrentPlaceOfWorkFormSchema,
  ICurrentPlaceOfWorkSchemaInitialType,
  ICurrentPlaceOfWorkSchemaType,
} from "../model/CurrentPlaceOfWorkForm.schema";

export const EditCurrentPlaceOfWorkForm = () => {
  const { thirdStep } = useUnit($vacancyResumeForm);

  const { kanUid } = useUnit($auth);

  const { data: histories, isSuccess } = useQuery({
    queryKey: ["histories", { kanUid }],
    queryFn: () => getCurrentHistories({ kan_uid: kanUid as string }),
  });

  const currentCareer = thirdStep.career_histories?.[0];

  const {
    id,
    responsibilities = "",
    progress = "",
    reason_for_dismissal = "",
  } = currentCareer || {};

  const methods = useForm<
    ICurrentPlaceOfWorkSchemaInitialType,
    unknown,
    ICurrentPlaceOfWorkSchemaType
  >({
    resolver: zodResolver(CurrentPlaceOfWorkFormSchema),
    values: {
      responsibilities,
      progress,
      reason_for_dismissal,
    },
  });

  const onSubmit = (data: ICurrentPlaceOfWorkSchemaType) => {
    setVacancyResumeFormThirdStep({
      flag: "update",
      index: 0,
      data: {
        id: id || null,
        resume_user_kan_uid: Number(kanUid),
        organization_name: histories?.[0].organization_name,
        date_start: histories?.[0].date_start,
        date_end: histories?.[0].date_end,
        position: histories?.[0].position_name,
        management_name: histories?.[0].division.management.name,
        department_name: histories?.[0].division.management.department.name,
        responsibilities: data.responsibilities,
        progress: data.progress,
        reason_for_dismissal: data.reason_for_dismissal,
        is_current: true,
      },
    });

    router.dismiss();
  };

  const resetForm = () => {
    reset({
      responsibilities: "",
      progress: "",
      reason_for_dismissal: "",
    });
  };

  const { handleSubmit, reset } = methods;

  return (
    <ScrollView
      keyboardShouldPersistTaps={Platform.OS === "android"}
      contentContainerStyle={styles.container}
      style={{ backgroundColor: Colors.white }}
      automaticallyAdjustKeyboardInsets={true}
      keyboardDismissMode="on-drag"
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}
    >
      {isSuccess && (
        <>
          <CurrentWorkCareerCard
            styles={{ backgroundColor: Colors.grayLight }}
            organization_name={histories[0].organization_name}
            date_start={histories[0].date_start}
            date_end={histories[0].date_end}
            position={histories[0].position_name}
            management_name={histories[0].division.management.name}
            department_name={histories[0].division.management.department.name}
          />
          <View style={styles.form}>
            <FormProvider {...methods}>
              <ControlledInput
                multiline
                isRequired
                labelText="Должностные обязанности"
                name="responsibilities"
                inputStyle={styles.inputs}
                labelStyle={styles.label}
                style={[styles.inputInfoContainer, styles.inputBorderColor]}
              />
              <ControlledInput
                multiline
                isRequired
                labelText="Ваши достижения в должности"
                name="progress"
                inputStyle={styles.inputs}
                labelStyle={styles.label}
                style={[styles.inputInfoContainer, styles.inputBorderColor]}
              />
              <ControlledInput
                multiline
                isRequired
                labelText="Причина увольнения/перехода"
                placeholder="Почему Вы хотите сменить текущее место работы?"
                name="reason_for_dismissal"
                inputStyle={styles.inputs}
                labelStyle={styles.label}
                style={[styles.inputInfoContainer, styles.inputBorderColor]}
              />
              <LinearGradientButton
                text="Сохранить"
                onPress={handleSubmit(onSubmit)}
              />
              <LinearGradientButton
                colors={["#676767", "#9A9A9A", "#676767"]}
                text="Очистить"
                onPress={resetForm}
              />
            </FormProvider>
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    gap: 20,
  },
  form: {
    gap: 12,
  },
  inputs: {
    fontFamily: Fonts.SFSemiBold,
    color: Colors.black,
  },
  inputBorderColor: {
    borderColor: Colors.gray30,
  },
  inputInfoContainer: {
    borderRadius: 20,
  },
  description: {
    fontFamily: Fonts.SFSemiBold,
    fontSize: 14,
    color: Colors.black,
  },
  label: {
    color: Colors.gray70,
    fontFamily: Fonts.TRegular,
    fontSize: 13,
  },
});
