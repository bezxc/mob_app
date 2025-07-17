import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LoginForm } from "@/features/LoginForm";
import { KLogo } from "@/shared/assets/icons";
import { Colors, Fonts } from "@/shared/styles/tokens";

export default function Login() {
  return (
    <TouchableWithoutFeedback onPressOut={() => Keyboard.dismiss()}>
      <LinearGradient
        colors={["#ED1D24", "#FF565C", "#D6252B"]}
        style={{ flexGrow: 1 }}
      >
        <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.content}
          >
            <KLogo />
            <Text style={styles.title}>Вход</Text>
            <LoginForm />
          </KeyboardAvoidingView>
        </SafeAreaView>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  content: {
    alignItems: "center",
    gap: 29,
  },
  container: {
    justifyContent: "center",
    flex: 1,
    paddingHorizontal: 18,
  },
  title: {
    paddingTop: 33,
    fontSize: Fonts.f28,
    fontFamily: Fonts.TBold,
    color: Colors.white,
  },
  form: {
    alignSelf: "stretch",
    gap: 20,
  },
});
