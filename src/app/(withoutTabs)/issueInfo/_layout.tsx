import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { NestedHeader } from "@/entities/nested-header";
import { Colors } from "@/shared/styles/tokens";

export default function IssueInfoLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[issueInfo]"
        options={{
          contentStyle: styles.contentContainer,
          header: (props) => (
            <NestedHeader
              headerTitle="Назад в список"
              backWithDesc
              {...props}
            />
          ),
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: Colors.white,
  },
});
