import { FC } from "react";
import { StyleSheet, Text, View, ViewProps } from "react-native";
import { Colors, Fonts } from "@/shared/styles/tokens";

interface IFormInfoLabel extends ViewProps {
  label: string;
  badge?: string;
  isRequired?: boolean;
}

export const FormInfoLabel: FC<IFormInfoLabel> = ({
  label,
  badge,
  style,
  isRequired = false,
  ...props
}) => {
  return (
    <View {...props} style={[styles.container, style]}>
      <Text style={styles.label}>
        {label} {isRequired && <Text style={styles.required}>*</Text>}
      </Text>
      {badge && (
        <View style={styles.badgeWrapper}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 21,
    paddingRight: 55,
    paddingVertical: 14,
    borderRadius: 20,
    backgroundColor: Colors.grayLight,
  },
  label: {
    fontSize: 13,
    fontFamily: Fonts.TRegular,
  },
  required: {
    color: Colors.redAccent,
    fontSize: 13,
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
