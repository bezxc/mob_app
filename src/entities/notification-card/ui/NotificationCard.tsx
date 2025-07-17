import { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SvgProps } from "react-native-svg";
import { NotificationActionIcon } from "@/shared/assets/icons";
import { Colors, Fonts } from "@/shared/styles/tokens";

interface INotificationCard {
  title: string;
  date: string;
  description?: string;
  iconProps?: SvgProps;
}

export const NotificationCard: FC<INotificationCard> = ({
  title,
  date,
  description,
  iconProps,
}) => {
  return (
    <TouchableOpacity activeOpacity={1} style={styles.cardContainer}>
      <View style={styles.iconContainer}>
        <NotificationActionIcon
          width={32}
          height={32}
          fill="#000000"
          {...iconProps}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>
        {description && (
          <Text style={styles.notificationDescription}>{description}</Text>
        )}
        <Text style={styles.date}>{date}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.grayLight,
  },
  infoContainer: {
    flexShrink: 1,
    paddingLeft: 14,
    paddingVertical: 5,
  },
  title: {
    fontWeight: "bold",
    color: "#000000",
    fontSize: 13,
  },
  notificationDescription: {
    fontFamily: Fonts.TRegular,
    color: Colors.gray,
    fontSize: 12,
  },
  date: {
    fontFamily: Fonts.TRegular,
    color: Colors.gray,
    fontSize: 11,
    lineHeight: 13,
    marginTop: 5,
  },
});
