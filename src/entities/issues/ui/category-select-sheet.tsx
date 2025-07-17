import { useQuery } from "@tanstack/react-query";
import { useUnit } from "effector-react";
import {
  ActivityIndicator,
  LayoutAnimation,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ActionSheet, {
  ScrollView,
  SheetManager,
} from "react-native-actions-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors, Fonts } from "@/shared/styles/tokens";
import { getCategoriesList } from "../api/issuesApi";
import { IssuesItemCategory } from "../model/issuesApiSchema";
import { setSelectedCategory } from "../model/issuesCategorySelect.store";

export const CategorySelectSheet = () => {
  const setCategory = useUnit(setSelectedCategory);
  const insets = useSafeAreaInsets();

  const {
    data: categories,
    isLoading,
    refetch: refetchCategories,
  } = useQuery({
    queryKey: ["issues-categories"],
    queryFn: () => getCategoriesList({ isAcitve: true }),
  });

  const layoutAnimConfig = {
    duration: 300,
    update: {
      type: LayoutAnimation.Types.easeInEaseOut,
    },
    delete: {
      duration: 100,
      type: LayoutAnimation.Types.easeInEaseOut,
      property: LayoutAnimation.Properties.opacity,
    },
  };

  const onSelect = (item: IssuesItemCategory) => {
    setCategory({ selectedCategory: item });
    SheetManager.hide("issues-category");
    LayoutAnimation.configureNext(layoutAnimConfig);
  };

  return (
    <ActionSheet
      isModal={false}
      gestureEnabled
      containerStyle={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
      indicatorStyle={{
        display: "none",
      }}
    >
      <View style={styles.container}>
        {isLoading && <ActivityIndicator />}

        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={refetchCategories}
            />
          }
          showsVerticalScrollIndicator={false}
        >
          {categories && (
            <View style={styles.categoryContainer}>
              {categories.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.categoryItem}
                  onPress={() => onSelect(item)}
                >
                  <Text style={styles.categoryName}>{item.title.trim()}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    </ActionSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 25,
    paddingBottom: 32,
  },
  categoryContainer: {
    gap: 10,
  },
  categoryItem: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.graySeparator,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  categoryName: {
    textAlign: "center",
    fontFamily: Fonts.TRegular,
    fontSize: 15,
  },
});
