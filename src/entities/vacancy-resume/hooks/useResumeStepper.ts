import { router, useLocalSearchParams } from "expo-router";

export const useResumeStepper = () => {
  const { step, ...params } = useLocalSearchParams();

  const changeResumeStep = (newStep: string | number) => {
    router.push({
      pathname: "/(withoutTabs)/vacancies/resume",
      params: { ...params, step: String(newStep) },
    });
  };

  return { step, changeResumeStep };
};
