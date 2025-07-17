import { useUnit } from "effector-react";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { SheetManager } from "react-native-actions-sheet";
import {
  $issuesCategorySelect,
  resetSelectedCategory,
} from "@/entities/issues";
import { LinearGradientButton, Select } from "@/shared/ui";
import {
  IssueFriendForm,
  IssueIdeasForm,
  IssueStandartForm,
} from "@/widgets/NewIssueForm";

const SendIssue = () => {
  const { selectedCategory } = useUnit($issuesCategorySelect);
  const handleSelect = () => {
    SheetManager.show("issues-category");
  };

  useEffect(() => {
    return () => resetSelectedCategory();
  }, []);

  return (
    <View style={styles.container}>
      <Select
        isRequired
        label="Выберите категорию"
        value={selectedCategory?.title.trim() || ""}
        onPress={handleSelect}
        style={{ marginBottom: 25 }}
      />
      {selectedCategory?.category_type.id === 1 && <IssueStandartForm />}
      {selectedCategory?.category_type.id === 2 && <IssueIdeasForm />}
      {selectedCategory?.category_type.id === 3 && <IssueFriendForm />}

      {!selectedCategory && (
        <LinearGradientButton text="Отправить заявку" disabled={true} />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 18,
  },
});

export default SendIssue;
