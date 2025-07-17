import { router, Stack } from "expo-router";
import { StyleSheet, View } from "react-native";
import { NestedHeaderWithRightLink } from "@/entities/nested-header";
import { useResumeStepper } from "@/entities/vacancy-resume";
import { ResumeFirstStepForm } from "./ResumeFirstStepForm";
import { ResumeFourthStepForm } from "./ResumeFourthStepForm";
import { ResumeSecondStepForm } from "./ResumeSecondStepForm";
import { ResumeThirdStepForm } from "./ResumeThirdStepForm";

export const ResumeFormsWrapper = () => {
  const { step, changeResumeStep } = useResumeStepper();

  const renderStepForm = () => {
    switch (step) {
      case "1":
        return <ResumeFirstStepForm changeResumeStep={changeResumeStep} />;
      case "2":
        return <ResumeSecondStepForm changeResumeStep={changeResumeStep} />;
      case "3":
        return <ResumeThirdStepForm changeResumeStep={changeResumeStep} />;
      case "4":
        return <ResumeFourthStepForm />;
      default:
        return <ResumeFirstStepForm changeResumeStep={changeResumeStep} />;
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          header: (props) => (
            <NestedHeaderWithRightLink
              withInsets={false}
              headerTitle="Моя анкета"
              rightLinkHref="/(tabs)/profile/(profileTabs)?from=resume"
              rightLinkTitle={`Перейти в \nличный профиль`}
              rightLinkVisibility={Number(step) < 3}
              backPress={() => {
                if (Number(step) > 1) {
                  changeResumeStep(Number(step) - 1);
                } else {
                  router.back();
                }
              }}
              {...props}
            />
          ),
        }}
      />
      <View style={styles.formsContainer}>{renderStepForm()}</View>
    </>
  );
};

const styles = StyleSheet.create({
  formsContainer: {
    marginVertical: 32,
  },
});
