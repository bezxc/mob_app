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
import { getPositionsList, IPositionitem } from "@/entities/positions";
import { SearchInput } from "@/entities/search-input";
import { FilterColleaguesCard } from "@/features/FilterColleaguesCard";
import { Fonts } from "@/shared/styles/tokens";

export const PositionsList = () => {
  const [searchValue, setSearchValue] = useState("");

  const { data, isLoading, fetchNextPage, hasNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ["colleagues-positions", searchValue],
      queryFn: async ({ pageParam = 1 }) => {
        return getPositionsList({
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

  const positions = data?.pages.flatMap((page) => page.items) || [];

  const loadMorePositions = () => {
    if (hasNextPage && positions.length > 0) {
      fetchNextPage();
    }
  };

  const refetchPositionsFn = () => {
    if (positions.length > 0) {
      refetch();
    }
  };

  const handleSelectFilter = (item: IPositionitem) => {
    setColleaguesFilters({
      position: item,
    });
    router.back();
  };

  const renderListEmptyComponent = () => (
    <Text style={styles.emptyListText}>Позиции не найдены</Text>
  );

  const renderItemSeparatorComponent = () => (
    <View style={styles.separatorWrapper}>
      <View style={styles.separator} />
    </View>
  );

  return (
    <View style={styles.container}>
      <SearchInput
        placeholder="Поиск по позициям"
        setSearchValue={setSearchValue}
      />
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlashList
          data={positions}
          onEndReached={loadMorePositions}
          onEndReachedThreshold={0.5}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          keyExtractor={({ guid }) => guid.toString()}
          estimatedItemSize={20}
          refreshing={isLoading}
          onRefresh={refetchPositionsFn}
          ListEmptyComponent={renderListEmptyComponent}
          ItemSeparatorComponent={renderItemSeparatorComponent}
          renderItem={({ item }) => (
            <FilterColleaguesCard
              onPress={() => handleSelectFilter(item)}
              name={item.name}
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
  separatorWrapper: {
    height: 16,
    width: "100%",
    justifyContent: "center",
  },
  separator: {
    height: 1,
    backgroundColor: "#E8E8E8",
    width: "100%",
  },
});
