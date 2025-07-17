import { FlashList } from "@shopify/flash-list";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useUnit } from "effector-react";
import { router } from "expo-router";
import { FileText, SlidersHorizontal } from "lucide-react-native";
import { FC, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { $auth } from "@/shared/api/auth.store";
import { Colors, Fonts } from "@/shared/styles/tokens";
import { getEdoDocsByUserGuid } from "../api";
import { $edoDocsFilters } from "../model/edoFilter.store";
import { EdoDocCard } from "./edo-doc-card";
import { EdoSearchInput } from "./edo-search-input";

interface IEdoPageProps {
  is_controlled?: boolean;
  is_acquainted?: boolean;
  is_executed?: boolean;
}
export const EdoTab: FC<IEdoPageProps> = ({
  is_controlled,
  is_acquainted,
  is_executed,
}) => {
  const { kanUid } = useUnit($auth);
  const [searchValue, setSearchValue] = useState<string>("");
  const { applyFilter } = useUnit($edoDocsFilters);

  const { data, isLoading, fetchNextPage, hasNextPage, refetch } =
    useInfiniteQuery({
      queryKey: [
        "edo-docs",
        searchValue,
        is_controlled,
        is_acquainted,
        is_executed,
        { ...applyFilter },
      ],
      queryFn: async ({ pageParam = 1 }) => {
        const filters = applyFilter?.length
          ? applyFilter.reduce(
              (acc, [key, value]) => ({ ...acc, [key]: value }),
              {}
            )
          : null;

        return getEdoDocsByUserGuid({
          size: 15,
          page: pageParam,
          kan_uid: kanUid as string,
          is_acquainted,
          is_controlled,
          is_executed,
          name__ilike: searchValue,
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

  const docs = data?.pages.flatMap((page) => page.items) || [];

  const sortedDocsByDate = [...docs].sort((a, b) => {
    const dateA = new Date(a.publication_date);
    const dateB = new Date(b.publication_date);
    return dateB.getTime() - dateA.getTime();
  });

  const sortedDocs = [...sortedDocsByDate].sort((a, b) => {
    if (a.was_read === b.was_read) return 0;
    return a.was_read ? 1 : -1;
  });

  const loadMoreDocs = () => {
    if (hasNextPage && docs.length > 0) {
      fetchNextPage();
    }
  };

  const refetchDocsFn = () => {
    if (docs.length > 0) {
      refetch();
    }
  };

  return (
    <View style={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <EdoSearchInput
            setSearchValue={(text) => setSearchValue(text)}
            placeholder="Поиск по названию и №"
          />
        </View>
        <TouchableOpacity
          style={[styles.filterButton]}
          onPress={() => router.push(`/(withoutTabs)/edoDocumentsFilters`)}
        >
          <Text style={styles.filterText}>Фильтр</Text>
          <SlidersHorizontal size={15} color={Colors.redAccent} />
        </TouchableOpacity>
      </View>

      <FlashList
        data={sortedDocs}
        onEndReached={loadMoreDocs}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        onRefresh={refetchDocsFn}
        keyExtractor={({ doc_key }) => doc_key}
        estimatedItemSize={73}
        overrideProps={{
          contentContainerStyle: docs.length === 0 && styles.emptyList,
        }}
        ListEmptyComponent={() => (
          <View style={styles.emptyListContainer}>
            <FileText size={45} color={Colors.redAccent} />
            <Text style={styles.emptyListText}>Нет данных по приказам</Text>
          </View>
        )}
        refreshing={isLoading}
        renderItem={({ item }) => <EdoDocCard {...item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "space-between",
    marginTop: 10,
    gap: 10,
  },
  searchContainer: {
    flexGrow: 1,
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyListContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },
  emptyListText: {
    fontFamily: Fonts.TBold,
    fontSize: 16,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: Colors.redAccent,
    borderRadius: 8,
    backgroundColor: "white",
  },
  filterText: {
    color: Colors.redAccent,
    fontSize: 12,
    fontFamily: Fonts.SFSemiBold,
    marginRight: 5,
  },
});
