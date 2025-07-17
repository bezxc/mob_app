import { StyleSheet, View } from "react-native";
import { PollsPassed } from "@/widgets/PollsPassed";

const PassedPoll = () => {
  return (
    <View style={styles.container}>
      <PollsPassed />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    flex: 1,
  },
});

export default PassedPoll;
