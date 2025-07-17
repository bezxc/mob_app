import { useQuery } from "@tanstack/react-query";
import { useUnit } from "effector-react";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import {
  $issuesFilter,
  clearStatuses,
  getStatusesByCategoryIdList,
  setIssuesFilters,
} from "@/entities/issues";
import { IRadioItem } from "@/shared/types/types";
import { CheckboxGroup, GradientButton } from "@/shared/ui";

export const IssuesStatusFilterList = () => {
  const { categoriesFilters, statusesFilters } = useUnit($issuesFilter);
  const [prepareOptions, setPrepareOptions] = useState<IRadioItem[]>([]);
  const setIssuesFilter = useUnit(setIssuesFilters);
  const resetStatusesFilter = useUnit(clearStatuses);
  const {
    data: statuses,
    isLoading,
    refetch: refetchStatuses,
  } = useQuery({
    queryKey: ["issues-statuses"],
    queryFn: () =>
      getStatusesByCategoryIdList({
        categoryId: categoriesFilters![0].value,
      }),
    enabled: Boolean(categoriesFilters),
  });

  const onSubmit = () => {
    setIssuesFilter({ statusesFilters: prepareOptions });
    router.back();
  };

  const onCheckBoxValueChange = (options: IRadioItem[]) => {
    setPrepareOptions(options);
  };

  const reset = () => {
    resetStatusesFilter();
    router.back();
  };
  if (isLoading || !statuses) return <ActivityIndicator />;

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.statusesContainer}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetchStatuses} />
        }
        showsVerticalScrollIndicator={false}
      >
        <CheckboxGroup
          onValueChange={(options) => onCheckBoxValueChange(options)}
          activeItems={statusesFilters || []}
          options={statuses.items.map((item) => ({
            label: item.title,
            value: String(item.id),
          }))}
          withLabelBorder
          style={styles.checkboxGroup}
        />
      </ScrollView>
      <View style={styles.buttonGroup}>
        <GradientButton
          gradientStyles={{ paddingVertical: 16 }}
          onPress={onSubmit}
          disabled={prepareOptions.length === 0}
        >
          Сохранить
        </GradientButton>
        <GradientButton
          onPress={reset}
          gradientStyles={{ paddingVertical: 12 }}
          colors={["#1D77ED", "#56A0FF", "#2572D6"]}
        >
          Сбросить фильтр
        </GradientButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 25,
    paddingBottom: Platform.OS === "ios" ? 64 : 32,
  },
  statusesContainer: {
    paddingHorizontal: 18,
  },
  checkboxGroup: {
    gap: 15,
  },
  buttonGroup: {
    gap: 10,
    paddingHorizontal: 18,
  },
});
