import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useUnit } from "effector-react";
import { FC } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { getRelativesByUserId } from "@/entities/profile";
import { VacanciesControlledRadioGroup } from "@/entities/vacancies-controlled-radio-group";
import {
  $vacancyResumeForm,
  setVacancyResumeFormSecondStep,
} from "@/entities/vacancy-resume";
import { $auth } from "@/shared/api/auth.store";
import { Colors, Fonts } from "@/shared/styles/tokens";
import { GradientButton } from "@/shared/ui";
import {
  ISecondStepSchemaInitialType,
  ISecondStepSchemaType,
  SecondStepSchema,
} from "../model/ResumeForms.schema";

interface IResumeSecondStepFormProps {
  changeResumeStep: (newStep: string | number) => void;
}
export const ResumeSecondStepForm: FC<IResumeSecondStepFormProps> = ({
  changeResumeStep,
}) => {
  const { kanUid } = useUnit($auth);
  const { secondStep } = useUnit($vacancyResumeForm);

  const { data: relatives, isError: isRelativesError } = useQuery({
    queryKey: ["relatives", { kanUid }],
    queryFn: () => getRelativesByUserId({ user_kan_uid: kanUid as string }),
  });

  const methods = useForm<
    ISecondStepSchemaInitialType,
    unknown,
    ISecondStepSchemaType
  >({
    resolver: zodResolver(SecondStepSchema),
    values: {
      add_relatives: secondStep.add_relatives || false,
    },
  });

  const {
    handleSubmit,
    setError,
    formState: { isValid },
  } = methods;

  const onRadioChange = (value: boolean) => {
    setVacancyResumeFormSecondStep({ add_relatives: value });
  };

  const onSubmit: SubmitHandler<ISecondStepSchemaInitialType> = async (
    newData,
  ) => {
    if (
      newData.add_relatives &&
      (relatives?.length === 0 || isRelativesError)
    ) {
      setError("add_relatives", {
        type: "custom",
        message: "Добавьте родственников в личном профиле",
      });
      Toast.show({
        type: "error",
        text1: "Добавьте родственников в личном профиле",
      });
      return;
    }

    changeResumeStep(3);
  };

  return (
    <FormProvider {...methods}>
      <View style={styles.container}>
        <VacanciesControlledRadioGroup
          name="add_relatives"
          onValueChange={onRadioChange}
          relatives={relatives}
          isRelativesError={isRelativesError}
        />
      </View>
      <GradientButton
        onPress={handleSubmit(onSubmit)}
        style={styles.button}
        disabled={
          (relatives?.length === 0 && secondStep.add_relatives) ||
          !isValid ||
          (relatives && relatives.length > 0 && !secondStep.add_relatives) ||
          isRelativesError
        }
      >
        <Text>Далее</Text>
      </GradientButton>
    </FormProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },

  button: {
    marginTop: 20,
  },
  appealText: {
    fontFamily: Fonts.TRegular,
    fontSize: 14,
    color: Colors.gray70,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },

  infoBlock: {
    borderWidth: 1,
    borderColor: Colors.gray30,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },

  infoBlockText: {
    fontFamily: Fonts.TRegular,
    fontSize: 14,
    color: Colors.redAccent,
  },
});
