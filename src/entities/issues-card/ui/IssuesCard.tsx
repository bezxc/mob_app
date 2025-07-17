import { FC } from "react";
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TIssuesItem } from "@/entities/issues";
import { Colors, Fonts } from "@/shared/styles/tokens";
import { formatDateWithTime } from "@/shared/utils";

interface IIssuesCardProps {
  item: TIssuesItem;
  onPress?: (event: GestureResponderEvent) => void;
}
export const IssuesCard: FC<IIssuesCardProps> = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.headerNumber}>№{item.id}</Text>
        <Text style={styles.headerDate}>
          {formatDateWithTime(item.created_at, "issuesCard")}
        </Text>
      </View>
      {item.category.category_type.id !== 3 && (
        <Text style={styles.text}>
          {item.body}
          {item.category.category_type.id === 1 &&
            (item.benefit ? ". " + item.benefit : "")}
        </Text>
      )}

      <View style={styles.footer}>
        <Text style={styles.footerLeft}>
          Категория:{" "}
          <Text style={styles.footerRight}>{item.category.title.trim()}</Text>
        </Text>
        <Text style={styles.footerLeft}>
          Статус: <Text style={styles.footerRight}>{item.status.title}</Text>
        </Text>
      </View>
    </TouchableOpacity>
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
    marginBottom: 20,
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
  footer: {
    gap: 8,
  },
  footerLeft: {
    fontSize: 11,
    fontFamily: Fonts.TRegular,
    color: Colors.gray70,
  },
  footerRight: {
    fontSize: 11,
    fontFamily: Fonts.TBold,
    color: Colors.gray70,
  },
});
