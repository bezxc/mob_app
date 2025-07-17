import { StatusBar } from "expo-status-bar";
import { FC, PropsWithChildren, useMemo } from "react";
import { Dimensions, Platform, Pressable, StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  FadeIn,
  runOnJS,
  SharedValue,
  SlideInDown,
  SlideOutDown,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/shared/styles/tokens";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface ICustomBottomSheetProps {
  offset: SharedValue<number>;
  toggleSheet: () => void;
  handlePressBottomLink: (url: string) => void;
  height: number;
}

export const CustomBottomSheet: FC<
  PropsWithChildren<ICustomBottomSheetProps>
> = ({ offset, toggleSheet, height, children }) => {
  const { bottom } = useSafeAreaInsets();
  const HEIGHT = useMemo(
    () => height * Dimensions.get("screen").height + bottom,
    [height, bottom],
  );
  const pan = Gesture.Pan()
    .onChange((event) => {
      const offsetDelta = event.changeY + offset.value;
      const clamp = Math.max(-HEIGHT, offsetDelta);
      offset.value = offsetDelta > 0 ? offsetDelta : withSpring(clamp);
    })
    .onFinalize(() => {
      if (offset.value < HEIGHT / 3) {
        offset.value = withSpring(0);
      } else {
        offset.value = withTiming(HEIGHT, {}, () => {
          runOnJS(toggleSheet)();
        });
      }
    });

  const translateY = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }],
  }));
  return (
    <>
      <StatusBar
        style={Platform.OS === "ios" ? "dark" : "light"}
        backgroundColor="transparent"
      />
      <AnimatedPressable
        style={styles.backdrop}
        entering={FadeIn}
        onPress={toggleSheet}
      />
      <GestureDetector gesture={pan}>
        <Animated.View
          style={[styles.sheet, { height: HEIGHT }, translateY]}
          entering={SlideInDown.springify().damping(20)}
          exiting={SlideOutDown}
        >
          {children}
        </Animated.View>
      </GestureDetector>
    </>
  );
};

const styles = StyleSheet.create({
  sheet: {
    backgroundColor: Colors.white,
    paddingHorizontal: 18,
    paddingTop: 10,
    width: "100%",
    position: "absolute",
    bottom: -20 * 1.1,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    zIndex: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#00000033",
    zIndex: 1,
  },
});
