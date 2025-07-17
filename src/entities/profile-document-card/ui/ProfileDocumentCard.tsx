import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import {
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { getOrganizationInfo } from "@/entities/profile";
import { DownloadIcon } from "@/shared/assets/icons";
import { Colors, Fonts } from "@/shared/styles/tokens";
import { useGetPresignUrl } from "@/shared/utils";

interface IDocumentCard {
  url: string;
  title: string;
  organizationGuid: string;
}

export const ProfileDocumentCard: FC<IDocumentCard> = ({
  title,
  organizationGuid,
  url,
}) => {
  const { presignUrl } = useGetPresignUrl({
    bucket: "payslips",
    url,
    pdf: true,
  });

  const handlePress = async () => {
    const supported = await Linking.canOpenURL(presignUrl);

    if (supported) {
      await Linking.openURL(presignUrl);
    } else {
      console.log(`Не удалось открыть ${presignUrl}`);
    }
  };

  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ["organization_name", { id: organizationGuid }],
    queryFn: () => getOrganizationInfo({ id: organizationGuid }),
  });

  return (
    <TouchableHighlight
      onPress={handlePress}
      underlayColor={Colors.white}
      activeOpacity={Platform.OS === "ios" ? 0.5 : 0.9}
    >
      <View style={styles.container}>
        <View>
          <Text numberOfLines={1} style={styles.title}>
            {title}
          </Text>
          <Text numberOfLines={1} style={styles.description}>
            {data?.name}
          </Text>
        </View>
        <View style={styles.downloadIconWrapper}>
          <DownloadIcon stroke="black" />
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 5,
    borderColor: Colors.grayStroke,
    borderWidth: 1,
    borderRadius: 20,
    minHeight: 64,
    justifyContent: "space-between",
  },
  noteIconWrapper: {
    width: 34,
    maxWidth: 34,
    height: 54,
    maxHeight: 54,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 8,
    backgroundColor: Colors.white,
    borderRadius: 15,
  },
  textWrapper: {
    gap: 5,
  },
  title: {
    fontFamily: Fonts.TBold,
    fontSize: 12,
  },
  description: {
    fontFamily: Fonts.TRegular,
    color: Colors.grayText,
    fontSize: 10,
  },
  downloadIconWrapper: {
    width: 38,
    height: 38,
    backgroundColor: Colors.grayLight,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexBasis: "10%",
  },
});
