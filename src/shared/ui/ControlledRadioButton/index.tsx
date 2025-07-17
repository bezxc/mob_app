import { FC } from "react";
import { FieldPath, FieldValues, useController } from "react-hook-form";
import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Colors, Fonts } from "@/shared/styles/tokens";

export interface IControlledRadioButtonProps extends PressableProps {
  label: string;
  onCustomChange?: (value: boolean) => void;
}

type TRadioField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
} & IControlledRadioButtonProps;

export const ControlledRadioButton: FC<TRadioField> = ({
  label,
  name,
  onCustomChange,
  ...props
}) => {
  const {
    fieldState: { error },
    field: { onChange, value, disabled },
  } = useController({
    name,
  });
  return (
    <Pressable
      {...props}
      disabled={disabled}
      onPress={() => {
        onChange((val: boolean) => !val);
        onCustomChange?.(!value);
      }}
      style={[styles.radioButton, error && styles.error]}
    >
      <View style={styles.labelWrapper}>
        <Text
          style={[styles.radioButtonLabel, styles.radioButtonLabelWithBorder]}
        >
          {label}
        </Text>
      </View>
      <View
        style={[styles.radioButtonIcon, value && styles.radioButtonSelected]}
      >
        <View style={styles.radioButtonSelectedInner} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingLeft: 20,
    paddingRight: 25,
    paddingVertical: 14,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: Colors.gray30,
  },
  radioButtonIcon: {
    height: 17,
    width: 17,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.grayStroke,
  },
  error: {
    borderColor: Colors.redAccent,
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
    fontSize: 12,
    color: Colors.grayText,
  },
  labelWrapper: { gap: 11, flexGrow: 1, flexShrink: 1 },
  radioButtonLabelWithBorder: {
    position: "relative",
    top: -1,
    flexGrow: 1,
    color: Colors.black,
  },
});
