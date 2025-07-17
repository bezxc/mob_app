import { FC } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface IAccordionItem {
  isExpanded: SharedValue<boolean>;
  children: React.ReactNode[] | React.ReactNode;
  viewKey: string;
  style?: StyleProp<ViewStyle>;
  duration?: number;
  wrapperStyle?: StyleProp<ViewStyle>;
}

export const AccordionItem: FC<IAccordionItem> = ({
  isExpanded,
  children,
  viewKey,
  style,
  duration = 500,
  wrapperStyle,
}) => {
  const height = useSharedValue(0);

  const derivedHeight = useDerivedValue(() =>
    withTiming(height.value * Number(isExpanded.value), {
      duration,
    }),
  );
  const bodyStyle = useAnimatedStyle(() => ({
    height: derivedHeight.value,
  }));

  return (
    <Animated.View
      key={`accordionItem_${viewKey}`}
      style={[styles.animatedView, bodyStyle, style]}
    >
      <View
        onLayout={(e) => {
          height.value = e.nativeEvent.layout.height;
        }}
        style={[styles.wrapper, wrapperStyle]}
      >
        {children}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 24,
  },
  wrapper: {
    position: "absolute",
    alignItems: "stretch",
    gap: 10,
    width: "100%",
  },
  animatedView: {
    width: "100%",
    overflow: "hidden",
    flex: 1,
  },
});
