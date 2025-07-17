import { useUnit } from "effector-react";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import {
  $colleaguesFilters,
  clearFilters,
  setAppliedFilter,
  setColleaguesFilters,
} from "@/entities/colleagues";
import { Colors, Fonts } from "@/shared/styles/tokens";
import { GradientButton, Select } from "@/shared/ui";

const ColleaguesFilters = () => {
  const { management, organization, position, department } =
    useUnit($colleaguesFilters);

  const hangleClearFilter = (
    arg: "management" | "organization" | "position" | "department",
  ) => {
    setColleaguesFilters({
      [arg]: null,
    });
  };
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
              "/(withoutTabs)/colleaguesFilters/colleaguesFiltersAutocomplete",
            params: {
              searchParam: "position",
            },
          })
        }
        withClear={Boolean(position)}
        clearFn={() => hangleClearFilter("position")}
        selectedColor={{ color: Colors.black }}
        label="По должности"
        value={position?.name || "Выбрать"}
      />
      <Select
        onPress={() =>
          router.push({
            pathname:
              "/(withoutTabs)/colleaguesFilters/colleaguesFiltersAutocomplete",

            params: {
              searchParam: "management",
            },
          })
        }
        withClear={Boolean(management)}
        clearFn={() => hangleClearFilter("management")}
        selectedColor={{ color: Colors.black }}
        label="По управленческим подразделениям"
        value={management?.name || "Выбрать"}
      />
      <Select
        onPress={() =>
          router.push({
            pathname:
              "/(withoutTabs)/colleaguesFilters/colleaguesFiltersAutocomplete",

            params: {
              searchParam: "department",
            },
          })
        }
        withClear={Boolean(department)}
        clearFn={() => hangleClearFilter("department")}
        selectedColor={{ color: Colors.black }}
        label="По коробке"
        value={department?.name || "Выбрать"}
      />
      <Select
        onPress={() =>
          router.push({
            pathname:
              "/(withoutTabs)/colleaguesFilters/colleaguesFiltersAutocomplete",

            params: {
              searchParam: "organization",
            },
          })
        }
        withClear={Boolean(organization)}
        clearFn={() => hangleClearFilter("organization")}
        selectedColor={{ color: Colors.black }}
        label="По юридическим лицам"
        value={organization?.name || "Выбрать"}
      />

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
    gap: 12,
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

export default ColleaguesFilters;
