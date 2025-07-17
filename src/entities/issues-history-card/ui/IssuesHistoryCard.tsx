import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TIssueHistoryItem } from "@/entities/issues";
import { Colors, Fonts } from "@/shared/styles/tokens";
import { formatDateWithTime } from "@/shared/utils";

interface IIssuesHistoryCardProps {
  item: TIssueHistoryItem;
}
export const IssuesHistoryCard: FC<IIssuesHistoryCardProps> = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerNumber}>{item.status.title}</Text>
        <Text style={styles.headerDate}>
          {formatDateWithTime(item.created_at, "issuesCard")}
        </Text>
      </View>
      <Text style={styles.text}>{item.answer}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: Colors.gray50,
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 15,
    gap: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerNumber: {
    fontSize: 14,
    fontFamily: Fonts.SFSemiBold,
    color: Colors.redAccent,
  },
  headerDate: {
    fontSize: 14,
    fontFamily: Fonts.TRegular,
  },
  text: {
    fontSize: 13,
    lineHeight: 16,
    fontFamily: Fonts.SFSemiBold,
  },
});
