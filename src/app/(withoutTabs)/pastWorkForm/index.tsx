import { StyleSheet, View } from "react-native";
import { PastPlaceOfWorkForm } from "@/features/ResumeExperienceForms";

const PastWorkScreen = () => {
  return (
    <View style={styles.container}>
      <PastPlaceOfWorkForm />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PastWorkScreen;
