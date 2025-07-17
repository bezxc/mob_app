import { Href, router } from "expo-router";
import { FC } from "react";
import { Linking, StyleSheet, Text, TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";
import { NoteIcon } from "@/shared/assets/icons";
import { Colors, Fonts } from "@/shared/styles/tokens";
import { useGetPresignUrl } from "@/shared/utils";

interface IDocumentCard {
  url: string;
  title: string;
  isLocalLink?: boolean;
}

export const DocumentCard: FC<IDocumentCard> = ({
  title,
  url,
  isLocalLink = false,
}) => {
  const { presignUrl } = useGetPresignUrl({
    bucket: "news",
    url,
  });

  const handlePressPdf = async () => {
    const supported = await Linking.canOpenURL(presignUrl);

    if (supported) {
      await Linking.openURL(presignUrl);
    } else {
      Toast.show({
        type: "error",
        text1: "Не удалось открыть документ",
      });
    }
  };

  const handlePressLocalLink = async () => {
    router.push(url as Href);
  };

  return (
    <TouchableOpacity
      onPress={isLocalLink ? handlePressLocalLink : handlePressPdf}
      style={styles.card}
    >
      <NoteIcon stroke={Colors.black} />
      <Text ellipsizeMode="tail" numberOfLines={1} style={styles.cardText}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.grayLight,
    padding: 12,
    borderRadius: 15,
    gap: 16,
  },
  cardText: {
    fontSize: 14,
    fontFamily: Fonts.TRegular,
    lineHeight: 16,
    flexShrink: 1,
  },
});
