import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useUnit } from "effector-react";
import { router } from "expo-router";
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
  IIssueStandartFormSchemaInitialType,
  IIssueStandartFormSchemaType,
  IssueStandartFormSchema,
  resetSelectedCategory,
} from "@/entities/issues";
import { IssuesPicker } from "@/features/IssuesPicker";
import { $auth } from "@/shared/api/auth.store";
import { errorForMutateQueries } from "@/shared/lib/query-errors";
import { Colors } from "@/shared/styles/tokens";
import { ControlledInput, LinearGradientButton } from "@/shared/ui";

export const IssueStandartForm = () => {
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
    IIssueStandartFormSchemaInitialType,
    unknown,
    IIssueStandartFormSchemaType
  >({
    resolver: zodResolver(IssueStandartFormSchema),
    shouldFocusError: false,
    defaultValues: {
      body: "",
      files: [],
    },
  });

  const { handleSubmit, reset } = methods;

  const onSubmit: SubmitHandler<IIssueStandartFormSchemaType> = async (
    newData,
  ) => {
    const formData = getFormData(newData, kanUid, selectedCategory!.id);
    createIssueMutate(formData);
  };

  const onError: SubmitErrorHandler<Partial<IIssueStandartFormSchemaType>> = (
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
            name="body"
            labelText="Описание"
            style={styles.inputLabel}
            labelStyle={styles.inputLabelText}
            isRequired
            multiline
            scrollEnabled={false}
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
