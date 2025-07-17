import { useQuery } from "@tanstack/react-query";
import { useUnit } from "effector-react";
import {
  Keyboard,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import {
  $vacancyResumeForm,
  getVacancyResume,
} from "@/entities/vacancy-resume";
import { $auth } from "@/shared/api/auth.store";
import { Colors } from "@/shared/styles/tokens";
import { ResumeFormsWrapper } from "@/widgets/ResumeForms";
import { ResumeStepper } from "@/widgets/ResumeStepper";

export default function ResumeScreen() {
  const { kanUid } = useUnit($auth);
  const { enabled } = useUnit($vacancyResumeForm);

  useQuery({
    queryKey: ["vacancy-resume", { kanUid }],
    queryFn: () => getVacancyResume({ kanUid: String(kanUid) }),
    enabled,
    retry: 1,
  });

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView
        keyboardShouldPersistTaps={
          Platform.OS === "android" ? "always" : "never"
        }
        automaticallyAdjustKeyboardInsets={true}
        keyboardDismissMode="on-drag"
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        style={styles.container}
      >
        <ResumeStepper />
        <ResumeFormsWrapper />
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 18,
  },
});
