import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { FC } from "react";
import {
  Alert,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChevronLeft } from "@/shared/assets/icons";
import { Colors, Fonts } from "@/shared/styles/tokens";

interface INestedHeaderWithShareProps extends NativeStackHeaderProps {
  headerTitle?: string;
  withInsets?: boolean;
  boldHeader?: boolean;
}

export const NestedHeaderWithShare: FC<INestedHeaderWithShareProps> = ({
  headerTitle,
  navigation,
  withInsets = true,
  boldHeader,
}) => {
  const insets = useSafeAreaInsets();

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: "Test",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

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
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft />
        </TouchableOpacity>
        <Text style={[boldHeader ? styles.boldTitle : styles.headerTitle]}>
          {headerTitle}
        </Text>
        {/* <TouchableOpacity style={styles.shareButton}>
          <UploadIcon />
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 18,
    backgroundColor: Colors.white,
  },
  headerContentWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 21,
    paddingBottom: 29,
  },
  headerTitle: {
    fontFamily: Fonts.TRegular,
    fontSize: 14,
    color: Colors.grayText,
    textAlign: "center",
    marginLeft: "auto",
  },
  boldTitle: {
    fontFamily: Fonts.TBold,
    fontSize: 22,
    color: Colors.darkGray,
    textAlign: "left",
    marginLeft: 12,
    flexShrink: 1,
  },
  shareButton: {
    marginLeft: "auto",
  },
});
