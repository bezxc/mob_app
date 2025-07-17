import { useUnit } from "effector-react";
import { router } from "expo-router";
import { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { $vacancyResumeForm } from "@/entities/vacancy-resume";
import {
  CurrentPlaceOfWork,
  PastPlaceOfWork,
} from "@/features/ResumeExperienceForms";
import { Colors, Fonts } from "@/shared/styles/tokens";
import { LinearGradientButton } from "@/shared/ui";

interface IResumeThirdStepFormProps {
  changeResumeStep: (newStep: string | number) => void;
}

export const ResumeThirdStepForm: FC<IResumeThirdStepFormProps> = ({
  changeResumeStep,
}) => {
  const onSubmit = async () => {
    changeResumeStep(4);
  };

  const { thirdStep } = useUnit($vacancyResumeForm);

  const handleAddPlaceOfWork = () => {
    if (thirdStep.career_histories && thirdStep.career_histories.length < 6) {
      router.push("/(withoutTabs)/pastWorkForm");
    } else {
      Toast.show({
        type: "error",
        text1: "Вы можете добавить не более 6 мест работы",
      });
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => router.push("/(withoutTabs)/editCurrentWorkForm")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          Заполнить данные о текущем месте работы
        </Text>
      </TouchableOpacity>
      <CurrentPlaceOfWork />
      <TouchableOpacity onPress={handleAddPlaceOfWork} style={styles.button}>
        <Text style={styles.buttonText}>Добавить место работы</Text>
      </TouchableOpacity>
      <PastPlaceOfWork />
      <LinearGradientButton
        onPress={onSubmit}
        style={{ marginTop: 8 }}
        text="Далее"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 15,
  },
  button: {
    borderWidth: 1,
    borderColor: Colors.gray30,
    textAlign: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 13,
  },
  buttonText: {
    textAlign: "center",
    fontFamily: Fonts.TRegular,
    fontSize: 14,
  },
});
