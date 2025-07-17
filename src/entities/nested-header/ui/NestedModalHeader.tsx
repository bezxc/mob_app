import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { FC } from "react";
import {
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChevronLeft } from "@/shared/assets/icons";
import { Colors, Fonts } from "@/shared/styles/tokens";

interface INestedModalHeaderProps extends NativeStackHeaderProps {
  headerTitle: string;
}

export const NestedModalHeader: FC<INestedModalHeaderProps> = ({
  headerTitle,
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={{
          paddingTop: Platform.OS === "android" ? insets.top : 0,
        }}
      >
        <StatusBar style="dark" backgroundColor="white" />
        <View style={styles.headerContentWrapper}>
          <View style={styles.headerContentInner}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ChevronLeft />
            </TouchableOpacity>
            <View>
              <Text style={styles.headerTitle}>{headerTitle}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  headerContentWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 21,
    paddingBottom: 29,
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
  },
  headerContentInner: {
    flexDirection: "row",
    gap: 10,
  },
  headerTitle: {
    fontFamily: Fonts.SFSemiBold,
    fontSize: 22,
  },
});
