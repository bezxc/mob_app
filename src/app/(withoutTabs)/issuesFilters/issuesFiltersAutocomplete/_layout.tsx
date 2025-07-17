import { Stack } from "expo-router";
import { NestedModalHeader } from "@/entities/nested-header";

export default function IssuesFiltersAutocompleteLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          header: (props) => (
            <NestedModalHeader headerTitle="Выбрать вариант" {...props} />
          ),
        }}
      />
    </Stack>
  );
}
