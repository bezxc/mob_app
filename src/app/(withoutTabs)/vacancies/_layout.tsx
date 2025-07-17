import { useUnit } from "effector-react";
import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  NestedHeaderWithFilters,
  NestedHeaderWithShare,
} from "@/entities/nested-header";
import { $vacanciesFilter } from "@/entities/vacancies";
import { Colors, Fonts } from "@/shared/styles/tokens";

interface VacancyParams {
  vacancy: string;
  title: string;
}

export default function VacanciesLayout() {
  const { applyFilter } = useUnit($vacanciesFilter);

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            contentStyle: styles.contentContainer,
            header: (props) => (
              <NestedHeaderWithFilters
                headerTitle="Вакансии"
                filtersHref="/(withoutTabs)/vacancies/vacancyFilters"
                withInsets={false}
                filtersCount={
                  applyFilter ? Object.values(applyFilter).length : 0
                }
                {...props}
              />
            ),
          }}
        />
        <Stack.Screen
          name="[vacancy]"
          options={{
            contentStyle: styles.contentContainer,
            header: (props) => {
              const { title } = props.route.params as VacancyParams;
              return (
                <NestedHeaderWithShare
                  {...props}
                  boldHeader
                  headerTitle={title}
                  withInsets={false}
                />
              );
            },
          }}
        />
        <Stack.Screen
          name="vacancyFilters"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="responses"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="resume"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    backgroundColor: Colors.white,
  },
  headerContentWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 21,
    paddingBottom: 29,
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
  },
  headerTitle: {
    fontFamily: Fonts.TRegular,
    fontSize: 22,
    fontWeight: "700",
    justifyContent: "center",
  },
});
