import { useUnit } from "effector-react";
import { router } from "expo-router";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import { FiltersDatepicker } from "@/entities/filters-datepicker";
import {
  $issuesFilter,
  clearCategories,
  clearFilters,
  clearStatuses,
  setAppliedFilter,
  setIssuesFilters,
} from "@/entities/issues";
import { Colors, Fonts } from "@/shared/styles/tokens";
import { IRadioItem } from "@/shared/types/types";
import { Select } from "@/shared/ui";
import { GradientButton } from "@/shared/ui/GradientButton";
import { formatDateWithTime } from "@/shared/utils";

const IssuesFilters = () => {
  const { categoriesFilters, dateEnd, dateStart, statusesFilters } =
    useUnit($issuesFilter);
  const handleApplyFilters = () => {
    setAppliedFilter();
    router.back();
  };

  const handleClearCategories = () => {
    clearCategories();
    clearStatuses();
  };

  const handleClearFilters = () => {
    clearFilters();

    router.back();
  };

  const getValueForFilter = (filtersArr: IRadioItem[] | null) => {
    if (filtersArr) {
      return filtersArr
        .map((item) => {
          return item.label.length > 60
            ? item.label.slice(0, 60) + "..."
            : item.label;
        })
        .join(", ");
    }
    return "Выбрать";
  };

  return (
    <TouchableWithoutFeedback onPressOut={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <Select
          onPress={() =>
            router.push({
              pathname:
                "/(withoutTabs)/issuesFilters/issuesFiltersAutocomplete",
              params: {
                searchParam: "categories",
              },
            })
          }
          withClear={categoriesFilters ? categoriesFilters.length > 0 : false}
          clearFn={handleClearCategories}
          selectedColor={{ color: Colors.black }}
          label="По категории"
          value={getValueForFilter(categoriesFilters)}
        />
        <Select
          onPress={() => {
            if (categoriesFilters) {
              router.push({
                pathname:
                  "/(withoutTabs)/issuesFilters/issuesFiltersAutocomplete",

                params: {
                  searchParam: "status",
                },
              });
            }
          }}
          selectedColor={{ color: Colors.black }}
          label="По статусу"
          value={getValueForFilter(statusesFilters)}
          disabled={categoriesFilters ? categoriesFilters.length > 1 : true}
        />

        <FiltersDatepicker
          modalName="issuesFilterDateStart"
          label="От"
          onChange={(value) => {
            const date = value
              ? formatDateWithTime(value.toDateString(), "fullDate")
              : null;
            setIssuesFilters({ dateStart: date });
          }}
          value={dateStart}
          labelStyle={styles.datepickerLabel}
        />

        <FiltersDatepicker
          label="До"
          modalName="issuesFilterDateEnd"
          onChange={(value) => {
            const date = value
              ? formatDateWithTime(value.toDateString(), "fullDate")
              : null;
            setIssuesFilters({ dateEnd: date });
          }}
          value={dateEnd}
          labelStyle={styles.datepickerLabel}
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
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    gap: 12,
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
  datepickerLabel: {
    paddingHorizontal: 20,
    color: Colors.grayText,
  },
});

export default IssuesFilters;
