import { useUnit } from "effector-react";
import { Stack } from "expo-router";
import { $colleaguesFilters } from "@/entities/colleagues";
import { NestedHeaderWithFilters } from "@/entities/nested-header";

export default function Layout() {
  const { applyFilter } = useUnit($colleaguesFilters);

  return (
    <Stack>
      <Stack.Screen
        options={{
          header: (props) => (
            <NestedHeaderWithFilters
              headerTitle="Коллеги"
              filtersHref="/(withoutTabs)/colleaguesFilters"
              withBackButton={false}
              filtersCount={applyFilter ? applyFilter.length : 0}
              {...props}
            />
          ),
          contentStyle: { backgroundColor: "#fff" },
        }}
        name="index"
      />
    </Stack>
  );
}
