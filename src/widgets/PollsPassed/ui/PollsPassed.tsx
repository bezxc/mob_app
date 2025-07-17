import { router } from "expo-router";
import { Frown } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";
import { Colors, Fonts } from "@/shared/styles/tokens";
import { LinearGradientButton } from "@/shared/ui";

export const PollsPassed = () => {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <View style={styles.iconInner}>
          <Frown
            strokeWidth={1.5}
            width={40}
            height={40}
            stroke={Colors.redLinear}
          />
        </View>
      </View>
      <Text style={styles.title}>
        Извините!{"\n"}Но вы уже прошли опрос{"\n"}
      </Text>
      <Text style={styles.description}>Повторное прохождение невозможно</Text>

      <LinearGradientButton
        onPress={() => router.navigate("/")}
        text="Перейти на главную"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 30,
    width: "100%",
    paddingTop: "30%",
  },
  iconWrapper: {
    alignSelf: "center",
    backgroundColor: Colors.grayLight,
    borderRadius: 20,
    padding: 10,
  },
  iconInner: {
    backgroundColor: Colors.white,
    borderRadius: 40,
    padding: 14,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  title: {
    fontFamily: Fonts.TRegular,
    fontSize: 28,
    textAlign: "center",
    lineHeight: 34,
  },
  description: {
    fontFamily: Fonts.TRegular,
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
    color: Colors.grayText,
  },
});
