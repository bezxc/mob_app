import { StyleSheet, View } from "react-native";
import { IssuesHome } from "@/widgets/IssuesHome";

export default function IssuesPage() {
  return (
    <View style={styles.container}>
      <IssuesHome />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 18,
  },
});
