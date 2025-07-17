import { FlashList } from "@shopify/flash-list";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useUnit } from "effector-react";
import { useState } from "react";
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SearchInput } from "@/entities/search-input";
import { $vacanciesFilter, getAllVacancies } from "@/entities/vacancies";
import { VacanciesListCard } from "@/entities/vacancies-list-card";
import { Colors, Fonts } from "@/shared/styles/tokens";

export const VacanciesList = () => {
  const [searchValue, setSearchValue] = useState("");

  const { applyFilter } = useUnit($vacanciesFilter);

  const { data, isLoading, fetchNextPage, hasNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ["vacancies", applyFilter, searchValue],
      queryFn: async ({ pageParam = 1 }) => {
        return getAllVacancies({
          size: 10,
          page: pageParam,
          is_active: true,
          order_by: "-publication_date",
          position_name__ilike: searchValue,
          ...applyFilter,
        });
      },
      getNextPageParam: (lastPage) => {
        if (lastPage.page < lastPage.pages) {
          return lastPage.page + 1;
        }
        return undefined;
      },
      initialPageParam: 1,
    });

  const vacancies = data?.pages.flatMap((page) => page.items) || [];

  const loadMoreVacancies = () => {
    if (hasNextPage && vacancies.length > 0) {
      fetchNextPage();
    }
  };

  const refetchVacanciesFn = () => {
    if (vacancies.length > 0) {
      refetch();
    }
  };

  const renderListEmptyComponent = () => (
    <Text style={styles.emptyListText}>Вакансии не найдены</Text>
  );
  return (
    <View style={styles.container}>
      <SearchInput placeholder="Поиск" setSearchValue={setSearchValue} />
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlashList
          data={vacancies}
          showsVerticalScrollIndicator={false}
          onEndReached={loadMoreVacancies}
          onEndReachedThreshold={0.5}
          contentContainerStyle={styles.contentContainer}
          estimatedItemSize={90}
          keyExtractor={({ guid }) => String(guid)}
          refreshing={isLoading}
          onRefresh={refetchVacanciesFn}
          ListEmptyComponent={renderListEmptyComponent}
          renderItem={({ item }) => <VacanciesListCard item={item} />}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 12,
    marginTop: 20,
  },
  emptyListText: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: Fonts.TRegular,
  },
  contentContainer: {
    paddingHorizontal: 18,
    paddingBottom: Platform.OS === "ios" ? 64 : 32,
  },
  filterButton: {
    borderWidth: 1,
    borderColor: Colors.grayStroke,
    borderRadius: 14,
    marginBottom: 20,
  },
  filterInner: {
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  filterText: {
    fontFamily: Fonts.TRegular,
    color: Colors.redAccent,
    fontSize: 12,
    lineHeight: 12,
  },
  selectedFiltesContainer: {
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
  },
  selectedFilters: {
    backgroundColor: Colors.redAccent,
    width: 5,
    height: 5,
    borderRadius: 2.5,
  },
});
