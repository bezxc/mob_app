import { useMutation } from "@tanstack/react-query";
import { useUnit } from "effector-react";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { LogOut, Settings } from "lucide-react-native";
import { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { $auth, removeUserCredentials } from "@/shared/api/auth.store";
import { logOut } from "@/shared/api/loginApi";
import { ChevronLeft } from "@/shared/assets/icons";
import { Colors, Fonts } from "@/shared/styles/tokens";

interface IProfileHeaderProps {
  withBackButton?: boolean;
}

export const ProfileHeader: FC<IProfileHeaderProps> = ({ withBackButton }) => {
  const insets = useSafeAreaInsets();
  const { fullName, refreshToken } = useUnit($auth);

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

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="dark" backgroundColor="white" />
      <View style={styles.headerWrapper}>
        {withBackButton && (
          <TouchableOpacity onPress={() => router.dismiss()}>
            <ChevronLeft />
          </TouchableOpacity>
        )}
        <Text style={styles.headerTitle}>
          {fullName.split(" ")[0]} {fullName.split(" ")[1]}
        </Text>
        <TouchableOpacity
          onPress={() => logOutMutation()}
          style={styles.headerSettingsButton}
        >
          <LogOut color={Colors.redAccent} width={24} height={24} />
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => router.push("/(withoutTabs)/profileSettings")}
          style={styles.headerSettingsButton}
        >
          <Settings color={Colors.redAccent} width={24} height={24} />
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
  },
  headerWrapper: {
    paddingHorizontal: 18,
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: Fonts.TBold,
    marginLeft: "auto",
  },
  headerSettingsButton: {
    marginLeft: "auto",
  },
});
