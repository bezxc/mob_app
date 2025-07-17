import { useActionSheet } from "@expo/react-native-action-sheet";
import { StatusBar } from "expo-status-bar";
import React, { FC } from "react";
import { FieldPath, FieldValues, useController } from "react-hook-form";
import { Platform, StyleSheet } from "react-native";
import { Colors } from "@/shared/styles/tokens";
import { ISelectItem } from "@/shared/types/types";
import { actionSheetStyles, CompactSelect, ISelectProps } from "@/shared/ui";

interface IControlledSelectProps extends Omit<ISelectProps, "value"> {
  options: ISelectItem[];
}
type TControlledSelectField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
} & IControlledSelectProps;

export const CompactControlledSelect: FC<TControlledSelectField> = ({
  options,
  name,
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
          onChange(selectedOption);
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
      <CompactSelect
        {...props}
        {...otherField}
        value={value?.label || ""}
        style={[props.style]}
        selectedColor={error && styles.selectError}
        onPress={onOpenActionSheet}
      />
    </>
  );
};

const styles = StyleSheet.create({
  selectError: {
    borderColor: Colors.redAccent,
    borderWidth: 1,
  },
  ...actionSheetStyles,
});
