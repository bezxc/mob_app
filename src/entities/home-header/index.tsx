import { useQueryClient } from "@tanstack/react-query";
import * as FileSystem from "expo-file-system";
import { StatusBar } from "expo-status-bar";
import { Alert, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KLogo } from "@/shared/assets/icons";
import { Colors, Fonts } from "@/shared/styles/tokens";

export const HomeHeader = () => {
  const insets = useSafeAreaInsets();

  const queryClient = useQueryClient();

  const clearAllData = async () => {
    try {
      queryClient.clear();
      Alert.alert(
        "Очистка завершена",
        "Кэш и данные приложения успешно очищены",
      );
      FileSystem.readDirectoryAsync(FileSystem.cacheDirectory!).then(
        (response) => {
          for (const dir of response) {
            FileSystem.deleteAsync(dir);
          }
        },
      );
    } catch (error) {
      Alert.alert("Ошибка", "Не удалось очистить данные");
      console.error(error);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="dark" backgroundColor="white" />
      <View style={styles.headerWrapper}>
        <KLogo
          onLongPress={clearAllData}
          width={29}
          height={29}
          viewBox="0 0 182 195"
          pathFill="red"
        />
        {/* <TouchableOpacity
          disabled={true}
          onPress={() => router.push("/(withoutTabs)/notificationsPage")}
        >
          <Bell width={22} height={22} color={Colors.black} />
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 18,
  },
  title: {
    fontSize: 28,
    fontFamily: Fonts.TBold,
  },
});
