import { Image } from "expo-image";
import { FC } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Colors, Fonts } from "@/shared/styles/tokens";
import { useGetPresignUrl } from "@/shared/utils";

interface IPrivilegesPartnerHeaderProps {
  imageKey: string;
  description: string | null;
  title: string;
  id: number;
}

export const PrivilegesPartnerHeader: FC<IPrivilegesPartnerHeaderProps> = ({
  imageKey,
  description,
  title,
  id,
}) => {
  const { fileExists, presignUrl } = useGetPresignUrl({
    bucket: "privileges",
    url: imageKey,
    queryKey: ["privileges-partner", id],
  });
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {fileExists ? (
          <Image
            style={[styles.image]}
            source={{ uri: presignUrl }}
            contentFit="contain"
          />
        ) : (
          <ActivityIndicator />
        )}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        {description && <Text style={styles.description}>{description}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 22,
    flexDirection: "row",
    gap: 20,
  },
  imageContainer: {
    width: 70,
    height: 70,
  },
  image: {
    flexGrow: 1,
    width: "100%",
    height: "100%",
  },
  textContainer: {
    gap: 4,
  },
  title: {
    fontFamily: Fonts.SFSemiBold,
    fontSize: 16,
    textTransform: "uppercase",
  },
  description: {
    fontFamily: Fonts.SFSemiBold,
    color: Colors.gray70,
  },
});
