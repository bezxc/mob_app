import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ArrowRight } from "lucide-react-native";
import { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChevronLeft } from "@/shared/assets/icons";
import { Colors, Fonts } from "@/shared/styles/tokens";
import { IRoutePath } from "@/shared/types/types";

interface INestedHeaderWithRightLinkProps extends NativeStackHeaderProps {
  headerTitle: string;
  rightLinkTitle: string;
  rightLinkHref: IRoutePath;
  withInsets?: boolean;
  withBackButton?: boolean;
  backPress?: () => void;
  rightLinkVisibility?: boolean;
}
export const NestedHeaderWithRightLink: FC<INestedHeaderWithRightLinkProps> = ({
  headerTitle,
  navigation,
  rightLinkTitle,
  rightLinkHref,
  backPress,
  withInsets = true,
  withBackButton = true,
  rightLinkVisibility = true,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        withInsets && {
          paddingTop: insets.top,
        },
        !withBackButton && { backgroundColor: Colors.white },
      ]}
    >
      <StatusBar style="dark" backgroundColor="transparent" />
      <View style={styles.headerContentWrapper}>
        <View style={styles.headerContentInner}>
          {withBackButton && (
            <TouchableOpacity
              onPress={() => (backPress ? backPress() : navigation.goBack())}
            >
              <ChevronLeft />
            </TouchableOpacity>
          )}
          <View>
            <Text style={styles.headerTitle}>{headerTitle}</Text>
          </View>
        </View>
        {rightLinkVisibility && (
          <TouchableOpacity
            style={styles.rightLinkButton}
            onPress={() => router.push(rightLinkHref)}
          >
            <Text style={styles.rightLinkTitle}>{rightLinkTitle}</Text>
            <ArrowRight color={Colors.redAccent} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContentWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 21,
    paddingBottom: 29,
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
  },
  rightLinkButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  rightLinkTitle: {
    color: Colors.redAccent,
    fontFamily: Fonts.SFSemiBold,
    fontSize: 12,
  },
  headerContentInner: {
    flexDirection: "row",
    gap: 5,
  },
  headerTitle: {
    fontFamily: Fonts.SFSemiBold,
    fontSize: 22,
    justifyContent: "center",
  },
  headerBadge: {
    width: 16,
    height: 16,
    backgroundColor: Colors.redAccent,
    borderRadius: 100,
    position: "absolute",
    right: -5,
    top: -7,
  },
});
