import { FC, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { PrivilegeCategorySchemaType } from "@/entities/privileges";
import { getIcon } from "@/entities/privileges/model/iconDictionary";
import { Colors, Fonts } from "@/shared/styles/tokens";
import { getDisplayTitle } from "../model/getDisplayTitle";
import { PrivilegesAccordionCard } from "./PrivilegesAccordionCard";

interface IPrivilegesAccordion {
  duration?: number;
  category: PrivilegeCategorySchemaType;
  selectedCategory: number;
  disabled: boolean;
}

export const PrivilegesAccordion: FC<IPrivilegesAccordion> = ({
  duration = 500,
  category,
  disabled,
  selectedCategory,
}) => {
  const [openAccordion, setOpenAccordion] = useState<boolean>(false);
  const open = useSharedValue(openAccordion);
  const onPressAccordion = () => {
    open.value = !open.value;
    setOpenAccordion((prev) => !prev);
  };
  const height = useSharedValue(0);

  const derivedHeight = useDerivedValue(() =>
    withTiming(height.value * Number(open.value), {
      duration,
    })
  );
  const bodyStyle = useAnimatedStyle(() => ({
    height: derivedHeight.value,
  }));

  const IconComponent = getIcon(category.image_name.toLowerCase());

  return (
    <Pressable
      style={[styles.btnContainer, disabled && styles.btnContainerDisabled]}
      onPress={onPressAccordion}
      disabled={disabled}
    >
      <View style={styles.visibleContainer}>
        <Text
          style={[
            styles.accordionBtn,
            openAccordion && styles.accordionBtnActive,
          ]}
        >
          {getDisplayTitle(selectedCategory, category)}
        </Text>
        <IconComponent color={Colors.redAccent} width={23} height={23} />
      </View>

      <Animated.View key={category.id} style={[styles.animatedView, bodyStyle]}>
        <View
          onLayout={(e) => {
            height.value = e.nativeEvent.layout.height;
          }}
          style={styles.wrapper}
        >
          {category.privilege_partners?.map((partner) => (
            <PrivilegesAccordionCard key={partner.id} partner={partner} />
          ))}
        </View>
      </Animated.View>
    </Pressable>
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
    marginTop: 12,
  },

  animatedView: {
    width: "100%",
    overflow: "hidden",
    flexGrow: 1,
  },
  accordionWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  accordionBtn: {
    fontFamily: Fonts.SFSemiBold,
    fontSize: 16,
    color: Colors.black,
  },
  accordionBtnActive: {
    color: Colors.redAccent,
  },
  btnContainer: {
    borderWidth: 1,
    borderColor: Colors.gray50,
    borderRadius: 15,
    paddingVertical: 12,
    justifyContent: "center",
  },
  btnContainerDisabled: {
    backgroundColor: Colors.grayIndicator,
    borderColor: Colors.grayIndicator,
  },
  visibleContainer: {
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
