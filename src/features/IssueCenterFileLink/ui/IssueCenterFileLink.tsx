import { FC } from "react";
import { Linking, StyleSheet, Text, TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";
import { NoteIcon } from "@/shared/assets/icons";
import { Colors } from "@/shared/styles/tokens";
import { getIssueFileName, useGetPresignUrl } from "@/shared/utils";

interface IIssueCenterFileLinkProps {
  file: { doc_key: string; created_at: string };
}
export const IssueCenterFileLink: FC<IIssueCenterFileLinkProps> = ({
  file,
}) => {
  const { fileExists, presignUrl } = useGetPresignUrl({
    bucket: "issue_center",
    url: file.doc_key,
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
      <NoteIcon stroke={Colors.black} />

      <Text
        ellipsizeMode="tail"
        numberOfLines={1}
        style={{ flexShrink: 1, color: Colors.blue }}
      >
        {getIssueFileName(presignUrl)}
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
});
