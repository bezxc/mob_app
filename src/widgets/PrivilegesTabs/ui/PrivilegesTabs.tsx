import React, { FC, useState } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import Svg, { Defs, Line, LinearGradient, Stop } from "react-native-svg";
import { PrivilegesCategoriesTab } from "@/features/PrivilegesCategoriesTab";
import { Colors, Fonts } from "@/shared/styles/tokens";

interface LineSVGProps {
  style?: StyleProp<ViewStyle>;
  color?: string;
  width?: number;
  height?: number;
  filled?: boolean;
}

export const LineSVG: React.FC<LineSVGProps> = ({
  style,
  width,
  height = 4,
  filled = false,
}) => {
  return (
    <Svg width={width} height={height} style={style}>
      <Defs>
        <LinearGradient id="halfGradient" x1="0" y1="0" x2="1" y2="0">
          <Stop
            offset="50%"
            stopColor={filled ? Colors.redAccent : Colors.gray30}
          />
          <Stop offset="50%" stopColor={Colors.gray30} />
        </LinearGradient>
      </Defs>
      <Line
        x1="0"
        y1={height / 2}
        x2={width}
        y2={height / 2}
        stroke="url(#halfGradient)"
        strokeWidth={height}
      />
    </Svg>
  );
};

interface IPrivilegesTabsProps {
  currentCategory: number;
}

export const PrivilegesTabs: FC<IPrivilegesTabsProps> = ({
  currentCategory,
}) => {
  const [selectedTab, setSelectedTab] = useState<number>(currentCategory);

  const steps = [1, 2, 3, 4];

  return (
    <View style={styles.container}>
      <View style={styles.stepper}>
        {steps.map((step, index) => {
          const isActive = step === selectedTab;
          const isCurrent = step === currentCategory;
          return (
            <View key={step} style={[styles.stepContainer]}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setSelectedTab(step)}
                disabled={step < currentCategory}
              >
                <View
                  style={[
                    styles.step,
                    isActive && styles.stepActive,
                    isCurrent && styles.stepCurrent,
                  ]}
                >
                  <Text
                    style={[
                      styles.stepText,
                      isActive && styles.stepTextActive,
                      !isActive && isCurrent && styles.stepTextCurrent,
                    ]}
                  >
                    {step}
                  </Text>
                </View>
              </TouchableOpacity>

              {index !== steps.length - 1 && (
                <LineSVG
                  style={styles.line}
                  width={36}
                  color={Colors.gray30}
                  filled={isActive && isCurrent}
                />
              )}
            </View>
          );
        })}
      </View>
      <Text style={styles.title}>Категории программы</Text>
      <View style={styles.categoriesContainer}>
        <PrivilegesCategoriesTab
          selectedCategory={selectedTab}
          currentCategory={currentCategory}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontFamily: Fonts.TBold,
    fontSize: 18,
    textAlign: "center",
  },
  stepper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  stepContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  step: {
    width: 36,
    height: 36,
    borderRadius: 36,
    backgroundColor: Colors.gray30,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 15,
  },
  stepActive: {
    backgroundColor: Colors.redAccent,
    borderRadius: 36,
  },
  stepCurrent: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  stepText: {
    fontFamily: Fonts.SFSemiBold,
    fontSize: 20,
    color: Colors.black,
  },
  stepTextActive: {
    fontSize: 24,
    color: Colors.white,
  },
  stepTextCurrent: {
    color: Colors.redAccent,
  },
  line: {
    backgroundColor: Colors.gray30,
  },

  tabContent: {
    fontSize: 16,
    textAlign: "center",
  },

  categoriesContainer: {
    marginTop: 12,
  },
});
