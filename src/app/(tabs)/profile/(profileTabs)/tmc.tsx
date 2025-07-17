import { FlashList } from "@shopify/flash-list";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useUnit } from "effector-react";
import { LaptopMinimal } from "lucide-react-native";
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { getTMCInfo } from "@/entities/profile";
import { TmcCard } from "@/entities/tmc-card";
import { $auth } from "@/shared/api/auth.store";
import { Colors, Fonts } from "@/shared/styles/tokens";

const Tmc = () => {
  const { kanUid } = useUnit($auth);

  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["tmc"],
    queryFn: async ({ pageParam = 1 }) => {
      return getTMCInfo({
        id: kanUid,
        size: 10,
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

  const tmc = data?.pages.flatMap((page) => page.items) || [];

  const loadMorePosts = () => {
    if (hasNextPage && tmc.length > 0) {
      fetchNextPage();
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlashList
          data={tmc.filter((item) => item.is_active !== false)}
          showsVerticalScrollIndicator={false}
          onEndReached={loadMorePosts}
          onEndReachedThreshold={0.5}
          contentContainerStyle={styles.contentContainer}
          estimatedItemSize={56}
          overrideProps={{
            contentContainerStyle: tmc.length === 0 && styles.emptyList,
          }}
          refreshing={isLoading}
          ListEmptyComponent={() => (
            <View style={styles.emptyListContainer}>
              <LaptopMinimal size={45} color={Colors.redAccent} />
              <Text style={styles.emptyListText}>Нет данных по ТМЦ</Text>
            </View>
          )}
          renderItem={({ item }) => (
            <TmcCard
              active={item.name}
              serialCode={item.serial_code}
              code={item.code}
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    paddingHorizontal: 18,
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
    textAlign: "center",
  },
  contentContainer: {
    paddingBottom: Platform.OS === "ios" ? 64 : 32,
  },
});

export default Tmc;
