import { LinearGradient } from "expo-linear-gradient";
import { FC } from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Colors, Fonts } from "@/shared/styles/tokens";
import { IGradientButtonProps } from "@/shared/ui";

export const ColleaguesBirthdayButton: FC<IGradientButtonProps> = ({
  ...props
}) => {
  return (
    <TouchableOpacity style={[styles.button, props.style]} {...props}>
      <LinearGradient
        end={{ x: 1, y: 1 }}
        colors={["#E30613", "#E30655"]}
        start={{ x: 0, y: 0 }}
        style={styles.gradient}
      >
        <Image
          style={styles.imageBackgroundLeftStyle}
          source={require("@/shared/assets/BirthdayLeftBg.png")}
        />
        <Text style={styles.buttonText}>дни рождения коллег</Text>
        <Image
          style={styles.imageBackgroundRightStyle}
          source={require("@/shared/assets/BirthdayRightBg.png")}
        />
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
  },
  gradient: {
    padding: 11,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  buttonText: {
    fontFamily: Fonts.TBold,
    fontSize: 15,
    color: Colors.white,
  },
  imageBackgroundLeftStyle: {
    position: "absolute",
    left: 0,
    top: 0,
    width: 58,
    height: 42,
  },
  imageBackgroundRightStyle: {
    position: "absolute",
    right: 0,
    top: 0,
    width: 68,
    height: 54,
  },
});
