import { StyleSheet, View } from "react-native";
import { EditCurrentPlaceOfWorkForm } from "@/features/ResumeExperienceForms";

const ColleaguesBirthdayScreen = () => {
  return (
    <View style={styles.container}>
      <EditCurrentPlaceOfWorkForm />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ColleaguesBirthdayScreen;
