import { FC, memo } from "react";
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AvatarImage } from "@/entities/avatar-image";
import { Colors, Fonts } from "@/shared/styles/tokens";

interface IColleaguesCard {
  kan_uid: string;
  name: string;
  position: string;
  onPress?: (event: GestureResponderEvent) => void;
}

export const ColleaguesCard: FC<IColleaguesCard> = memo(
  ({ name, position, onPress, kan_uid }) => {
    return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <AvatarImage full_name={name} kan_uid={kan_uid} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{name}</Text>
          <Text numberOfLines={1} style={styles.desciption}>
            {position}
          </Text>
        </View>
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 16,
  },
  textContainer: {
    flexShrink: 1,
    gap: 5,
  },
  title: {
    fontSize: 14,
    fontFamily: Fonts.TBold,
  },
  desciption: {
    color: Colors.gray,
    fontSize: 12,
    fontFamily: Fonts.TRegular,
  },
});
