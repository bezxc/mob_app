import { LinearGradient } from "expo-linear-gradient";
import { FC } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import { Colors, Fonts } from "@/shared/styles/tokens";

interface ILinearGradientButtonProps extends TouchableOpacityProps {
  text?: string;
  icon?: React.JSX.Element;
  colors?: [string, string, ...string[]];
  buttonStyle?: StyleProp<ViewStyle>;
}

export const LinearGradientButton: FC<ILinearGradientButtonProps> = ({
  text,
  icon,
  disabled,
  colors,
  buttonStyle,
  ...props
}) => {
  return (
    <TouchableOpacity disabled={disabled} activeOpacity={0.7} {...props}>
      <LinearGradient
        style={[styles.submitButton, buttonStyle]}
        colors={
          disabled
            ? ["#C4C4C4", "#C4C4C4", "#C4C4C4"]
            : colors || ["#ED1D24", "#FF565C", "#D6252B"]
        }
        start={{ x: 0.37, y: -0.05 }}
        end={{ x: 0.95, y: 0.98 }}
      >
        {text && <Text style={styles.submitButtonText}>{text}</Text>}
        {icon}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  submitButton: {
    width: "100%",
    height: 60,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonText: {
    fontFamily: Fonts.TBold,
    fontSize: 15,
    color: Colors.white,
  },
});
