import { router } from "expo-router";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { Fonts } from "@/shared/styles/tokens";

interface Card {
  id: string;
  title: string;
  description: string;
  image: string | undefined;
}

export const MagazineCard = ({ id, image }: Card) => {
  return (
    <TouchableOpacity
      onPress={() => router.push(`/(withoutTabs)/magazines/${id}`)}
      style={{ width: "50%" }}
    >
      <ImageBackground style={styles.card} src={image} />
      <Text
        style={{
          fontFamily: Fonts.TBold,
          fontSize: 16,
        }}
      >
        Лето/Осень 2021
      </Text>
      <Text
        style={{
          fontSize: 14,
          color: "#c2c2c2",
        }}
      >
        18 июля 2021
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 240,
    borderRadius: 20,
    overflow: "hidden",
  },
});
