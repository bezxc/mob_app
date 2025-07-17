import { FC } from "react";
import { useController } from "react-hook-form";
import { StyleSheet } from "react-native";
import { SheetManager } from "react-native-actions-sheet";
import { Colors } from "@/shared/styles/tokens";
import { Select } from "@/shared/ui";

interface IIssuesCategorySelectProps {
  name: string;
}
export const IssuesCategorySelect: FC<IIssuesCategorySelectProps> = ({
  name,
}) => {
  const {
    fieldState: { error },
    field: { onChange, value, ...otherField },
  } = useController({
    name,
  });
  const handleSelect = () => {
    SheetManager.show("issues-category", {
      payload: {
        onChange,
      },
    });
  };
  return (
    <Select
      {...otherField}
      label="Выберите категорию"
      value={value?.title || ""}
      onPress={handleSelect}
      style={[error && styles.selectError]}
    />
  );
};
const styles = StyleSheet.create({
  selectError: {
    borderColor: Colors.redAccent,
  },
});
