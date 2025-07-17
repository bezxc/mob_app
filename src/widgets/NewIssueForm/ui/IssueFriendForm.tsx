import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useUnit } from "effector-react";
import { router } from "expo-router";
import React from "react";
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import {
  Keyboard,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import Toast from "react-native-toast-message";
import {
  $issuesCategorySelect,
  createIssue,
  formErrorHandler,
  getFormData,
  IIssueFriendFormSchemaInitialType,
  IIssueFriendFormSchemaType,
  IssueFriendFormSchema,
  resetSelectedCategory,
} from "@/entities/issues";
import { IssuesPicker } from "@/features/IssuesPicker";
import { $auth } from "@/shared/api/auth.store";
import { errorForMutateQueries } from "@/shared/lib/query-errors";
import { Colors } from "@/shared/styles/tokens";
import { ControlledInput, LinearGradientButton, PhoneInput } from "@/shared/ui";

export const IssueFriendForm = () => {
  const { selectedCategory } = useUnit($issuesCategorySelect);

  const { kanUid } = useUnit($auth);
  const queryClient = useQueryClient();

  const { mutate: createIssueMutate } = useMutation({
    mutationFn: async (formData: FormData) => createIssue(formData),
    onSuccess: () => {
      reset();
      resetSelectedCategory();
      queryClient.invalidateQueries({ queryKey: ["issues"] });
      router.push(`/(withoutTabs)/issuesPage/issues`);
    },
    onError: (e: AxiosError) => {
      const errorMessage = errorForMutateQueries(e);
      Toast.show({
        type: "error",
        text1: "Произошла ошибка",
        text2: errorMessage as string,
      });
    },
  });

  const methods = useForm<
    IIssueFriendFormSchemaInitialType,
    unknown,
    IIssueFriendFormSchemaType
  >({
    resolver: zodResolver(IssueFriendFormSchema),
    shouldFocusError: false,
    defaultValues: {
      applicant_vacancy: "",
      applicant_phone: "",
      applicant_full_name: "",
      files: [],
    },
  });

  const { handleSubmit, reset } = methods;

  const onSubmit: SubmitHandler<IIssueFriendFormSchemaType> = async (
    newData,
  ) => {
    const formData = getFormData(newData, kanUid, selectedCategory!.id);
    createIssueMutate(formData);
  };

  const onError: SubmitErrorHandler<Partial<IIssueFriendFormSchemaType>> = (
    errors,
  ) => {
    formErrorHandler(errors);
  };
  return (
    <TouchableWithoutFeedback onPressOut={() => Keyboard.dismiss()}>
      <ScrollView
        keyboardShouldPersistTaps={
          Platform.OS === "android" ? "always" : "never"
        }
        automaticallyAdjustKeyboardInsets={true}
        keyboardDismissMode="on-drag"
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <FormProvider {...methods}>
          <ControlledInput
            name="applicant_full_name"
            labelText="ФИО рекомендуемого кандидата"
            multiline
            scrollEnabled={false}
            isRequired
            style={styles.inputLabel}
            labelStyle={styles.inputLabelText}
          />
          <PhoneInput
            name="applicant_phone"
            labelText="Телефон кандидата"
            isRequired
          />
          <ControlledInput
            name="applicant_vacancy"
            labelText="На какую вакансию Вы рекомендуете данного кандидата и почему"
            multiline
            scrollEnabled={false}
            isRequired
            style={styles.inputLabel}
            labelStyle={styles.inputLabelText}
          />
          <IssuesPicker />
        </FormProvider>

        <LinearGradientButton
          onPress={handleSubmit(onSubmit, onError)}
          text="Отправить заявку"
        />
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 25,
    paddingBottom: 32,
  },
  inputLabel: {
    borderColor: Colors.gray30,
  },
  inputLabelText: {
    color: Colors.gray50,
  },
});
