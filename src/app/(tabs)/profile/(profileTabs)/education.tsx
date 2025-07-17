import { useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-actions-sheet";
import { CourseForm, CoursesList } from "@/entities/courses";
import { PersonalEducation } from "@/features/PersonalEducation";
import { Colors, Fonts } from "@/shared/styles/tokens";
import { GradientButton } from "@/shared/ui";

const Education = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <ScrollView
      keyboardShouldPersistTaps={Platform.OS === "android" ? "always" : "never"}
      contentContainerStyle={styles.container}
      style={{ backgroundColor: Colors.white }}
      automaticallyAdjustKeyboardInsets={true}
      keyboardDismissMode="on-drag"
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.courses}>
        <PersonalEducation />

        <View>
          <Text style={styles.title}>Повышение квалификации, курсы</Text>
          {isVisible && (
            <CourseForm isVisible={isVisible} setIsVisible={setIsVisible} />
          )}
          <GradientButton
            disabled={isVisible}
            onPress={() => setIsVisible((prev) => !prev)}
            gradientStyles={{ paddingVertical: 15, marginBottom: 12 }}
          >
            Добавить
          </GradientButton>
          <CoursesList />
        </View>
      </View>
    </ScrollView>
  );
};

export default Education;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,

    paddingBottom: Platform.OS === "ios" ? 64 : 32,
    paddingTop: 20,
    flexGrow: 1,
  },
  courses: {
    gap: 24,
  },
  title: {
    fontSize: 16,
    color: Colors.black,
    fontFamily: Fonts.TBold,
    marginBottom: 12,
  },
});
