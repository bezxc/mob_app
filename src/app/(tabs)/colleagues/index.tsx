import { StyleSheet, View } from "react-native";
import { ColleaguesList } from "@/widgets/ColleaguesList";

const Colleagues = () => {
  return (
    <View style={styles.container}>
      <ColleaguesList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Colleagues;
