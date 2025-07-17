import React, { FC, useState } from "react";
import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewProps,
} from "react-native";
import { CheckMarkIcon } from "@/shared/assets/icons";
import { Colors, Fonts } from "@/shared/styles/tokens";
import { IRadioItem } from "@/shared/types/types";

export interface IRadioButtonProps extends TouchableOpacityProps {
  selected: boolean | null;
  label: string;
  onPress: (event: GestureResponderEvent) => void;
  withIcon: boolean;
  withLabelBorder: boolean;
  disableOnSelect?: boolean;
  radioButtonLabelStyle?: StyleProp<TextStyle>;
}

export const RadioButton: FC<IRadioButtonProps> = ({
  selected,
  onPress,
  label,
  withIcon,
  withLabelBorder,
  disableOnSelect = true,
  radioButtonLabelStyle,
  ...props
}) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      {...props}
      disabled={disableOnSelect && Boolean(selected)}
      onPress={onPress}
      style={[
        styles.radioButton,
        withLabelBorder && styles.radioButtonWithBorder,
      ]}
    >
      <View
        style={[styles.radioButtonIcon, selected && styles.radioButtonSelected]}
      >
        {withIcon ? (
          <CheckMarkIcon />
        ) : (
          <View style={styles.radioButtonSelectedInner} />
        )}
      </View>
      <View style={styles.labelWrapper}>
        <Text
          style={[
            styles.radioButtonLabel,
            selected && styles.radioButtonLabelSelected,
            withLabelBorder && styles.radioButtonLabelWithBorder,
            radioButtonLabelStyle,
          ]}
        >
          {label}
        </Text>
        {withLabelBorder && <View style={styles.radioButtonLabelBorder} />}
      </View>
    </TouchableOpacity>
  );
};

export interface IRadioGroupProps extends ViewProps {
  options: IRadioItem[];
  withIcon?: boolean;
  activeItem?: string;
  withLabelBorder?: boolean;
  onValueChange?: (arg: IRadioItem) => void;
}
export const RadioGroup: FC<IRadioGroupProps> = ({
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

  return (
    <View {...props}>
      {options.map((option, index, array) => (
        <RadioButton
          key={option.value}
          label={option.label}
          selected={selectedRadioValue === option.value}
          onPress={() => onChangeSelectedRadio(option)}
          withIcon={withIcon}
          withLabelBorder={withLabelBorder && array.length - 1 !== index}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  radioButtonWithBorder: {
    alignItems: "flex-start",
  },
  radioButtonIcon: {
    height: 17,
    width: 17,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.grayStroke,
  },
  radioButtonSelected: {
    backgroundColor: Colors.redAccent,
    borderColor: Colors.redAccent,
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonSelectedInner: {
    width: 10,
    height: 10,
    backgroundColor: Colors.white,
    borderRadius: 10,
  },
  radioButtonLabel: {
    fontFamily: Fonts.TRegular,
    fontSize: 14,
    color: Colors.grayText,
  },
  radioButtonLabelSelected: {
    color: Colors.black,
  },
  labelWrapper: { gap: 11, flexGrow: 1 },
  radioButtonLabelWithBorder: {
    position: "relative",
    top: -1,
    flexGrow: 1,
  },
  radioButtonLabelBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.grayStroke,
  },
});
