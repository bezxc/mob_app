import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChevronLeft } from "@/shared/assets/icons";
import { Colors, Fonts } from "@/shared/styles/tokens";

interface INestedCenteredHeaderProps extends NativeStackHeaderProps {
  headerTitle: string;
  withInsets?: boolean;
}

export const NestedCenteredHeader: FC<INestedCenteredHeaderProps> = ({
  headerTitle,
  navigation,
  withInsets = true,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.headerContainer,
        withInsets && {
          paddingTop: insets.top,
        },
      ]}
    >
      <View style={styles.headerContentWrapper}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.goBack()}
        >
          <ChevronLeft />
        </TouchableOpacity>
        <View style={styles.headerTitleWrapper}>
          <Text style={styles.headerTitle}>{headerTitle}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 18,
    backgroundColor: Colors.white,
    position: "relative",
  },
  headerContentWrapper: {
    position: "relative",
    borderBottomWidth: 1,
    borderBottomColor: Colors.grayLight,
  },
  headerButton: {
    position: "absolute",
    left: 0,
    top: 20,
    zIndex: 100,
  },
  headerTitleWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 21,
    paddingBottom: 21,
  },
  headerTitle: {
    fontFamily: Fonts.SFSemiBold,
    fontSize: 18,
  },
});
