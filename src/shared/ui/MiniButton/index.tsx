import { FC, PropsWithChildren } from "react";
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { Colors, Fonts } from "@/shared/styles/tokens";

export type MiniButtonProps = PropsWithChildren<TouchableOpacityProps> & {
  textStyle?: TextStyle;
};

export const MiniButton: FC<PropsWithChildren<MiniButtonProps>> = ({
  children,
  textStyle,
  ...props
}) => {
  return (
    <TouchableOpacity style={styles.button} {...props}>
      <Text style={[styles.buttonText, textStyle]}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: Colors.grayLight,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  buttonText: {
    fontFamily: Fonts.SFSemiBold,
    fontSize: 12,
    color: Colors.black,
    textTransform: "lowercase",
  },
});
