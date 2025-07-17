import { ImageBackground } from "expo-image";
import { router } from "expo-router";
import { FC } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { Colors } from "@/shared/styles/tokens";
import { IPostItem } from "@/shared/types/types";
import { formatDateWithTime, useGetPresignUrl } from "@/shared/utils";

type HomePostCardProps = Pick<
  IPostItem,
  "title" | "image_key" | "id" | "created_at" | "thumbnail_key"
> & {
  style?: StyleProp<ViewStyle>;
};

export const HomePostCard: FC<HomePostCardProps> = ({
  title,
  image_key,
  thumbnail_key,
  id,
  created_at,
  style,
}) => {
  const { presignUrl } = useGetPresignUrl({
    bucket: "news",
    url: image_key || thumbnail_key,
  });

  console.log("presignUrl :>>", presignUrl);

  return (
    <TouchableOpacity
      onPress={() => router.push(`/(withoutTabs)/singlePost/${id}`)}
      style={[styles.container, style]}
    >
      <View style={styles.inner}>
        <ImageBackground style={styles.imageBg} source={presignUrl}>
          <View style={styles.newsContainer}>
            <Text style={styles.news}>
              {formatDateWithTime(created_at, "dayWithMonth")}
            </Text>
          </View>
        </ImageBackground>
      </View>
      <Text ellipsizeMode="tail" numberOfLines={2} style={styles.title}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: 91,
  },
  inner: {
    borderRadius: 16,
    overflow: "hidden",
  },
  imageBg: {
    width: 91,
    height: 91,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 15,
  },
  title: {
    color: Colors.black,
    fontSize: 10,
    textAlign: "center",
  },
  newsContainer: {
    alignItems: "center",
    backgroundColor: "#18181866",
    marginBottom: 12,
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 20,
  },
  news: {
    color: Colors.white,
    fontSize: 8,
  },
});
