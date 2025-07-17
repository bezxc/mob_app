import { useActionSheet } from "@expo/react-native-action-sheet";
import { StatusBar } from "expo-status-bar";
import { FC } from "react";
import { FieldPath, FieldValues, useController } from "react-hook-form";
import { Platform, StyleSheet } from "react-native";
import { Colors } from "@/shared/styles/tokens";
import { ISelectItem } from "@/shared/types/types";
import { actionSheetStyles, ISelectProps, Select } from "@/shared/ui";

interface IControlledSelectProps extends Omit<ISelectProps, "value"> {
  options: ISelectItem[];
}

type TControlledSelectField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
  onCustomChange?: (value: string | boolean) => void;
} & IControlledSelectProps;

export const ControlledSelect: FC<TControlledSelectField> = ({
  options,
  name,
  onCustomChange,
  ...props
}) => {
  const { showActionSheetWithOptions } = useActionSheet();
  const {
    fieldState: { error },
    field: { onChange, value, ...otherField },
  } = useController({
    name,
  });

  const onOpenActionSheet = () => {
    const selectOptions = options.map((option) => option.label);
    selectOptions.push("Закрыть");

    const cancelButtonIndex = selectOptions.length - 1;

    showActionSheetWithOptions(
      {
        options: selectOptions,
        cancelButtonIndex,
        cancelButtonTintColor: Colors.redAccent,
        containerStyle: styles.actionSheetContainerStyle,
        showSeparators: true,
        separatorStyle: styles.actionSheetSeparatorStyle,
        textStyle: styles.actionSheetTextStyle,
      },
      (buttonIndex) => {
        if (
          typeof buttonIndex === "number" &&
          buttonIndex !== cancelButtonIndex
        ) {
          const selectedOption = options[buttonIndex];
          onChange(selectedOption.value);
          onCustomChange?.(selectedOption.value);
        }
      },
    );
  };

  return (
    <>
      <StatusBar
        style={Platform.OS === "android" ? "auto" : "dark"}
        backgroundColor="transparent"
      />
      <Select
        {...props}
        {...otherField}
        value={options.find((option) => option.value === value)?.label || ""}
        style={[props.style, error && styles.selectError]}
        onPress={onOpenActionSheet}
      />
    </>
  );
};

const styles = StyleSheet.create({
  selectError: {
    borderColor: Colors.redAccent,
  },
  ...actionSheetStyles,
});
