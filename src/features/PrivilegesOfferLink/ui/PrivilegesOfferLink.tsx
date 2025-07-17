import { FC } from "react";
import { Linking, StyleSheet, Text, TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";
import { getDocumentName } from "@/entities/privileges";
import { Colors } from "@/shared/styles/tokens";
import { useGetPresignUrl } from "@/shared/utils";

interface IPrivilegesOfferLinkProps {
  file: {
    file_key: string;
    partner_offer_id: number;
  };
}

export const PrivilegesOfferLink: FC<IPrivilegesOfferLinkProps> = ({
  file,
}) => {
  const { fileExists, presignUrl } = useGetPresignUrl({
    bucket: "privileges",
    url: file.file_key,
  });
  const handlePressPdf = async () => {
    const supported = await Linking.canOpenURL(presignUrl);

    console.log(presignUrl);

    if (supported) {
      await Linking.openURL(presignUrl);
    } else {
      Toast.show({
        type: "error",
        text1: "Не удалось открыть документ",
      });
    }
  };

  if (!fileExists) {
    return null;
  }

  return (
    <TouchableOpacity onPress={handlePressPdf} style={styles.fileLink}>
      <Text ellipsizeMode="tail" numberOfLines={1} style={styles.fileText}>
        {getDocumentName({ file_key: file.file_key })}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fileLink: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  fileText: {
    flexShrink: 1,
    color: Colors.blue,
  },
});
