import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { toggleBottomSheet } from "@/entities/bottom-sheet";

export const HomeServicesButton = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => toggleBottomSheet("homeBottomSheet")}
        style={styles.buttonContainer}
      >
        <Text>Показать все сервисы</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  buttonContainer: {
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#f4f4f4",
  },
});
