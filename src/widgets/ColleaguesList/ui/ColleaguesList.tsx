import { FlashList } from "@shopify/flash-list";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useUnit } from "effector-react";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  $colleaguesFilters,
  ColleaguesBirthdayButton,
  getColleaguesListV2,
} from "@/entities/colleagues";
import { SearchInput } from "@/entities/search-input";
import { ColleaguesCard } from "@/features/ColleaguesCard";
import { Fonts } from "@/shared/styles/tokens";
import { useColleaguesInitActions } from "../model/useColleaguesInitActions";

export const ColleaguesList = () => {
  const [searchValue, setSearchValue] = useState("");
  const { applyFilter } = useUnit($colleaguesFilters);

  const { onPressAction } = useColleaguesInitActions();

  const { data, isLoading, fetchNextPage, hasNextPage, refetch } =
    useInfiniteQuery({
      queryKey: [
        "colleagues",
        searchValue,
        { applyFilter: applyFilter?.length ? applyFilter : null },
      ],
      queryFn: async ({ pageParam = 1 }) => {
        const filters = applyFilter?.length
          ? applyFilter.reduce(
              (acc, [key, value]) => ({ ...acc, [key]: value }),
              {},
            )
          : {};

        const isPhoneSearch = /^[+]?[\d\s\-()]+$/.test(searchValue);
        const searchField = isPhoneSearch
          ? {
              home_phone__ilike: searchValue,
              internal_phone__ilike: searchValue,
              work_phone__ilike: searchValue,
            }
          : {
              full_name__ilike: searchValue,
            };

        return getColleaguesListV2({
          size: 10,
          page: pageParam,
          order_by: "+full_name",
          type_of_event__not_in: "Увольнение",
          ...searchField,
          ...filters,
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

  const colleagues = data?.pages.flatMap((page) => page.items) || [];

  const loadMoreColleagues = () => {
    if (hasNextPage && colleagues.length > 0) {
      fetchNextPage();
    }
  };

  const refetchColleaguesFn = () => {
    if (colleagues.length > 0) {
      refetch();
    }
  };

  const renderListEmptyComponent = () => (
    <Text style={styles.emptyListText}>Коллеги не найдены</Text>
  );

  return (
    <View style={styles.container}>
      <ColleaguesBirthdayButton
        onPress={() => router.push("/(withoutTabs)/colleaguesBirthdayPage")}
        style={styles.birthdayButton}
      />
      <SearchInput
        setSearchValue={setSearchValue}
        placeholder="Поиск по ФИО и номеру телефона"
      />
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlashList
          data={colleagues}
          onEndReached={loadMoreColleagues}
          onEndReachedThreshold={0.5}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          keyExtractor={({ kan_uid }) => String(kan_uid)}
          estimatedItemSize={20}
          refreshing={isLoading}
          onRefresh={refetchColleaguesFn}
          ListEmptyComponent={renderListEmptyComponent}
          renderItem={({ item }) => (
            <ColleaguesCard
              kan_uid={String(item.kan_uid)}
              name={item.full_name}
              position={item.position.name}
              onPress={() => onPressAction({ kan_uid: item.kan_uid })}
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, gap: 16 },
  birthdayButton: {
    paddingHorizontal: 18,
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
});
