import { router } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { clearFilters } from "@/entities/vacancies";
import { IssueIcon, SendIssueIcon } from "@/shared/assets/icons/";
import { Colors, Fonts } from "@/shared/styles/tokens";
import { VacanciesList } from "@/widgets/VacanciesList";

export default function VacanciesPage() {
  useEffect(() => {
    return () => {
      clearFilters();
    };
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.buttonsWrapper}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() =>
            router.push({
              pathname: "/(withoutTabs)/vacancies/resume",
              params: { step: "1" },
            })
          }
        >
          <View style={styles.buttonInner}>
            <SendIssueIcon style={styles.iconContainer} />
            <Text style={styles.title}>Моя анкета</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => router.push(`/(withoutTabs)/vacancies/responses`)}
        >
          <View style={styles.buttonInner}>
            <IssueIcon style={styles.iconContainer} />
            <Text style={styles.title}>Мои отклики</Text>
          </View>
        </TouchableOpacity>
      </View>

      <VacanciesList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  buttonsWrapper: {
    paddingHorizontal: 18,
    gap: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.gray50,
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 22,
  },
  iconContainer: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontFamily: Fonts.TBold,
    fontSize: 16,
  },
  buttonInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
});
