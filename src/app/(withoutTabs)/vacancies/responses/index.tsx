import { FlashList } from "@shopify/flash-list";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useUnit } from "effector-react";
import { Layers } from "lucide-react-native";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { getAllVacancyResponses } from "@/entities/vacancies";
import { VacancyResponseCard } from "@/entities/vacancy-response-card";
import { $auth } from "@/shared/api/auth.store";
import { Colors, Fonts } from "@/shared/styles/tokens";

export default function MyResponsesPage() {
  const { kanUid } = useUnit($auth);

  const { data, isLoading, fetchNextPage, hasNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ["my-responses"],
      queryFn: async ({ pageParam = 1 }) => {
        return getAllVacancyResponses({
          size: 10,
          page: pageParam,
          order_by: "-created_at",
          resume_user_kan_uid__in: kanUid,
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

  const vacancyResponses = data?.pages.flatMap((page) => page.items) || [];

  const loadMoreVacancyResponses = () => {
    if (hasNextPage && vacancyResponses.length > 0) {
      fetchNextPage();
    }
  };

  const refetchVacancyResponsesFn = () => {
    if (vacancyResponses.length > 0) {
      refetch();
    }
  };

  const renderListEmptyComponent = () => (
    <View style={styles.emptyListContainer}>
      <Layers width={55} height={55} color={Colors.redAccent} strokeWidth={1} />
      <Text style={styles.emptyListText}>На данный момент откликов нет</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator style={{ flex: 1 }} />
      ) : (
        <FlashList
          data={vacancyResponses}
          showsVerticalScrollIndicator={false}
          onEndReached={loadMoreVacancyResponses}
          onEndReachedThreshold={0.5}
          overrideProps={{
            contentContainerStyle:
              vacancyResponses.length === 0 && styles.emptyList,
          }}
          contentContainerStyle={{
            paddingBottom: 64,
          }}
          estimatedItemSize={259}
          keyExtractor={({ vacancy_guid }) => String(vacancy_guid)}
          refreshing={isLoading}
          onRefresh={refetchVacancyResponsesFn}
          ListEmptyComponent={renderListEmptyComponent}
          renderItem={({ item }) => <VacancyResponseCard item={item} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "space-between",
    gap: 10,
    paddingHorizontal: 18,
  },

  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
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
    fontFamily: Fonts.SFSemiBold,
    fontSize: 20,
    textAlign: "center",
  },
});
