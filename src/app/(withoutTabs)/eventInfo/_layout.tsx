import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { NestedCenteredHeader } from "@/entities/nested-header";
import { Colors } from "@/shared/styles/tokens";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="[event]"
        options={{
          contentStyle: styles.contentContainer,
          header: (props) => (
            <NestedCenteredHeader headerTitle="События" {...props} />
          ),
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: Colors.white,
    paddingHorizontal: 18,
  },
});
