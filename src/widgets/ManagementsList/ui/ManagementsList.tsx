import { FlashList } from "@shopify/flash-list";
import { useInfiniteQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { setColleaguesFilters } from "@/entities/colleagues";
import { getManagementsList, IManagementItem } from "@/entities/managements";
import { SearchInput } from "@/entities/search-input";
import { FilterColleaguesCard } from "@/features/FilterColleaguesCard";
import { Fonts } from "@/shared/styles/tokens";

export const ManagementsList = () => {
  const [searchValue, setSearchValue] = useState("");

  const { data, isLoading, fetchNextPage, hasNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ["colleagues-managements", searchValue],
      queryFn: async ({ pageParam = 1 }) => {
        return getManagementsList({
          size: 10,
          page: pageParam,
          name__ilike: searchValue,
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

  const managements = data?.pages.flatMap((page) => page.items) || [];

  const handleSelectFilter = (item: IManagementItem) => {
    setColleaguesFilters({
      management: {
        guid: item.guid,
        name: item.name,
      },
    });
    router.back();
  };

  const loadMoreManagements = () => {
    if (hasNextPage && managements.length > 0) {
      fetchNextPage();
    }
  };

  const refetchManagementsFn = () => {
    if (managements.length > 0) {
      refetch();
    }
  };

  const renderListEmptyComponent = () => (
    <Text style={styles.emptyListText}>
      Управленческие подразделения не найдены
    </Text>
  );

  const renderItemSeparatorComponent = () => (
    <View style={styles.separatorWrapper}>
      <View style={styles.separator} />
    </View>
  );

  return (
    <View style={styles.container}>
      <SearchInput
        placeholder="Поиск по управленческим подразделениям"
        setSearchValue={setSearchValue}
      />
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlashList
          data={managements}
          onEndReached={loadMoreManagements}
          onEndReachedThreshold={0.5}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          keyExtractor={({ guid }) => guid.toString()}
          estimatedItemSize={20}
          refreshing={isLoading}
          onRefresh={refetchManagementsFn}
          ListEmptyComponent={renderListEmptyComponent}
          ItemSeparatorComponent={renderItemSeparatorComponent}
          renderItem={({ item }) => (
            <FilterColleaguesCard
              name={item.name}
              onPress={() => {
                handleSelectFilter(item);
              }}
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 12,
  },
  contentContainer: {
    paddingHorizontal: 18,
    paddingBottom: Platform.OS === "ios" ? 64 : 32,
  },
  emptyListText: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: Fonts.TRegular,
  },
  separatorWrapper: { height: 16, width: "100%", justifyContent: "center" },
  separator: {
    height: 1,
    backgroundColor: "#E8E8E8",
    width: "100%",
  },
});
