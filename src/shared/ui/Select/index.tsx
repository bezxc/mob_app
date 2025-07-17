import { Ban, X } from "lucide-react-native";
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
  withIcon?: boolean;
  disabled?: boolean;
  isRequired?: boolean;
}
export const Select = forwardRef<View, ISelectProps>(
  (
    {
      label,
      value,
      badge,
      style,
      withClear = false,
      clearFn,
      selectedColor,
      disabled = false,
      withIcon = true,
      isRequired = false,
      ...props
    },
    ref,
  ) => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        disabled={disabled}
        {...props}
        ref={ref}
        style={[
          styles.selectContainer,
          disabled && styles.disabledOpacity,
          style,
        ]}
      >
        <View style={styles.selectCard}>
          <Text style={styles.label}>
            {label} {isRequired && <Text style={styles.required}>*</Text>}
          </Text>
          <Text style={[styles.value, selectedColor]}>
            {value || "Выбрать"}
          </Text>
        </View>
        {withIcon && (
          <View style={styles.icon}>
            {withClear ? (
              <Pressable onPress={clearFn}>
                <Text style={styles.iconClearText}>
                  <X color={Colors.redAccent} />
                </Text>
              </Pressable>
            ) : disabled ? (
              <Ban color={Colors.grayText} />
            ) : (
              <ChevronLeft
                stroke={Colors.redAccent}
                width={24}
                height={24}
                strokeWidth={3}
                style={{ transform: [{ rotate: "270deg" }] }}
              />
            )}
          </View>
        )}
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
    borderColor: Colors.gray30,
    paddingVertical: 15,
    borderRadius: 20,
  },
  required: {
    color: Colors.redAccent,
    fontSize: 13,
    lineHeight: 16,
  },
  selectCard: {
    gap: 6,
  },
  label: {
    color: Colors.gray70,
    fontFamily: Fonts.TRegular,
    fontSize: 13,
    lineHeight: 16,
  },
  value: {
    fontFamily: Fonts.TRegular,
    fontSize: 14,
    lineHeight: 17,
    maxWidth: "90%",
  },
  icon: {
    position: "absolute",
    right: 0,
    paddingHorizontal: 24,
    paddingVertical: 24,
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
  disabledOpacity: {
    opacity: 0.5,
  },
});
