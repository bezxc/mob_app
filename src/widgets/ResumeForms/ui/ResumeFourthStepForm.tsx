import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useUnit } from "effector-react";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";
import { ZodError } from "zod";
import { getColleagueInfoV2 } from "@/entities/colleagues";
import { getAllCoursesByUserId } from "@/entities/courses";
import { getRelativesByUserId } from "@/entities/profile";
import { createVacancyResponse } from "@/entities/vacancies";
import {
  $vacancyResumeForm,
  AgreementButton,
  fullStepperErrorHandler,
  IChangeVacancyResume,
  resetVacancyResumeForm,
  setVacancyResumeFormFourthStep,
  updateVacancyResume,
} from "@/entities/vacancy-resume";
import { $auth } from "@/shared/api/auth.store";
import { formErrorHandler } from "@/shared/lib/formErrorHandler";
import { errorForMutateQueries } from "@/shared/lib/query-errors";
import { Colors, Fonts } from "@/shared/styles/tokens";
import { ControlledInput, LinearGradientButton, Select } from "@/shared/ui";
import { getPersonalAgreementText } from "../model/helpers";
import {
  FourthStepSchema,
  IFourthStepSchemaInitialType,
  IFourthStepSchemaType,
  ResumeFormsSchema,
} from "../model/ResumeForms.schema";

export const ResumeFourthStepForm = () => {
  const { vacancy_guid }: { vacancy_guid: string } = useLocalSearchParams();
  const { kanUid } = useUnit($auth);
  const queryClient = useQueryClient();

  const { fourthStep, firstStep, secondStep, thirdStep } =
    useUnit($vacancyResumeForm);

  const [agreement, setAgreement] = useState(false);
  const [agreementVacancy, setAgreementVacancy] = useState(false);

  const { data: supervisor } = useQuery({
    queryKey: ["user", { kanUid: fourthStep.supervisor_kan_uid }],
    queryFn: () =>
      getColleagueInfoV2({ kan_uid: String(fourthStep.supervisor_kan_uid) }),
    enabled: Boolean(fourthStep.supervisor_kan_uid),
  });

  const { data: courses, isError: isCoursesError } = useQuery({
    queryKey: ["courses", { kanUid }],
    queryFn: () => {
      return getAllCoursesByUserId(Number(kanUid));
    },
  });

  const { data: relatives, isError: isRelativesError } = useQuery({
    queryKey: ["relatives", { kanUid }],
    queryFn: () => getRelativesByUserId({ user_kan_uid: kanUid as string }),
  });

  const { mutate: updateResume } = useMutation({
    mutationFn: ({ data }: { data: IChangeVacancyResume }) =>
      updateVacancyResume(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["vacancy-resume", { kanUid }],
      });
      if (!vacancy_guid) {
        router.replace(`/(withoutTabs)/vacancies`);
      }
      if (vacancy_guid) {
        createVacancyResponseFn({
          kanUid: String(kanUid),
          vacancyGuid: vacancy_guid,
        });
      }
      resetVacancyResumeForm();
    },

    onError: (e) => {
      Toast.show({
        type: "error",
        text1: "Возникла ошибка, пожалуйста, попробуйте позже",
      });
      console.log(e);
    },
  });

  const { mutate: createVacancyResponseFn } = useMutation({
    mutationFn: async ({
      vacancyGuid,
      kanUid,
    }: {
      vacancyGuid: string;
      kanUid: string;
    }) => createVacancyResponse({ vacancyGuid, kanUid }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["vacancyResponses", vacancy_guid],
      });
      router.replace(`/(withoutTabs)/vacancies/responses`);
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
    IFourthStepSchemaInitialType,
    unknown,
    IFourthStepSchemaType
  >({
    resolver: zodResolver(FourthStepSchema),
    values: {
      desired_salary: fourthStep.desired_salary || null,
      motivation: fourthStep.motivation || "",
      office_programs: fourthStep.office_programs || "",
      work_schedule: fourthStep.work_schedule || "",
      supervisor_kan_uid: fourthStep.supervisor_kan_uid ?? null,
    },
  });

  const {
    handleSubmit,
    formState: { isValid },
  } = methods;

  const onSubmit: SubmitHandler<IFourthStepSchemaType> = async () => {
    try {
      ResumeFormsSchema.parse({
        first_step: firstStep,
        second_step: secondStep,
        third_step: thirdStep,
        fourth_step: fourthStep,
      });

      if ((courses?.length === 0 || isCoursesError) && firstStep.add_courses) {
        throw new Error("Шаг 1. Добавьте хотя бы один курс в личном профиле");
      }

      if (
        (secondStep.add_relatives &&
          (relatives?.length === 0 || isRelativesError)) ||
        (relatives && relatives.length > 0 && !secondStep.add_relatives)
      ) {
        throw new Error("Шаг 2. Добавьте родственников в личном профиле");
      }

      updateResume({
        data: {
          resume_user_kan_uid: Number(kanUid) as number,
          doc_key: "",
          ...firstStep,
          ...secondStep,
          ...thirdStep,
          ...fourthStep,
        } as IChangeVacancyResume,
      });
    } catch (error) {
      console.log(error);
      fullStepperErrorHandler(error as ZodError);
    }
  };

  return (
    <FormProvider {...methods}>
      <View style={styles.container}>
        <ControlledInput
          isRequired
          placeholder="Например: 50000"
          keyboardType="numeric"
          name="desired_salary"
          labelText="Пожелания по заработной плате"
          style={styles.inputLabel}
          labelStyle={styles.inputLabelText}
          onCustomChange={(value) => {
            setVacancyResumeFormFourthStep({
              desired_salary: Number(value),
            });
          }}
        />
        <ControlledInput
          isRequired
          placeholder="Например: 5/2"
          name="work_schedule"
          labelText="Желаемый график работы"
          style={styles.inputLabel}
          labelStyle={styles.inputLabelText}
          onCustomChange={(value) => {
            setVacancyResumeFormFourthStep({
              work_schedule: value,
            });
          }}
        />
        <ControlledInput
          isRequired
          name="office_programs"
          placeholder="Например: word, excel"
          labelText="Знание офисных программ"
          style={styles.inputLabel}
          labelStyle={styles.inputLabelText}
          onCustomChange={(value) => {
            setVacancyResumeFormFourthStep({
              office_programs: value,
            });
          }}
        />
        <ControlledInput
          multiline
          scrollEnabled={false}
          name="motivation"
          placeholder="Например: интересные задачи, заработная плата, коллектив."
          labelText="Что Вас мотивирует в работе?"
          style={styles.inputLabel}
          labelStyle={styles.inputLabelText}
          onCustomChange={(value) => {
            setVacancyResumeFormFourthStep({
              motivation: value,
            });
          }}
        />
        <Select
          isRequired
          label="Укажите Вашего текущего руководителя"
          value={supervisor?.full_name || "Выбрать..."}
          onPress={() =>
            router.push({
              pathname: "/(tabs)/colleagues",
              params: { from: "resume" },
            })
          }
          selectedColor={{ fontFamily: Fonts.TBold }}
          withIcon={false}
        />

        {vacancy_guid && (
          <AgreementButton
            disableShowMore
            label="Я уведомил своего руководителя о том, что участвую в конкурсе на позицию"
            selected={agreementVacancy}
            onPress={() => {
              setAgreementVacancy((prev) => !prev);
            }}
          />
        )}

        <AgreementButton
          label={getPersonalAgreementText(Boolean(vacancy_guid))}
          selected={agreement}
          onPress={() => {
            setAgreement((prev) => !prev);
          }}
        />

        <LinearGradientButton
          onPress={handleSubmit(onSubmit, formErrorHandler)}
          style={{ marginTop: 8 }}
          disabled={
            !isValid ||
            !agreement ||
            (Boolean(vacancy_guid) && !agreementVacancy)
          }
          text={vacancy_guid ? "Откликнуться" : "Сохранить"}
        />
      </View>
    </FormProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  inputLabel: {
    borderColor: Colors.gray30,
  },
  inputLabelText: {
    color: Colors.gray70,
  },
});
