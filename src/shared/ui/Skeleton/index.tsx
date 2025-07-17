import { LinearGradient } from "expo-linear-gradient";
import React, { FC, PropsWithChildren, useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import { Colors } from "@/shared/styles/tokens";

interface ISkeletonProps extends ViewProps {
  isLoading: boolean;
}

export const Skeleton: FC<PropsWithChildren<ISkeletonProps>> = ({
  children,
  style,
}) => {
  const shimmerValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const shimmerAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerValue, {
          toValue: 1,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerValue, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ]),
    );
    shimmerAnimation.start();
    return () => shimmerAnimation.stop();
  }, [shimmerValue]);

  const translateX = shimmerValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-300, 300],
  });

  return (
    <View style={[styles.skeletonContainer, style]}>
      {children}
      <Animated.View
        style={[
          styles.shimmerOverlay,
          {
            transform: [{ translateX }],
          },
        ]}
      >
        <LinearGradient
          colors={["#f0f0f0", "#e0e0e0", "#f0f0f0"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.linearGradient}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "#333",
  },
  skeletonContainer: {
    position: "relative",
    backgroundColor: Colors.graySeparator,
    overflow: "hidden",
  },

  shimmerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
  },
  linearGradient: {
    flex: 1,
    width: "200%",
  },
  skeleton: {
    height: 100,
    width: 100,
    padding: 6,
    borderRadius: 20,
    justifyContent: "flex-end",
  },
});
