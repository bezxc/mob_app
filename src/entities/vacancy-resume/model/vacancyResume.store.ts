import { createEvent, createStore } from "effector";
import {
  IInitVacancyResumeForm,
  IVacancyResumeCareer,
  IVacancyResumeFirstStep,
  IVacancyResumeForm,
  IVacancyResumeFourthStep,
  IVacancyResumeSecondStep,
} from "./types";

export const setVacancyResumeForm = createEvent<IInitVacancyResumeForm>();

export const setVacancyResumeFormFirstStep =
  createEvent<IVacancyResumeFirstStep>();

export const setVacancyResumeFormSecondStep =
  createEvent<IVacancyResumeSecondStep>();

export const setVacancyResumeFormThirdStep = createEvent<{
  index?: number;
  data?: Partial<IVacancyResumeCareer>;
  flag: "delete" | "update" | "add" | "initialHistories";
}>();

export const setVacancyResumeFormFourthStep =
  createEvent<IVacancyResumeFourthStep>();

export const resetVacancyResumeForm = createEvent();

const vacancyResumeFormInitialState: IVacancyResumeForm = {
  enabled: true,
  firstStep: {},
  secondStep: {},
  thirdStep: {},
  fourthStep: {},
};

export const $vacancyResumeForm = createStore(vacancyResumeFormInitialState);

$vacancyResumeForm
  .on(setVacancyResumeForm, (state, payload) => ({
    ...state,
    enabled: false,
    firstStep: {
      add_courses: payload.add_courses,
      driver_license: payload.driver_license,
      driving_experience: payload.driving_experience,
      is_married: payload.is_married,
    },
    secondStep: {
      add_relatives: payload.add_relatives,
    },
    thirdStep: {
      career_histories: payload.career_histories,
    },
    fourthStep: {
      desired_salary: payload.desired_salary,
      motivation: payload.motivation,
      office_programs: payload.office_programs,
      work_schedule: payload.work_schedule,
      supervisor_kan_uid: payload.supervisor_kan_uid,
    },
  }))
  .on(setVacancyResumeFormFirstStep, (state, payload) => ({
    ...state,
    firstStep: {
      ...state.firstStep,
      ...payload,
    },
  }))
  .on(setVacancyResumeFormSecondStep, (state, payload) => ({
    ...state,
    secondStep: {
      ...state.secondStep,
      ...payload,
    },
  }))
  .on(setVacancyResumeFormThirdStep, (state, { index, data, flag }) => {
    const currentCareerHistories = state.thirdStep.career_histories || [];

    let updatedCareerHistories: IVacancyResumeCareer[];

    switch (flag) {
      case "initialHistories":
        updatedCareerHistories = [
          {
            ...data,
            id: currentCareerHistories[0]?.id ?? null,
          } as IVacancyResumeCareer,
          ...currentCareerHistories.filter((_, i) => i !== 0),
        ];
        break;

      case "delete":
        updatedCareerHistories = currentCareerHistories.filter(
          (_, i) => i !== index,
        );
        break;

      case "update":
        if (index !== undefined) {
          updatedCareerHistories = currentCareerHistories.map((item, i) =>
            i === index ? { ...item, ...data } : item,
          );
        } else {
          updatedCareerHistories = currentCareerHistories;
        }
        break;

      case "add":
        updatedCareerHistories = [
          ...currentCareerHistories,
          data as IVacancyResumeCareer, // Добавляем без id
        ];
        break;

      default:
        updatedCareerHistories = currentCareerHistories;
        break;
    }

    return {
      ...state,
      thirdStep: {
        ...state.thirdStep,
        career_histories: updatedCareerHistories,
      },
    };
  })
  .on(setVacancyResumeFormFourthStep, (state, payload) => ({
    ...state,
    fourthStep: {
      ...state.fourthStep,
      ...payload,
    },
  }))
  .reset(resetVacancyResumeForm);

$vacancyResumeForm.watch((state) => {
  console.log("watch", state);
});
