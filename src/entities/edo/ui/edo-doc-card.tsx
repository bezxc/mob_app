import { router } from "expo-router";
import { Check, CheckCheck, FileText } from "lucide-react-native";
import { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors, Fonts } from "@/shared/styles/tokens";
import { formatDateWithTime } from "@/shared/utils";

interface EdoDocCardProps {
  doc_key: string;
  doc_type: string;
  name: string;
  reg_number: string;
  publication_date: string;
  was_read: boolean;
  updated_at: string;
}

export const EdoDocCard: FC<EdoDocCardProps> = ({
  doc_key,
  doc_type,
  name,
  reg_number,
  publication_date,
  was_read,
  updated_at,
}) => {
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: `/(withoutTabs)/edo-doc-view`,
          params: {
            doc_key,
            was_read: was_read ? "true" : "false",
            updated_at,
          },
        })
      }
      style={styles.cardContainer}
    >
      <View style={styles.iconContainer}>
        <FileText size={24} color={Colors.redAccent} />
      </View>
      <View style={{ flex: 1 }}>
        <Text ellipsizeMode="tail" numberOfLines={1} style={styles.title}>
          {name}
        </Text>
        <Text numberOfLines={1} style={styles.description}>
          {`${doc_type} от ${formatDateWithTime(publication_date, "dayWithMonthAndYear")} № ${reg_number} `}
        </Text>
      </View>
      {was_read ? (
        <CheckCheck size={24} color={Colors.redAccent} />
      ) : (
        <Check size={24} color={Colors.gray50} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 10,
    padding: 10,
  },
  title: {
    fontFamily: Fonts.TBold,
    fontSize: 14,
  },
  description: {
    fontFamily: Fonts.TRegular,
    fontSize: 13,
    color: Colors.gray50,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: Colors.gray50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});
