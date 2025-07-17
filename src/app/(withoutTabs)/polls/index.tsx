import { StyleSheet, View } from "react-native";
import { PollsList } from "@/widgets/PollsList";

export default function PollsPage() {
  return (
    <View style={styles.container}>
      <PollsList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
