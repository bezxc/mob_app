import { FlashList } from "@shopify/flash-list";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useUnit } from "effector-react";
import { SlidersHorizontal } from "lucide-react-native";
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SheetManager } from "react-native-actions-sheet";
import { $postFilters, getActualPosts, PostListItem } from "@/entities/posts";
import { Colors, Fonts } from "@/shared/styles/tokens";

export default function Tab() {
  const { filters, optionsLength } = useUnit($postFilters);

  const { data, isLoading, fetchNextPage, hasNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ["posts", { filters }],
      queryFn: async ({ pageParam = 1 }) => {
        return getActualPosts({
          size: 10,
          order_by: "-publication_date",
          tag_id__in: filters.join(","),
          page: pageParam,
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

  const posts = data?.pages.flatMap((page) => page.items) || [];

  const loadMorePosts = () => {
    if (hasNextPage && posts.length > 0) {
      fetchNextPage();
    }
  };

  const refetchPosts = () => {
    if (posts.length > 0) {
      refetch();
    }
  };

  const toggleFilterSheet = () => {
    SheetManager.show("posts-filter");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.filterButton} onPress={toggleFilterSheet}>
        <View style={styles.filterInner}>
          <View style={styles.selectedFiltesContainer}>
            <Text style={styles.filterText}>Фильтр по категории</Text>
            {filters.length > 0 && (
              <>
                <View style={styles.selectedFilters} />
                <Text style={styles.filterText}>
                  {filters.length === optionsLength ? "Все" : filters.length}
                </Text>
              </>
            )}
          </View>
          <SlidersHorizontal size={18} color={Colors.redAccent} />
        </View>
      </TouchableOpacity>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlashList
          data={posts}
          showsVerticalScrollIndicator={false}
          onEndReached={loadMorePosts}
          onEndReachedThreshold={0.5}
          contentContainerStyle={styles.contentContainer}
          estimatedItemSize={248}
          refreshing={isLoading}
          onRefresh={refetchPosts}
          keyExtractor={({ id }) => String(id)}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>Новости не найдены</Text>
          )}
          renderItem={({ item }) => (
            <PostListItem
              created_at={item.created_at}
              id={item.id}
              image_key={item.image_key}
              title={item.title}
            />
          )}
        />
      )}
    </View>
  );
}

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
