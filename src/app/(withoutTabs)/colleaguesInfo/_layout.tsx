import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { NestedHeader } from "@/entities/nested-header";
import { Colors } from "@/shared/styles/tokens";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="[colleagueInfo]"
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
