import { StyleSheet, View } from "react-native";
import { ColleaguesBirthdayList } from "@/widgets/ColleaguesBirthdayList";

const ColleaguesBirthdayScreen = () => {
  return (
    <View style={styles.container}>
      <ColleaguesBirthdayList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ColleaguesBirthdayScreen;
