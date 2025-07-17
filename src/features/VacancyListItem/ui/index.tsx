import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { VacancyIcon } from "@/shared/assets/icons";

interface VacancyListItemProps {
  title: string;
  description: string;
  salary: string;
  id: string;
}

export const VacancyListItem = ({
  title,
  salary,
  id,
}: VacancyListItemProps) => {
  return (
    <Pressable
      style={styles.container}
      onPress={() => router.push(`/(withoutTabs)/vacancies/${id}`)}
    >
      <View style={styles.iconContainer}>
        <VacancyIcon />
      </View>
      <View style={styles.vacancyDescription}>
        <Text style={styles.title}>{title}</Text>
        <Text>
          {salary} • <Text>{salary}</Text>
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
  },
  title: {
    fontSize: 13,
    fontWeight: "700",
    color: "#000000",
    flexWrap: "wrap",
  },
  vacancyDescription: {
    flexShrink: 1,
    gap: 5,
  },
  iconContainer: {
    width: 58,
    height: 58,
    borderRadius: 16,
    borderColor: "#ebebeb",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
