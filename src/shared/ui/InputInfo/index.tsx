import { FC } from "react";
import { StyleSheet, Text, TextStyle, View, ViewProps } from "react-native";
import { Colors, Fonts } from "@/shared/styles/tokens";

interface IInputInfo extends ViewProps {
  label?: string;
  description: string | null;
  descriptionStyle?: TextStyle;
  labelStyle?: TextStyle;
}
export const InputInfo: FC<IInputInfo> = ({
  label,
  description,
  style,
  descriptionStyle,
  labelStyle,
}) => {
  return (
    <View style={[styles.infoCard, style]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <Text style={[styles.description, descriptionStyle]}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  infoCard: {
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: Colors.grayLight,
    paddingVertical: 15,
    borderRadius: 20,
    gap: 6,
    backgroundColor: Colors.grayLight,
  },
  label: {
    color: Colors.gray70,
    fontFamily: Fonts.TRegular,
    fontSize: 12,
  },
  description: {
    fontFamily: Fonts.TRegular,
    fontSize: 14,
  },
});
