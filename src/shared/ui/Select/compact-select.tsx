import { forwardRef } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native";
import { ChevronLeft } from "@/shared/assets/icons";
import { Colors, Fonts } from "@/shared/styles/tokens";

export interface ISelectProps extends TouchableOpacityProps {
  label: string;
  value: string;
  clearFn?: () => void;
  badge?: string;
  withClear?: boolean;
  selectedColor?: StyleProp<TextStyle>;
  errorStyle?: StyleProp<ViewStyle>;
}
export const CompactSelect = forwardRef<View, ISelectProps>(
  (
    {
      label,
      value,
      badge,
      style,
      withClear = false,
      clearFn,
      selectedColor,
      errorStyle,
      ...props
    },
    ref,
  ) => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        {...props}
        ref={ref}
        style={[styles.selectContainer, style]}
      >
        <View style={[styles.selectCard]}>
          <Text style={styles.label}>{label}</Text>
          <Text style={[styles.value, selectedColor]}>{value}</Text>
        </View>
        <View style={styles.icon}>
          {withClear ? (
            <Pressable onPress={clearFn}>
              <Text style={styles.iconClearText}>&times;</Text>
            </Pressable>
          ) : (
            <ChevronLeft
              stroke={Colors.gray50}
              width={20}
              height={20}
              strokeWidth={3}
              style={{ transform: [{ rotate: "270deg" }] }}
            />
          )}
        </View>
        {badge && (
          <View style={styles.badgeWrapper}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  selectContainer: {
    position: "relative",
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: Colors.grayLight,
    paddingVertical: 15,
    borderRadius: 20,
  },
  selectCard: {
    gap: 4,
  },
  label: {
    color: Colors.gray70,
    fontFamily: Fonts.SFSemiBold,
    fontSize: 13,
    lineHeight: 16,
  },
  value: {
    fontFamily: Fonts.TBold,
    fontSize: 14,
    lineHeight: 26,
    backgroundColor: Colors.white,
    borderRadius: 13,
    paddingHorizontal: 12,
  },
  icon: {
    position: "absolute",
    right: 0,
    paddingHorizontal: 12,
    paddingVertical: 26,
  },
  iconClearText: {
    fontFamily: Fonts.TBold,
    fontSize: 18,
    color: Colors.redAccent,
  },
  badgeWrapper: {
    position: "absolute",
    top: -15,
    left: 10,
    backgroundColor: Colors.redAccent,
    borderRadius: 50,
    width: 22,
    height: 22,
    alignItems: "center",
  },
  badgeText: {
    fontFamily: Fonts.TBold,
    fontSize: 14,
    color: Colors.white,
  },
});
