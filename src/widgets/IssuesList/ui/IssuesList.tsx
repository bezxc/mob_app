import { FlashList } from "@shopify/flash-list";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useUnit } from "effector-react";
import { router } from "expo-router";
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { $issuesFilter, getUserIssuesList } from "@/entities/issues";
import { IssuesCard } from "@/entities/issues-card";
import { $auth } from "@/shared/api/auth.store";
import { Colors, Fonts } from "@/shared/styles/tokens";

export const IssuesList = () => {
  const { kanUid } = useUnit($auth);

  const { applyFilter } = useUnit($issuesFilter);

  const { data, isLoading, fetchNextPage, hasNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ["issues", applyFilter],
      queryFn: async ({ pageParam = 1 }) => {
        return getUserIssuesList({
          size: 10,
          page: pageParam,
          author_kan_uid: kanUid,
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

  const issues = data?.pages.flatMap((page) => page.items) || [];

  const loadMoreIssues = () => {
    if (hasNextPage && issues.length > 0) {
      fetchNextPage();
    }
  };

  const refetchIssuesFn = () => {
    if (issues.length > 0) {
      refetch();
    }
  };

  const renderListEmptyComponent = () => (
    <Text style={styles.emptyListText}>Обращения не найдены</Text>
  );

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlashList
          data={issues}
          showsVerticalScrollIndicator={false}
          onEndReached={loadMoreIssues}
          onEndReachedThreshold={0.5}
          contentContainerStyle={styles.contentContainer}
          estimatedItemSize={126}
          keyExtractor={({ id }) => String(id)}
          refreshing={isLoading}
          onRefresh={refetchIssuesFn}
          ListEmptyComponent={renderListEmptyComponent}
          renderItem={({ item }) => (
            <IssuesCard
              item={item}
              onPress={() => router.push(`/(withoutTabs)/issueInfo/${item.id}`)}
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
    gap: 16,
    paddingHorizontal: 18,
    backgroundColor: Colors.white,
  },
  emptyListText: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: Fonts.TRegular,
  },
  contentContainer: {
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
