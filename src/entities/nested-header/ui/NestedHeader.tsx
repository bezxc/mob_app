import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { ChevronLeftIcon } from "lucide-react-native";
import { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors, Fonts } from "@/shared/styles/tokens";

interface INestedHeaderProps extends NativeStackHeaderProps {
  headerTitle: string;
  withInsets?: boolean;
  backWithDesc?: boolean;
  backPress?: () => void;
  visibleBack?: boolean;
  withHorizontalPadding?: boolean;
}

export const NestedHeader: FC<INestedHeaderProps> = ({
  headerTitle,
  navigation,
  backPress,
  withInsets = true,
  backWithDesc = false,
  visibleBack = true,
  withHorizontalPadding = true,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.headerContainer,
        withInsets && {
          paddingTop: insets.top,
        },
        withHorizontalPadding && {
          paddingHorizontal: 18,
        },
      ]}
    >
      <TouchableOpacity
        disabled={!backWithDesc}
        onPress={() => navigation.goBack()}
        style={[styles.headerContentWrapper]}
      >
        {visibleBack && (
          <TouchableOpacity
            disabled={backWithDesc}
            onPress={() => (backPress ? backPress() : navigation.goBack())}
          >
            <ChevronLeftIcon size={40} strokeWidth={1.5} color={Colors.black} />
          </TouchableOpacity>
        )}

        <Text
          style={[
            styles.headerTitle,
            backWithDesc && styles.headerTitleDesc,
            !visibleBack && !backWithDesc && styles.headerTitleWithHiddenBack,
          ]}
        >
          {headerTitle}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingBottom: 10,
    backgroundColor: Colors.white,
  },
  headerContentWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: Fonts.SFSemiBold,
    color: Colors.black,
    flexShrink: 1,
  },
  headerTitleDesc: {
    fontFamily: Fonts.SFSemiBold,
    fontSize: 17,
    lineHeight: 17,
    color: Colors.black,
  },
  headerTitleWithHiddenBack: {
    paddingLeft: 44,
    minHeight: 34,
    alignSelf: "center",
  },
});
