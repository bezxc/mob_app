import React, { FC, PropsWithChildren } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { Colors, Fonts } from "@/shared/styles/tokens";

export const Button: FC<PropsWithChildren<TouchableOpacityProps>> = ({
  children,
  ...props
}) => {
  return (
    <TouchableOpacity style={styles.button} {...props}>
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 20,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  buttonText: {
    fontFamily: Fonts.TBold,
    fontSize: 15,
  },
});
