import { useUnit } from "effector-react";
import { StyleSheet, Text, View } from "react-native";
import { $vacanciesFilter, setVacanciesFilters } from "@/entities/vacancies";
import { Colors, Fonts } from "@/shared/styles/tokens";
import { Input } from "@/shared/ui";

export const VacanciesWageFilter = () => {
  const { avg_wage_to__lte, avg_wage_from__gte } = useUnit($vacanciesFilter);

  return (
    <View>
      <Text style={styles.title}>По заработной плате</Text>

      <View style={styles.inputsWrapper}>
        <Input
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(text) =>
            setVacanciesFilters({
              avg_wage_from__gte: Number(text),
            })
          }
          style={styles.inputStyle}
          containerStyle={styles.inputContainer}
          placeholder="От"
          value={avg_wage_from__gte ? String(avg_wage_from__gte) : ""}
        />
        <Input
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(text) =>
            setVacanciesFilters({
              avg_wage_to__lte: Number(text),
            })
          }
          style={styles.inputStyle}
          containerStyle={styles.inputContainer}
          placeholder="До"
          value={avg_wage_to__lte ? String(avg_wage_to__lte) : ""}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    fontSize: 14,
  },
  inputsWrapper: {
    flexDirection: "row",
    flexGrow: 1,
    gap: 20,
    marginTop: 5,
  },
  inputContainer: {
    flex: 1,

    paddingLeft: 20,
    paddingVertical: 12,
  },
  inputStyle: {
    color: Colors.black,
    fontFamily: Fonts.TRegular,
  },
});
