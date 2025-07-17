import { FlashList } from "@shopify/flash-list";
import { useInfiniteQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { UsersRound } from "lucide-react-native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SearchInput } from "@/entities/search-input";
import { getAllVacancies, setVacanciesFilters } from "@/entities/vacancies";
import { Colors, Fonts } from "@/shared/styles/tokens";

export const VacanciesPositionFilterList = () => {
  const [searchValue, setSearchValue] = useState("");

  const { data, isLoading, fetchNextPage, hasNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ["vacancies-position-filters", searchValue],
      queryFn: async ({ pageParam = 1 }) => {
        return getAllVacancies({
          size: 10,
          page: pageParam,
          position_name__ilike: searchValue,
          is_active: true,
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

  const handleSelectFilter = ({
    guid,
    positionName,
  }: {
    guid: string;
    positionName: string;
  }) => {
    setVacanciesFilters({
      position: { guid, positionName },
    });
    router.back();
  };

  const renderListEmptyComponent = () => (
    <Text style={styles.emptyListText}>Данные не найдены</Text>
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
            <>
              <TouchableOpacity
                style={styles.container}
                onPress={() =>
                  handleSelectFilter({
                    guid: item.position_guid,
                    positionName: item.position_name,
                  })
                }
              >
                <View style={styles.title}>
                  <View style={styles.icon}>
                    <UsersRound
                      size={24}
                      strokeWidth={1}
                      color={Colors.redAccent}
                    />
                  </View>
                  <Text style={styles.positionTitle}>{item.position_name}</Text>
                </View>
              </TouchableOpacity>
            </>
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
    paddingBottom: Platform.OS === "ios" ? 64 : 32,
    paddingHorizontal: 18,
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

  title: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  icon: {
    backgroundColor: Colors.grayLight,
    padding: 5,
    borderRadius: 10,
  },
  positionTitle: {
    flexShrink: 1,
  },
});
