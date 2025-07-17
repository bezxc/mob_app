import React, { FC, useEffect, useState } from "react";
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewProps,
} from "react-native";
import { CheckMarkIcon } from "@/shared/assets/icons";
import { Colors, Fonts } from "@/shared/styles/tokens";
import { IRadioItem as ICheckboxItem } from "@/shared/types/types";

interface ICheckboxButtonProps extends TouchableOpacityProps {
  selected: boolean | null;
  label: string;
  onPress: (event: GestureResponderEvent) => void;
  withLabelBorder: boolean;
}

export const CheckboxButton: FC<ICheckboxButtonProps> = ({
  selected,
  onPress,
  label,
  withLabelBorder,
  ...props
}) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      {...props}
      onPress={onPress}
      style={[
        styles.checkboxButton,
        withLabelBorder && styles.checkboxButtonWithBorder,
      ]}
    >
      <View
        style={[
          styles.checkboxButtonIcon,
          selected && styles.checkboxButtonSelected,
        ]}
      >
        <CheckMarkIcon />
      </View>
      <View style={styles.labelWrapper}>
        <Text
          style={[
            styles.checkboxButtonLabel,
            selected && styles.checkboxButtonLabelSelected,
            withLabelBorder && styles.checkboxButtonLabelWithBorder,
          ]}
        >
          {label}
        </Text>
        {withLabelBorder && <View style={styles.checkboxButtonLabelBorder} />}
      </View>
    </TouchableOpacity>
  );
};

interface ICheckboxGroupProps extends ViewProps {
  options: ICheckboxItem[];
  activeItem?: string;
  withLabelBorder?: boolean;
  onValueChange?: (arg: ICheckboxItem[]) => void;
  withOwnVariant?: boolean;
  activeItems?: ICheckboxItem[];
}
export const CheckboxGroup: FC<ICheckboxGroupProps> = ({
  options,
  onValueChange,
  withLabelBorder = false,
  withOwnVariant = false,
  activeItems = [],
  ...props
}) => {
  const [selectedCheckboxValues, setSelectedCheckboxValues] =
    useState<ICheckboxItem[]>(activeItems);

  const onChangeSelectedCheckbox = (option: ICheckboxItem) => {
    setSelectedCheckboxValues((prev) =>
      prev.find((item) => item.value === option.value)
        ? prev.filter((item) => item.value !== option.value)
        : [...prev, option]
    );
  };

  useEffect(() => {
    if (onValueChange) {
      onValueChange(selectedCheckboxValues);
    }
  }, [selectedCheckboxValues]);

  return (
    <View {...props}>
      {options.map((option, index) => (
        <CheckboxButton
          key={option.value}
          label={option.label}
          selected={
            Boolean(
              selectedCheckboxValues.find((item) => item.value === option.value)
            ) || false
          }
          onPress={() => onChangeSelectedCheckbox(option)}
          withLabelBorder={
            withLabelBorder && (index !== options.length - 1 || withOwnVariant)
          }
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  checkboxButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  checkboxButtonWithBorder: {
    alignItems: "flex-start",
  },
  checkboxButtonIcon: {
    height: 17,
    width: 17,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.grayStroke,
  },
  checkboxButtonSelected: {
    backgroundColor: Colors.redAccent,
    borderColor: Colors.redAccent,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxButtonSelectedInner: {
    width: 10,
    height: 10,
    backgroundColor: Colors.white,
    borderRadius: 10,
  },
  checkboxButtonLabel: {
    fontFamily: Fonts.TRegular,
    fontSize: 14,
    color: Colors.grayText,
  },
  checkboxButtonLabelSelected: {
    color: Colors.black,
  },
  labelWrapper: { gap: 11, flexGrow: 1, flexShrink: 1 },
  checkboxButtonLabelWithBorder: {
    position: "relative",
    top: -1,
    flexGrow: 1,
  },
  checkboxButtonLabelBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.grayStroke,
  },
});
