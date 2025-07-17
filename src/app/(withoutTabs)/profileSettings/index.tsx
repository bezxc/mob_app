import { useMutation } from "@tanstack/react-query";
import { useUnit } from "effector-react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { $auth, removeUserCredentials } from "@/shared/api/auth.store";
import { logOut } from "@/shared/api/loginApi";
import { Colors, Fonts } from "@/shared/styles/tokens";

export default function ProfileSettingsPage() {
  const { refreshToken, kanUid } = useUnit($auth);

  console.log(kanUid);

  const { mutate: logOutMutation, data } = useMutation({
    mutationFn: () => logOut(refreshToken),
    onSuccess: () => {
      console.log("Success", data);
      removeUserCredentials();
    },
    onError: (e) => {
      console.log(e);
    },
  });

  console.log(data);

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
    >
      {/* <View style={styles.groupWrapper}>
        <Text style={styles.groupTitle}>Настройка конфиденциальности</Text>
        <ProfileSettingsSwitch
          title="Показывать номер телефона"
          description="Открывает видимость мобильного номера для всех пользователей"
        />
      </View> */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={() => logOutMutation()}>
          <Text style={[styles.buttonText, styles.buttonTextGray]}>
            Выйти из аккаута
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 18,
    gap: 32,
    paddingBottom: Platform.OS === "ios" ? 64 : 32,
  },
  groupWrapper: {
    gap: 12,
  },
  groupTitle: {
    fontFamily: Fonts.TRegular,
    fontSize: 18,
    color: Colors.redAccent,
  },
  buttonsContainer: {
    alignSelf: "center",
    gap: 12,
    alignItems: "center",
  },
  buttonText: {
    fontFamily: Fonts.SFSemiBold,
    fontSize: 16,
  },
  buttonTextDanger: {
    color: Colors.redAccent,
  },
  buttonTextGray: {
    color: Colors.grayText,
  },
});
