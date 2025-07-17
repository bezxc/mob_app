import { router } from "expo-router";
import { Hammer } from "lucide-react-native";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { Colors, Fonts } from "@/shared/styles/tokens";
import { LinearGradientButton } from "@/shared/ui";

export const DevelopScreen = () => {
  const wrenchRotation = useSharedValue(0);
  const wrenchPosition = useSharedValue(0);

  useEffect(() => {
    wrenchRotation.value = withRepeat(
      withSequence(
        withTiming(-30, { duration: 200, easing: Easing.ease }),
        withTiming(30, { duration: 200, easing: Easing.ease }),
        withTiming(0, { duration: 200, easing: Easing.ease }),
      ),
      -1,
    );
  }, []);

  const wrenchAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${wrenchRotation.value}deg` },
        { translateX: wrenchPosition.value },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Animated.View style={[wrenchAnimatedStyle]}>
          <Hammer size={70} stroke={Colors.redAccent} />
        </Animated.View>
        <Text numberOfLines={2} style={styles.title}>
          Раздел находится в разработке
        </Text>
      </View>
      <LinearGradientButton
        text="Перейти на главную"
        onPress={() => router.dismissAll()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    gap: 32,
    flex: 1,
    justifyContent: "center",
  },
  textContainer: {
    justifyContent: "center",
    gap: 30,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontFamily: Fonts.TBold,
    color: Colors.black,
  },
});
