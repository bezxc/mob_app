import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { getPrivilegesCategories } from "@/entities/privileges";
import { PrivilegesAccordion } from "@/entities/privileges-accordion";

interface IPrivilegesCategoriesTabProps {
  selectedCategory: number;
  currentCategory: number;
}

export const PrivilegesCategoriesTab: FC<IPrivilegesCategoriesTabProps> = ({
  selectedCategory,
  currentCategory,
}) => {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["privileges-categories", { selectedCategory }],
    queryFn: () => getPrivilegesCategories(selectedCategory),
  });

  return (
    <View>
      {!categories && isLoading && <ActivityIndicator />}

      {categories && (
        <View style={styles.categories}>
          {categories.map((cat) => (
            <PrivilegesAccordion
              key={cat.id + Math.random()}
              category={cat}
              selectedCategory={selectedCategory}
              disabled={selectedCategory !== currentCategory}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  categories: {
    gap: 15,
  },
});
