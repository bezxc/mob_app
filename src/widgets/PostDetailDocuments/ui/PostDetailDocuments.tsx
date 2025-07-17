import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { DocumentCard } from "@/entities/document-card";
import { PostDocsType } from "@/entities/posts";
import { Colors, Fonts } from "@/shared/styles/tokens";

export const PostDetailDocuments: FC<{ documents: PostDocsType[] }> = ({
  documents,
}) => {
  return (
    <View style={styles.filesContainer}>
      <Text style={styles.filesTitle}>Файлы</Text>
      {documents.map((item) => (
        <DocumentCard
          key={item.doc_key}
          title={String(item.doc_key.split("/").pop())}
          url={item.doc_key}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  filesContainer: {
    gap: 11,
    paddingHorizontal: 18,
  },
  filesTitle: {
    fontFamily: Fonts.TRegular,
    fontSize: 16,
    color: Colors.redAccent,
  },
  filesWrapper: {
    gap: 6,
  },
});
