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
import {
  getOrganizationsList,
  IOrganizationItem,
} from "@/entities/organizations";
import { SearchInput } from "@/entities/search-input";
import { FilterColleaguesCard } from "@/features/FilterColleaguesCard";
import { Fonts } from "@/shared/styles/tokens";

export const OrganizationList = () => {
  const [searchValue, setSearchValue] = useState("");

  const { data, isLoading, fetchNextPage, hasNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ["colleagues-organizations", searchValue],
      queryFn: async ({ pageParam = 1 }) => {
        return getOrganizationsList({
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

  const organizations = data?.pages.flatMap((page) => page.items) || [];

  const handleSelectFilter = (item: IOrganizationItem) => {
    setColleaguesFilters({
      organization: {
        guid: item.guid,
        name: item.name,
      },
    });
    router.back();
  };
  const loadMoreOrganizations = () => {
    if (hasNextPage && organizations.length > 0) {
      fetchNextPage();
    }
  };

  const refetchOrganizationsFn = () => {
    if (organizations.length > 0) {
      refetch();
    }
  };

  const renderListEmptyComponent = () => (
    <Text style={styles.emptyListText}>Юридические лица не найдены</Text>
  );

  const renderItemSeparatorComponent = () => (
    <View style={styles.separatorWrapper}>
      <View style={styles.separator} />
    </View>
  );

  return (
    <View style={styles.container}>
      <SearchInput
        placeholder="Поиск по юр. лицам"
        setSearchValue={setSearchValue}
      />
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlashList
          data={organizations}
          onEndReached={loadMoreOrganizations}
          onEndReachedThreshold={0.5}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          keyExtractor={({ guid }) => guid.toString()}
          estimatedItemSize={20}
          refreshing={isLoading}
          onRefresh={refetchOrganizationsFn}
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
