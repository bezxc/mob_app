import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChevronLeft, KLogo } from "@/shared/assets/icons";
import { Fonts } from "@/shared/styles/tokens";

export default function MagazinesLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Stack>
      <Stack.Screen
        options={{
          header: () => (
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
                    fontSize: 22,
                    fontWeight: "bold",
                  }}
                >
                  Журнал KANAVTOfamily
                </Text>
                <KLogo
                  width={45}
                  height={49}
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
        name="[magazine]"
        options={{
          title: "",
          header: ({ navigation, options }) => (
            <View
              style={{
                paddingTop: insets.top,
                paddingHorizontal: 18,
                backgroundColor: "white",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingTop: 21,
                  paddingBottom: 29,
                }}
              >
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <ChevronLeft />
                </TouchableOpacity>
                <Text
                  style={{
                    fontFamily: Fonts.TRegular,
                    fontSize: 14,
                    fontWeight: 400,
                    color: "gray",
                  }}
                >
                  {options.title}
                </Text>
              </View>
            </View>
          ),
        }}
      />
    </Stack>
  );
}
