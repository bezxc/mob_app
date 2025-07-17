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
  clearCategories,
  clearStatuses,
  getCategoriesList,
  setIssuesFilters,
} from "@/entities/issues";
import { SearchInput } from "@/entities/search-input";
import { IRadioItem } from "@/shared/types/types";
import { CheckboxGroup, GradientButton } from "@/shared/ui";

export const IssuesCategoriesFilterList = () => {
  const { categoriesFilters } = useUnit($issuesFilter);
  const [prepareOptions, setPrepareOptions] = useState<IRadioItem[]>([]);
  const setIssuesFilter = useUnit(setIssuesFilters);
  const resetCategoriesFilter = useUnit(clearCategories);
  const [searchValue, setSearchValue] = useState<string>("");
  const {
    data: categories,
    isLoading,
    refetch: refetchCategories,
  } = useQuery({
    queryKey: ["issues-categories"],
    queryFn: () => getCategoriesList({ isAcitve: true }),
  });

  const onSubmit = () => {
    setIssuesFilter({ categoriesFilters: prepareOptions });
    router.back();
  };

  const onCheckBoxValueChange = (options: IRadioItem[]) => {
    setPrepareOptions(options);
    if (options.length > 1) {
      clearStatuses();
    }
  };

  const reset = () => {
    resetCategoriesFilter();
    clearStatuses();
    router.back();
  };
  if (isLoading || !categories) return <ActivityIndicator />;

  const filteredCategories = categories.filter((item) =>
    item.title.toLowerCase().includes(searchValue.toLowerCase()),
  );
  return (
    <View style={styles.container}>
      <SearchInput placeholder="Поиск" setSearchValue={setSearchValue} />

      <ScrollView
        style={styles.categoriesContainer}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refetchCategories}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        <CheckboxGroup
          onValueChange={(options) => onCheckBoxValueChange(options)}
          activeItems={categoriesFilters || []}
          options={filteredCategories.map((item) => ({
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
  categoriesContainer: {
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
