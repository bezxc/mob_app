import { useUnit } from "effector-react";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import {
  $vacanciesFilter,
  clearFilters,
  setAppliedFilter,
} from "@/entities/vacancies";
import { VacanciesWageFilter } from "@/entities/vacancies-wage-filter";
import { Colors, Fonts } from "@/shared/styles/tokens";
import { GradientButton, Select } from "@/shared/ui";

const VacancyFilters = () => {
  const { position, department, management } = useUnit($vacanciesFilter);
  const handleApplyFilters = () => {
    setAppliedFilter();
    router.back();
  };
  const handleClearFilters = () => {
    clearFilters();
    router.back();
  };

  return (
    <View style={styles.container}>
      <Select
        onPress={() =>
          router.push({
            pathname:
              "/(withoutTabs)/vacancies/vacancyFilters/vacancyFiltersAutocomplete",
            params: {
              searchParam: "position",
            },
          })
        }
        selectedColor={{ color: Colors.black, fontFamily: Fonts.EText }}
        label="По должности"
        value={position?.positionName || "Выбрать"}
      />
      <Select
        onPress={() =>
          router.push({
            pathname:
              "/(withoutTabs)/vacancies/vacancyFilters/vacancyFiltersAutocomplete",
            params: {
              searchParam: "management",
            },
          })
        }
        selectedColor={{ color: Colors.black, fontFamily: Fonts.EText }}
        label="По подразделению"
        value={management?.management_name || "Выбрать"}
      />
      <Select
        onPress={() =>
          router.push({
            pathname:
              "/(withoutTabs)/vacancies/vacancyFilters/vacancyFiltersAutocomplete",
            params: {
              searchParam: "department",
            },
          })
        }
        selectedColor={{ color: Colors.black, fontFamily: Fonts.EText }}
        label="По коробке"
        value={department?.department_name || "Выбрать"}
      />

      <VacanciesWageFilter />

      <GradientButton onPress={handleApplyFilters} style={styles.button}>
        <Text>Применить фильтр</Text>
      </GradientButton>
      <GradientButton
        onPress={handleClearFilters}
        colors={["#1D77ED", "#56A0FF", "#2572D6"]}
      >
        <Text style={styles.resetButtonText}>Сбросить фильтр</Text>
      </GradientButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    gap: 20,
    paddingHorizontal: 18,
  },
  button: {
    marginTop: 20,
  },
  resetButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontFamily: Fonts.TBold,
  },
});

export default VacancyFilters;
