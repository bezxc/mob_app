import { ImageBackground } from "expo-image";
import { router } from "expo-router";
import { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors, Fonts } from "@/shared/styles/tokens";
import { useGetPresignUrl } from "@/shared/utils";
import { formatDateWithTime } from "@/shared/utils/formatDate";

interface IPostListItem {
  image_key: string;
  created_at: string;
  title: string;
  id: number;
}

export const PostListItem: FC<IPostListItem> = ({
  image_key,
  created_at,
  title,
  id,
}) => {
  const { presignUrl, fileExists } = useGetPresignUrl({
    bucket: "news",
    url: image_key,
  });

  return (
    fileExists && (
      <TouchableOpacity
        onPress={() => router.push(`/(withoutTabs)/singlePost/${id}`)}
        style={styles.cardContainer}
      >
        <ImageBackground
          imageStyle={styles.cardBackground}
          style={styles.cardBackground}
          source={{ uri: presignUrl }}
          recyclingKey={id.toString()}
        >
          <View style={styles.dateWrapper}>
            <Text style={styles.dateText}>
              {formatDateWithTime(created_at, "dayWithMonth")}
            </Text>
          </View>
        </ImageBackground>

        <Text ellipsizeMode="tail" numberOfLines={2} style={styles.title}>
          {title}
        </Text>
      </TouchableOpacity>
    )
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    gap: 10,
    marginBottom: 20,
  },
  cardBackground: {
    height: 200,
    borderRadius: 30,
  },
  dateWrapper: {
    position: "absolute",
    borderRadius: 30,
    backgroundColor: "#00000033",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    left: 16,
    bottom: 18,
  },
  dateText: {
    color: Colors.white,
    fontFamily: Fonts.TRegular,
    fontSize: 10,
  },
  title: {
    fontFamily: Fonts.TBold,
    fontSize: 16,
    paddingHorizontal: 16,
  },
});
