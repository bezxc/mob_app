import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { NestedHeader } from "@/entities/nested-header";
import { Colors } from "@/shared/styles/tokens";

export default function ColleaguesFiltersLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          contentStyle: styles.container,
          header: (props) => (
            <NestedHeader
              headerTitle="Фильтр коллег"
              withHorizontalPadding={false}
              {...props}
            />
          ),
        }}
      />
      <Stack.Screen
        name="colleaguesFiltersAutocomplete"
        options={{
          headerShown: false,
          presentation: "modal",
          header: (props) => (
            <NestedHeader
              headerTitle="Фильтр коллег"
              withHorizontalPadding={false}
              {...props}
            />
          ),
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
  },
});
