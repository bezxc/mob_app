import { zodResolver } from "@hookform/resolvers/zod";
import { useUnit } from "effector-react";
import { router, useLocalSearchParams } from "expo-router";
import { FormProvider, useForm } from "react-hook-form";
import { Platform, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-actions-sheet";
import {
  $vacancyResumeForm,
  IVacancyResumeCareer,
  setVacancyResumeFormThirdStep,
} from "@/entities/vacancy-resume";
import { ControlledDatePicker } from "@/features/controlled-datepicker";
import { $auth } from "@/shared/api/auth.store";
import dayjs from "@/shared/lib/dayjs";
import { Colors, Fonts } from "@/shared/styles/tokens";
import { ControlledInput, LinearGradientButton } from "@/shared/ui";
import {
  IPastPlaceOfWorkSchemaInitialType,
  IPastPlaceOfWorkSchemaType,
  PastPlaceOfWorkFormSchema,
} from "../model/PastPlaceOfWorkForm.schema";

export const PastPlaceOfWorkForm = () => {
  const { thirdStep } = useUnit($vacancyResumeForm);
  const { searchParam } = useLocalSearchParams();
  const { kanUid } = useUnit($auth);

  const index = typeof searchParam === "string" ? Number(searchParam) : null;
  const careerItem =
    index !== null ? thirdStep.career_histories?.[index] : null;

  const {
    date_start = "",
    date_end = "",
    organization_name = "",
    position = "",
    responsibilities = "",
    progress = "",
    reason_for_dismissal = "",
  } = careerItem || {};

  const methods = useForm<
    IPastPlaceOfWorkSchemaInitialType,
    unknown,
    IPastPlaceOfWorkSchemaType
  >({
    resolver: zodResolver(PastPlaceOfWorkFormSchema),
    values: {
      responsibilities,
      progress,
      reason_for_dismissal,
      date_start: date_start ? new Date(date_start) : null,
      date_end: date_end ? new Date(date_end) : null,
      organization_name,
      position,
    },
  });

  const onSubmit = (data: IPastPlaceOfWorkSchemaType) => {
    const careerData: IVacancyResumeCareer = {
      date_start: dayjs(data.date_start).format("YYYY-MM-DD"),
      date_end: data.date_end
        ? dayjs(data.date_end).format("YYYY-MM-DD")
        : null,
      organization_name: data.organization_name,
      position: data.position,
      responsibilities: data.responsibilities,
      progress: data.progress,
      reason_for_dismissal: data.reason_for_dismissal,
      department_name: null,
      is_current: false,
      management_name: null,
      resume_user_kan_uid: Number(kanUid),
      id: careerItem?.id || null,
    };

    setVacancyResumeFormThirdStep({
      flag: index !== null ? "update" : "add",
      index: index || undefined,
      data: careerData,
    });

    router.dismiss();
  };

  const resetForm = () => {
    reset({
      responsibilities: "",
      progress: "",
      reason_for_dismissal: "",
      date_start: null,
      date_end: null,
      organization_name: "",
      position: "",
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
      <View style={styles.form}>
        <FormProvider {...methods}>
          <ControlledInput
            isRequired
            withError
            labelText="Наименования организации"
            name="organization_name"
            inputStyle={styles.inputs}
            labelStyle={styles.label}
            style={[styles.inputInfoContainer, styles.inputBorderColor]}
          />
          <ControlledDatePicker
            isRequired
            name="date_start"
            label="Дата начала работы"
            labelStyle={styles.dateLabel}
            containerStyle={{ borderColor: Colors.gray30 }}
            miniVariant={false}
          />
          <ControlledDatePicker
            isRequired
            name="date_end"
            label="Дата окончания работы"
            labelStyle={styles.dateLabel}
            containerStyle={{ borderColor: Colors.gray30 }}
            miniVariant={false}
          />
          <ControlledInput
            isRequired
            labelText="Должность"
            name="position"
            inputStyle={styles.inputs}
            labelStyle={styles.label}
            style={[styles.inputInfoContainer, styles.inputBorderColor]}
          />
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
  dateLabel: {
    color: Colors.gray70,
    fontFamily: Fonts.TRegular,
    fontSize: 13,
    paddingHorizontal: 21,
  },
});
