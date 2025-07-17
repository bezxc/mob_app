import { Platform, ScrollView, StyleSheet } from "react-native";
import { PersonalCareer } from "@/features/PersonalCareer";
import { Colors } from "@/shared/styles/tokens";

const Career = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
      style={{ backgroundColor: Colors.white }}
    >
      <PersonalCareer />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flexGrow: 1,
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: Platform.OS === "ios" ? 64 : 32,
  },
});

export default Career;
