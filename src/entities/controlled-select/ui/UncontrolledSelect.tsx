import { useActionSheet } from "@expo/react-native-action-sheet";
import { StatusBar } from "expo-status-bar";
import { FC } from "react";
import { Platform, StyleSheet } from "react-native";
import { Colors } from "@/shared/styles/tokens";
import { ISelectItem } from "@/shared/types/types";
import { actionSheetStyles, ISelectProps, Select } from "@/shared/ui";

interface IControlledSelectProps extends Omit<ISelectProps, "value"> {
  options: ISelectItem[];
  onChange: (value: ISelectItem) => void;
  value: string;
}

export const UncontrolledSelect: FC<IControlledSelectProps> = ({
  options,
  onChange,
  value,
  ...props
}) => {
  const { showActionSheetWithOptions } = useActionSheet();

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
      <Select
        {...props}
        value={value}
        label="Выберите значение"
        style={[props.style]}
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
