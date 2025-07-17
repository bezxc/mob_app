import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { NestedHeader } from "@/entities/nested-header";
import { Colors } from "@/shared/styles/tokens";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          contentStyle: styles.contentStyle,
          header: (props) => (
            <NestedHeader headerTitle="Анкета кандидата" {...props} />
          ),
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  contentStyle: {
    backgroundColor: Colors.white,
    paddingHorizontal: 18,
  },
});
