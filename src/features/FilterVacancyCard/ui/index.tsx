import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MarkerIcon } from "@/shared/assets/icons";
import { Colors } from "@/shared/styles/tokens";

interface FilterVacancyCardProps {
  position: string;
}

export const FilterVacancyCard = ({ position }: FilterVacancyCardProps) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.title}>
        <View style={styles.icon}>
          <MarkerIcon />
        </View>
        <Text style={styles.positionTitle}>{position}</Text>
      </View>
      <View style={styles.separator} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 15,
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  icon: {
    backgroundColor: Colors.grayStroke,
    padding: 5,
    borderRadius: 10,
  },
  positionTitle: {
    flexShrink: 1,
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: Colors.grayLight,
  },
});
