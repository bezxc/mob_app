import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useUnit } from "effector-react";
import { useLocalSearchParams } from "expo-router";
import { FC } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { getColleagueInfoV2 } from "@/entities/colleagues";
import { ControlledSelect } from "@/entities/controlled-select";
import { CoursedCard, getAllCoursesByUserId } from "@/entities/courses";
import { EducationCard } from "@/entities/education-card";
import { EducationType, getEducationInfo } from "@/entities/profile";
import { getVacancyInfo } from "@/entities/vacancies";
import {
  $vacancyResumeForm,
  setVacancyResumeFormFirstStep,
} from "@/entities/vacancy-resume";
import { $auth } from "@/shared/api/auth.store";
import { formErrorHandler } from "@/shared/lib/formErrorHandler";
import { Colors, Fonts } from "@/shared/styles/tokens";
import {
  ControlledInput,
  ControlledRadioButton,
  InputInfo,
  LinearGradientButton,
} from "@/shared/ui";
import { formatDateWithTime } from "@/shared/utils";
import { getIsMarriedOptionsByGender } from "../model/helpers";
import {
  FirstStepSchema,
  IFirstStepSchemaInitialType,
  IFirstStepSchemaType,
} from "../model/ResumeForms.schema";

interface IResumeFirstStepFormProps {
  changeResumeStep: (newStep: string | number) => void;
}

export const ResumeFirstStepForm: FC<IResumeFirstStepFormProps> = ({
  changeResumeStep,
}) => {
  const { vacancy_guid }: { vacancy_guid: string } = useLocalSearchParams();
  const { kanUid } = useUnit($auth);
  const { firstStep } = useUnit($vacancyResumeForm);

  const { data: user } = useQuery({
    queryKey: ["user", { kanUid }],
    queryFn: () => getColleagueInfoV2({ kan_uid: kanUid }),
  });

  const { data: educations, isError: isEducationsError } =
    useQuery<EducationType>({
      queryKey: ["educations", { kanUid }],
      queryFn: () => getEducationInfo(kanUid),
    });

  const { data: courses, isError: isCoursesError } = useQuery({
    queryKey: ["courses", { kanUid }],
    queryFn: () => {
      return getAllCoursesByUserId(Number(kanUid));
    },
  });

  const { data: vacancyInfo } = useQuery({
    queryKey: ["vacancy", vacancy_guid],
    queryFn: () => getVacancyInfo(vacancy_guid as string),
    enabled: Boolean(vacancy_guid),
  });

  const methods = useForm<
    IFirstStepSchemaInitialType,
    unknown,
    IFirstStepSchemaType
  >({
    resolver: zodResolver(FirstStepSchema),
    values: {
      is_married: firstStep.is_married || false,
      driver_license: firstStep.driver_license || false,
      driving_experience: firstStep.driving_experience ?? null,
      add_courses: firstStep.add_courses || false,
    },
  });

  const {
    handleSubmit,
    setError,
    formState: { isValid },
  } = methods;

  const onSubmit: SubmitHandler<IFirstStepSchemaType> = async (newData) => {
    if ((courses?.length === 0 || isCoursesError) && newData.add_courses) {
      setError("add_courses", {
        type: "custom",
        message: "Добавьте хотя бы один курс в личном профиле",
      });
      Toast.show({
        type: "error",
        text1: "Добавьте хотя бы один курс в личном профиле",
      });
      return;
    }
    changeResumeStep(2);
  };

  return (
    <FormProvider {...methods}>
      <View style={styles.container}>
        <Text style={styles.appealText}>
          Уважаемый коллега! Эта анкета - Ваша возможность заявить о себе, как о
          лучшем кандидате на вакантную позицию Компании.
        </Text>
        <View style={styles.infoBlock}>
          <Text style={styles.infoBlockText}>
            Редактирование информации доступно в Личном профиле
          </Text>
        </View>

        {vacancy_guid && (
          <InputInfo
            label="Вакансия"
            description={vacancyInfo?.position_name || ""}
          />
        )}

        <InputInfo label="ФИО" description={user?.full_name || ""} />
        <InputInfo
          label="Личный номер телефона"
          description={user?.home_phone || ""}
        />
        <InputInfo label="Мой Telegram" description={user?.telegram || ""} />
        <InputInfo
          label="Дата рождения"
          description={
            formatDateWithTime(user?.date_of_birth, "issuesCard") || ""
          }
        />
        <ControlledSelect
          name="is_married"
          onCustomChange={(value) => {
            setVacancyResumeFormFirstStep({
              is_married: value as boolean,
            });
          }}
          options={getIsMarriedOptionsByGender(user?.gender)}
          label="Cемейное положение"
        />
        <ControlledRadioButton
          onCustomChange={(value) => {
            setVacancyResumeFormFirstStep({
              driver_license: value as boolean,
              driving_experience: !value ? null : 0,
            });
          }}
          name="driver_license"
          label="Наличие ВУ"
        />
        {/* TODO: Когда значение в false на бэк отправляем null!!!!!! */}
        {firstStep.driver_license && (
          <ControlledInput
            isRequired
            keyboardType="numeric"
            textContentType="birthdateYear"
            name="driving_experience"
            labelText="Стаж вождения (лет)"
            style={styles.inputLabel}
            labelStyle={styles.inputLabelText}
            onCustomChange={(value) => {
              setVacancyResumeFormFirstStep({
                driving_experience: Number(value),
              });
            }}
          />
        )}

        {(educations && educations.length === 0) || isEducationsError ? (
          <InputInfo
            style={styles.infoBlock}
            labelStyle={styles.educationLabel}
            descriptionStyle={styles.educationDescription}
            label="Образование"
            description="Нет данных об образовании. Просьба обратиться в отдел кадров."
          />
        ) : (
          educations?.map((education) => (
            <EducationCard
              key={education.educational_institution}
              educational_institution={education.educational_institution}
              specialization={education.specialization}
              type_of_education={education.type_of_education}
              year_of_graduation={education.year_of_graduation}
            />
          ))
        )}

        <ControlledRadioButton
          onCustomChange={(value) => {
            setVacancyResumeFormFirstStep({
              add_courses: value as boolean,
            });
          }}
          name="add_courses"
          label="Добавить повышение квалификации, курсы из Личного профиля"
        />

        {firstStep.add_courses && (
          <View style={{ gap: 12 }}>
            {(courses && courses.length === 0) || isCoursesError ? (
              <InputInfo
                style={styles.infoBlock}
                labelStyle={styles.educationLabel}
                descriptionStyle={styles.educationDescription}
                label="Курсы"
                description="Нет данных о курсах. Вы можете добавить информацию о пройденных курсах в личном профиле."
              />
            ) : (
              courses?.map((course) => (
                <CoursedCard key={course.id} withEdit={false} {...course} />
              ))
            )}
          </View>
        )}
        <LinearGradientButton
          onPress={handleSubmit(onSubmit, formErrorHandler)}
          style={{ marginTop: 8 }}
          disabled={
            ((courses?.length === 0 || isCoursesError) &&
              firstStep.add_courses) ||
            !isValid
          }
          text="Далее"
        />
      </View>
    </FormProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
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
    backgroundColor: Colors.white,
  },

  infoBlockText: {
    fontFamily: Fonts.TRegular,
    fontSize: 14,
    color: Colors.redAccent,
  },
  inputLabel: {
    borderColor: Colors.gray30,
  },
  inputLabelText: {
    color: Colors.gray70,
  },
  educationDescription: {
    fontFamily: Fonts.TRegular,
    fontSize: 14,
    color: Colors.redAccent,
  },
  educationLabel: {
    fontFamily: Fonts.TRegular,
    fontSize: 12,
    color: Colors.gray70,
  },
});
