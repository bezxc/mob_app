import { useUnit } from "effector-react";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SheetManager } from "react-native-actions-sheet";
import { UncontrolledSelect } from "@/entities/controlled-select";
import {
  $edoDocsFilters,
  clearFilters,
  setAppliedFilter,
  setEdoDocsFilters,
} from "@/entities/edo";
import { FiltersDatepicker } from "@/entities/filters-datepicker";
import { Colors, Fonts } from "@/shared/styles/tokens";
import { Select } from "@/shared/ui";
import { GradientButton } from "@/shared/ui/GradientButton";
import { formatDateWithTime } from "@/shared/utils";

const EdoDocsFilters = () => {
  const { publicationDateGte, publicationDateLte, regNumber, wasRead } =
    useUnit($edoDocsFilters);
  const handleApplyFilters = () => {
    setAppliedFilter();
    router.back();
  };

  const handleClearFilters = () => {
    clearFilters();
    router.back();
  };

  const regNumberSelectValues = regNumber.map((item) => item.value).join(", ");

  const wasReadSelectValues = [
    {
      label: "Ознакомлен",
      value: "true",
    },
    {
      label: "Не ознакомлен",
      value: "false",
    },
  ];

  return (
    <View style={styles.container}>
      <Select
        value={regNumberSelectValues}
        selectedColor={{ color: Colors.black }}
        label="По рег. номеру"
        onPress={() => SheetManager.show("reg-numbers")}
      />
      <UncontrolledSelect
        onChange={(value) =>
          setEdoDocsFilters({ wasRead: value.value === "true" })
        }
        value={wasRead ? "Ознакомлен" : "Не ознакомлен"}
        options={wasReadSelectValues}
        selectedColor={{ color: Colors.black }}
        label="Выберите статус"
        onPress={() => {}}
      />
      <FiltersDatepicker
        modalName="publicationDateGte"
        label="От"
        onChange={(value) => {
          const date = value
            ? formatDateWithTime(value.toDateString(), "fullDate")
            : null;
          setEdoDocsFilters({ publicationDateGte: date });
        }}
        value={publicationDateGte}
        labelStyle={{ paddingHorizontal: 20, color: Colors.grayText }}
      />

      <FiltersDatepicker
        label="До"
        modalName="publicationDateLte"
        onChange={(value) => {
          const date = value
            ? formatDateWithTime(value.toDateString(), "fullDate")
            : null;
          setEdoDocsFilters({ publicationDateLte: date });
        }}
        value={publicationDateLte}
        labelStyle={{ paddingHorizontal: 20, color: Colors.grayText }}
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

export default EdoDocsFilters;
