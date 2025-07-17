import "react-native-reanimated";
import "react-native-get-random-values";
import "./sheets";
import "text-encoding-polyfill";
import { useReactQueryDevTools } from "@dev-plugins/react-query";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { decode } from "base-64";
import { useUnit } from "effector-react";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { SheetProvider } from "react-native-actions-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { EventProvider } from "react-native-outside-press";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { $modalVisible } from "@/entities/modal-picker";
import { $auth } from "@/shared/api/auth.store";
import { Colors } from "@/shared/styles/tokens";
import Login from "./login";

global.atob = decode;
SplashScreen.preventAutoHideAsync();

export const queryClient = new QueryClient();

export default function RootLayout() {
  useReactQueryDevTools(queryClient);

  const [loaded] = useFonts({
    "SF-Pro-Semibold": require("../shared/assets/fonts/SF-Pro-Semibold.ttf"),
    "Tahoma-Bold": require("../shared/assets/fonts/Tahoma-Bold.ttf"),
    "Tahoma-Regular": require("../shared/assets/fonts/Tahoma-Regular.ttf"),
    "Elektra-Light-Pro-Bold": require("../shared/assets/fonts/ElektraLightProBold.ttf"),
    "Elektra-Medium-Pro-Bold": require("../shared/assets/fonts/ElektraMediumProBold.ttf"),
    "Elektra-Text-Pro": require("../shared/assets/fonts/ElektraTextPro.ttf"),
  });

  const modalState = useUnit($modalVisible);

  const { isAuthenticated } = useUnit($auth);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ActionSheetProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SheetProvider context="global">
            {!isAuthenticated ? (
              <Login />
            ) : (
              <SafeAreaProvider>
                <StatusBar style="light" backgroundColor="transparent" />
                <EventProvider>
                  <Stack
                    screenOptions={{
                      contentStyle: {
                        backgroundColor: Colors.white,
                      },
                    }}
                  >
                    <Stack.Screen
                      name="(tabs)"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="(withoutTabs)"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen name="+not-found" />
                  </Stack>
                  {modalState.modalVisible && <View style={styles.overlay} />}
                </EventProvider>
              </SafeAreaProvider>
            )}
            <Toast />
          </SheetProvider>
        </GestureHandlerRootView>
      </ActionSheetProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "#00000033",
  },
});
