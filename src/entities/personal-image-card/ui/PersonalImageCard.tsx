import { useUnit } from "effector-react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SheetManager } from "react-native-actions-sheet";
import { AvatarImage } from "@/entities/avatar-image";
import { $auth } from "@/shared/api/auth.store";
import { Colors, Fonts } from "@/shared/styles/tokens";

export const PersonalImageCard = () => {
  const { kanUid } = useUnit($auth);

  return (
    <View style={styles.containerWrapper}>
      <Pressable
        style={styles.container}
        onPress={() => {
          SheetManager.show("profile-image");
        }}
      >
        <View style={styles.textWrapper}>
          <Text style={styles.label}>Файлы в формате: JPG, PNG</Text>
          <Text style={styles.text}>Загрузить фото</Text>
        </View>
        <View>
          <AvatarImage kan_uid={kanUid} />
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  containerWrapper: {
    flex: 1,
  },
  container: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 21,
    paddingVertical: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.gray,
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  textWrapper: { gap: 7 },
  label: {
    fontSize: 13,
    fontFamily: Fonts.TRegular,
    color: Colors.grayText,
  },
  text: {
    fontSize: 14,
    fontFamily: Fonts.TBold,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 50,
  },
  photoWrapper: { position: "relative" },
  photoIcon: {
    backgroundColor: Colors.redAccent,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  badgeContainer: {
    position: "absolute",
    top: -2,
    right: -7,
    backgroundColor: Colors.redAccent,
    borderRadius: 50,

    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: Colors.white,
    fontSize: 12,
  },
});
