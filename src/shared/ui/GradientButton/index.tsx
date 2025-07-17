import { LinearGradient } from "expo-linear-gradient";
import React, { FC, PropsWithChildren } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import { Colors, Fonts } from "@/shared/styles/tokens";

export type IGradientButtonProps = PropsWithChildren<TouchableOpacityProps> & {
  colors?: [string, string, ...string[]];
  isLoading?: boolean;
  gradientStyles?: ViewStyle;
};

export const GradientButton: FC<IGradientButtonProps> = ({
  children,
  colors,
  isLoading,
  gradientStyles,
  ...props
}) => {
  const gradientColors =
    isLoading || props.disabled
      ? [Colors.gray, Colors.gray]
      : !colors
        ? ["#ED1D24", "#FF565C", "#D6252B"]
        : colors;

  return (
    <TouchableOpacity style={[styles.button, props.style]} {...props}>
      <LinearGradient
        end={{ x: 1, y: 1 }}
        colors={gradientColors as [string, string, ...string[]]}
        start={{ x: 0, y: 0 }}
        style={[styles.gradient, gradientStyles]}
      >
        {isLoading ? (
          <ActivityIndicator color={Colors.redAccent} />
        ) : (
          <Text style={styles.buttonText}>{children}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    overflow: "hidden",
  },
  gradient: {
    position: "relative",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  buttonText: {
    fontFamily: Fonts.TBold,
    fontSize: 15,
    color: Colors.white,
  },
});
