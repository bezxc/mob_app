import { UsersRound } from "lucide-react-native";
import React, { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "@/shared/styles/tokens";

interface FilterColleaguesCardProps {
  name: string;
  onPress: () => void;
}

export const FilterColleaguesCard: FC<FilterColleaguesCardProps> = ({
  name,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.title}>
        <View style={styles.icon}>
          <UsersRound size={24} strokeWidth={1} color={Colors.redAccent} />
        </View>
        <Text style={styles.positionTitle}>{name}</Text>
      </View>
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
    backgroundColor: Colors.grayLight,
    padding: 5,
    borderRadius: 10,
  },
  positionTitle: {
    flexShrink: 1,
  },
});
