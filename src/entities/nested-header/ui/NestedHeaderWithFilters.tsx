import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SlidersHorizontal } from "lucide-react-native";
import { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChevronLeft } from "@/shared/assets/icons";
import { Colors, Fonts } from "@/shared/styles/tokens";
import { IRoutePath } from "@/shared/types/types";

interface INestedHeaderWithFiltersProps extends NativeStackHeaderProps {
  headerTitle: string;
  filtersHref: IRoutePath;
  withInsets?: boolean;
  withBackButton?: boolean;
  backPress?: () => void;
  filtersCount?: number;
}
export const NestedHeaderWithFilters: FC<INestedHeaderWithFiltersProps> = ({
  headerTitle,
  filtersHref,
  navigation,
  filtersCount,
  backPress,
  withInsets = true,
  withBackButton = true,
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
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => router.push(filtersHref)}
        >
          <Text style={styles.filterText}>Фильтр</Text>
          <SlidersHorizontal size={15} color={Colors.redAccent} />
          <View
            style={[
              styles.headerBadge,
              filtersCount ? {} : { display: "none" },
            ]}
          >
            <Text style={styles.headerBadgeText}>{filtersCount}</Text>
          </View>
        </TouchableOpacity>
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
  filterButton: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: Colors.redAccent,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 8,
  },
  filterText: {
    color: Colors.redAccent,
    fontFamily: Fonts.SFSemiBold,
    fontSize: 14,
  },
  headerContentInner: {
    flexDirection: "row",
    gap: 5,
  },
  headerTitle: {
    fontFamily: Fonts.TRegular,
    fontSize: 22,
    fontWeight: "700",
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
  headerBadgeText: {
    color: Colors.white,
    fontFamily: Fonts.TBold,
    fontSize: 9,
    margin: "auto",
    textAlign: "center",
  },
});
