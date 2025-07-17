import { useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Colors } from "@/shared/styles/tokens";
import { VacanciesDepartmentFilterList } from "@/widgets/VacanciesDepartmentFilterList";
import { VacanciesManagementsFilterList } from "@/widgets/VacanciesManagementsFilterList";
import { VacanciesPositionFilterList } from "@/widgets/VacanciesPositionFilterList";

const VacanciesFiltersList = () => {
  const { searchParam } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      {searchParam === "position" && <VacanciesPositionFilterList />}
      {searchParam === "management" && <VacanciesManagementsFilterList />}
      {searchParam === "department" && <VacanciesDepartmentFilterList />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
export default VacanciesFiltersList;
