import React, { FC, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import { IRadioItem } from "@/shared/types/types";
import { Input, IRadioGroupProps, RadioButton } from "@/shared/ui";

interface IPollsRadioGroupProps extends IRadioGroupProps {
  ownAnswerValue: string;
  setOwnAnswerValue: React.Dispatch<React.SetStateAction<string>>;
  selectedOwnVariant: boolean;
  setSelectedOwnVariant: React.Dispatch<React.SetStateAction<boolean>>;
}
export const PollsRadioGroupWithOwnVariant: FC<IPollsRadioGroupProps> = ({
  selectedOwnVariant,
  setSelectedOwnVariant,
  ownAnswerValue,
  setOwnAnswerValue,
  options,
  onValueChange,
  activeItem = null,
  withIcon = false,
  withLabelBorder = false,
  ...props
}) => {
  const [selectedRadioValue, setSelectedRadioValue] = useState<string | null>(
    activeItem,
  );

  const onChangeSelectedRadio = (option: IRadioItem) => {
    setSelectedRadioValue(option.value);
    if (onValueChange) {
      onValueChange(option);
    }
  };

  const height = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (selectedRadioValue === "ownVariant") {
      height.value = withTiming(100, { duration: 200 });
      opacity.value = withTiming(1, { duration: 200 });
      setSelectedOwnVariant(true);
    } else {
      height.value = withTiming(0, { duration: 200 });
      opacity.value = withTiming(0, { duration: 200 });
      setSelectedOwnVariant(false);
    }
  }, [selectedRadioValue]);

  return (
    <View {...props}>
      {options.map((option) => (
        <RadioButton
          key={option.value}
          label={option.label}
          selected={selectedRadioValue === option.value}
          onPress={() => onChangeSelectedRadio(option)}
          withIcon={withIcon}
          withLabelBorder={withLabelBorder}
        />
      ))}
      <Animated.View>
        <RadioButton
          key="ownVarinat"
          label="Свой вариант"
          selected={selectedRadioValue === "ownVariant"}
          onPress={() =>
            onChangeSelectedRadio({
              value: "ownVariant",
              label: "Свой вариант",
            })
          }
          withIcon={false}
          withLabelBorder={false}
        />
        <Animated.View style={{ height, opacity }}>
          <Input
            editable={selectedRadioValue === "ownVariant"}
            placeholder="Мой вариант..."
            style={styles.inputColor}
            containerStyle={[styles.inputContainer]}
            value={ownAnswerValue}
            onChangeText={setOwnAnswerValue}
          />
        </Animated.View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 17,
  },
  inputColor: {
    color: "#000",
  },
});
