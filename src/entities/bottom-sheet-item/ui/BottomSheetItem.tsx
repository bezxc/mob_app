import { LinearGradient } from "expo-linear-gradient";
import { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ChevronRight } from "@/shared/assets/icons";
import { Fonts } from "@/shared/styles/tokens";
import { IHomeScreenPagesItem } from "@/shared/types/types";

interface IBottomSheetItemProps extends IHomeScreenPagesItem {
  handlePress: (url: string) => void;
}

export const BottomSheetItem: FC<IBottomSheetItemProps> = ({
  title,
  url,
  start,
  end,
  linearColors,
  icon,
  handlePress,
}) => {
  return (
    <TouchableOpacity onPress={() => handlePress(url)} style={styles.container}>
      <View style={styles.leftSideWrapper}>
        <LinearGradient
          end={start}
          colors={linearColors as [string, string, ...string[]]}
          start={end}
          style={styles.linearGradient}
        >
          {icon}
        </LinearGradient>
        <Text style={styles.title}>{title}</Text>
      </View>
      <ChevronRight />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftSideWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 17,
  },
  linearGradient: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: Fonts.SFSemiBold,
    fontSize: 16,
  },
});
