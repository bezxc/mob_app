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
          contentStyle: styles.contentContainer,
          header: (props) => (
            <NestedHeader
              headerTitle="Мои отклики"
              backWithDesc
              withInsets={false}
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
