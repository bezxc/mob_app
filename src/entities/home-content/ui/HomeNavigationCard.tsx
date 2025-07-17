import { router } from "expo-router";
import { FC } from "react";
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { Colors, Fonts } from "@/shared/styles/tokens";
import { IHomeNavigationCard } from "../model/homeNavigationCards";

interface INavigationCardProps extends IHomeNavigationCard {
  cardTupleIndex: number;
  index: number;
}

export const HomeNavigationCard: FC<INavigationCardProps> = ({
  icon,
  title,
  backgroundColor,
  url,
  linking,
}) => {
  const handlePress = async () => {
    const supported = await Linking.canOpenURL(url as string);

    if (supported) {
      await Linking.openURL(url as string);
    } else {
      Toast.show({
        type: "error",
        text1: "Не удалось открыть страницу",
      });
    }
  };

  return (
    <TouchableOpacity
      onPress={() => (linking ? handlePress() : router.push(url))}
      style={[styles.card, { backgroundColor }]}
    >
      <View
        style={[
          styles.iconContainer,
          title === "Журнал" && { right: -12, bottom: -4 },
        ]}
      >
        {icon}
      </View>
      <Text style={styles.cardText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 160,
    height: 68,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 12,
    overflow: "hidden",
    flex: 1,
  },
  cardText: {
    fontFamily: Fonts.TBold,
    fontSize: 12,
    color: Colors.black,
  },
  iconContainer: {
    position: "absolute",
    width: 64,
    height: 64,
    bottom: 0,
    right: 0,
  },
});
