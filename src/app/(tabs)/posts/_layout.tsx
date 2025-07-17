import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KLogo } from "@/shared/assets/icons";
import { Fonts } from "@/shared/styles/tokens";

export default function Layout() {
  const insets = useSafeAreaInsets();

  return (
    <Stack>
      <Stack.Screen
        options={{
          header: () => (
            // TODO Вынести в отдельный компонент
            <View
              style={{
                backgroundColor: "white",
                paddingTop: insets.top,
              }}
            >
              <StatusBar style="dark" backgroundColor="transparent" />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 18,
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: Fonts.TBold,
                  }}
                >
                  Новости
                </Text>
                <KLogo
                  width={35}
                  height={37}
                  viewBox="0 0 182 195"
                  pathFill="red"
                />
              </View>
            </View>
          ),
        }}
        name="index"
      />
      <Stack.Screen
        name="[id]"
        options={{
          contentStyle: {
            backgroundColor: "white",
          },
        }}
      />
    </Stack>
  );
}
