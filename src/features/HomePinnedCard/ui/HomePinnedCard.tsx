import { ImageBackground } from "expo-image";
import { router } from "expo-router";
import { FC } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { PostListItemType } from "@/entities/posts";
import { PinWithBgIcon } from "@/shared/assets/icons";
import { useGetPresignUrl } from "@/shared/utils";

export const HomePinnedCard: FC<PostListItemType> = ({
  id,
  banner_key,
  image_key,
}) => {
  const { presignUrl } = useGetPresignUrl({
    bucket: "news",
    url: banner_key || image_key,
  });

  return (
    <Pressable
      style={styles.carouselCardContainer}
      onPress={() => router.push(`/(withoutTabs)/singlePost/${id}`)}
    >
      <ImageBackground
        style={styles.carouselCard}
        imageStyle={styles.carouselCardImage}
        source={{
          uri: presignUrl,
        }}
      >
        <View style={styles.carouselPinnedIcon}>
          <PinWithBgIcon width={28} height={28} />
        </View>
      </ImageBackground>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  carouselCardContainer: {
    width: "100%",
    height: "100%",
  },
  carouselCard: {
    flex: 1,
  },
  carouselCardImage: {
    borderRadius: 15,
    resizeMode: "cover",
  },
  carouselPinnedIcon: {
    position: "absolute",
    right: 8,
    top: 8,
  },
});
