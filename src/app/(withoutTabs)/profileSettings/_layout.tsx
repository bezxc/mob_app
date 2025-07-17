import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { NestedHeader } from "@/entities/nested-header";
import { Colors } from "@/shared/styles/tokens";

export default function ProfileSettingsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          contentStyle: styles.contentStyle,
          header: (props) => (
            <NestedHeader headerTitle="Мой профиль" {...props} />
          ),
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  contentStyle: {
    backgroundColor: Colors.white,
  },
});
