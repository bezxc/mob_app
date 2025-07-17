import { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useResumeStepper } from "@/entities/vacancy-resume";
import { Colors, Fonts } from "@/shared/styles/tokens";

export const ResumeStepper = () => {
  const { changeResumeStep, step } = useResumeStepper();
  return (
    <View style={styles.stepper}>
      {[1, 2, 3, 4].map((item) => (
        <TouchableOpacity
          key={item}
          onPress={() => {
            changeResumeStep(item);
          }}
        >
          <View
            style={[styles.step, item === Number(step) && styles.stepActive]}
          >
            <Text style={styles.stepText}>{item}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  stepper: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    alignSelf: "center",
  },
  step: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.gray30,
    alignItems: "center",
    justifyContent: "center",
  },
  stepActive: {
    backgroundColor: Colors.redAccent,
  },
  stepText: {
    fontFamily: Fonts.SFSemiBold,
    fontSize: 14,
    color: Colors.white,
  },
});
