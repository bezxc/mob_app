import { Href, router } from "expo-router";
import { forwardRef } from "react";
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { ChevronLeft } from "@/shared/assets/icons";
import { Colors, Fonts } from "@/shared/styles/tokens";

export interface IFormLinkProps extends TouchableOpacityProps {
  title: string;
  description?: string;
  link: string;
  badge?: string;
  isNew?: boolean;
}
export const FormLink = forwardRef<View, IFormLinkProps>(
  (
    {
      title,
      description,
      link,
      badge,
      style,
      onPress,
      isNew = false,
      ...props
    },
    ref,
  ) => {
    const onPressLink = (event: GestureResponderEvent) => {
      router.push(link as Href);
      if (onPress) {
        onPress(event);
      }
    };
    return (
      <TouchableOpacity
        onPress={onPressLink}
        activeOpacity={0.5}
        {...props}
        ref={ref}
        style={[styles.formLinkContainer, style]}
      >
        <View style={styles.formLinkCard}>
          <Text style={[styles.title, isNew && styles.titleRed]}>{title}</Text>
          {description && <Text style={styles.description}>{description}</Text>}
        </View>
        <View style={[styles.icon, isNew && styles.newIcon]}>
          <ChevronLeft
            stroke={isNew ? Colors.redAccent : Colors.grayText}
            width={24}
            height={24}
            strokeWidth={3}
            style={{ transform: [{ rotate: "180deg" }] }}
          />
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
  formLinkContainer: {
    position: "relative",
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: Colors.grayLight,
    paddingVertical: 15,
    borderRadius: 20,
  },
  formLinkCard: {
    gap: 6,
  },
  title: {
    fontFamily: Fonts.TBold,
    fontSize: 14,
    lineHeight: 16,
  },
  titleRed: {
    color: Colors.redAccent,
  },
  description: {
    fontFamily: Fonts.TRegular,
    fontSize: 11,
    lineHeight: 13,
    color: Colors.grayText,
  },
  icon: {
    position: "absolute",
    right: 0,
    paddingHorizontal: 24,
    paddingVertical: 18,
  },
  newIcon: {
    paddingVertical: 10,
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
