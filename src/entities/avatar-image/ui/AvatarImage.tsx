import { Image, ImageStyle } from "expo-image";
import { FC } from "react";
import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import { PhotoIcon } from "@/shared/assets/icons";
import { Colors, Fonts } from "@/shared/styles/tokens";
import { useGetPresignUrl } from "@/shared/utils";

interface IAvatarImageProps {
  kan_uid: number | string;
  full_name?: string;
  imageStyle?: ImageStyle;
  skeletonTextStyle?: TextStyle;
}

export const AvatarImage: FC<IAvatarImageProps> = ({
  full_name,
  kan_uid,
  imageStyle,
  skeletonTextStyle,
}) => {
  const { fileExists, presignUrl } = useGetPresignUrl({
    bucket: "avatars",
    url: `${kan_uid}.jpeg`,
    queryKey: ["avatar", kan_uid],
  });

  console.log("fileExists :>>", fileExists);

  return (
    <>
      {fileExists ? (
        <Image
          style={[styles.image, imageStyle]}
          source={{ uri: presignUrl }}
          contentFit="contain"
        />
      ) : full_name ? (
        <View style={[styles.image, styles.stub, imageStyle as ViewStyle]}>
          <Text
            style={[
              styles.initials,
              skeletonTextStyle,
              { color: Colors.white },
            ]}
          >
            {full_name.split(" ")[0][0]} {full_name.split(" ")[1][0]}
          </Text>
        </View>
      ) : (
        <View style={styles.photoIcon}>
          <PhotoIcon stroke={Colors.white} width={20} height={20} />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  stub: {
    backgroundColor: Colors.redAccent,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    borderRadius: 20,
    width: 48,
    height: 48,
  },
  initials: {
    fontSize: 18,
    fontFamily: Fonts.TBold,
  },
  photoIcon: {
    backgroundColor: Colors.redAccent,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
});
