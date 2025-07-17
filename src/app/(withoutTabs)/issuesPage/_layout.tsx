import { useUnit } from "effector-react";
import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { $issuesFilter } from "@/entities/issues";
import {
  NestedHeader,
  NestedHeaderWithFilters,
} from "@/entities/nested-header";
import { Colors } from "@/shared/styles/tokens";

export default function IssuesLayout() {
  const { applyFilter } = useUnit($issuesFilter);
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          contentStyle: styles.contentStyle,
          header: (props) => (
            <NestedHeader headerTitle="Центр обращений" {...props} />
          ),
        }}
      />
      <Stack.Screen
        name="issues"
        options={{
          contentStyle: styles.contentStyle,
          header: (props) => (
            <NestedHeaderWithFilters
              headerTitle="Мои обращения"
              filtersHref="/(withoutTabs)/issuesFilters"
              withBackButton={true}
              filtersCount={
                applyFilter
                  ? Object.values(applyFilter).filter(Boolean).length
                  : 0
              }
              {...props}
            />
          ),
        }}
      />
      <Stack.Screen
        name="sendIssue"
        options={{
          contentStyle: styles.contentStyle,
          header: (props) => (
            <NestedHeader headerTitle="Новое обращение" {...props} />
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
