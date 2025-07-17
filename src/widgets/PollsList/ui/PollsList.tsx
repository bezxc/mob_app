import { FlashList } from "@shopify/flash-list";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useUnit } from "effector-react";
import {
  ActivityIndicator,
  Platform,
  RefreshControl,
  StyleSheet,
  Text,
} from "react-native";
import { getColleagueInfoV2 } from "@/entities/colleagues";
import { getPollsList } from "@/entities/polls";
import { PollsCard } from "@/entities/polls-card";
import { $auth } from "@/shared/api/auth.store";
import { Fonts } from "@/shared/styles/tokens";

export const PollsList = () => {
  const { kanUid } = useUnit($auth);

  const { data: user, isSuccess } = useQuery({
    queryKey: ["user", { kanUid }],
    queryFn: () => getColleagueInfoV2({ kan_uid: kanUid }),
  });

  const { data, isLoading, fetchNextPage, hasNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ["polls", { kanUid }],
      enabled: isSuccess,
      queryFn: async ({ pageParam = 1 }) =>
        getPollsList({
          size: 10,
          page: pageParam,
          kan_uid: kanUid,
          division_guid: user?.division.guid as string,
          position_guid: user?.position.guid as string,
        }),
      getNextPageParam: (lastPage) => {
        if (lastPage.page < lastPage.pages) {
          return lastPage.page + 1;
        }
        return undefined;
      },
      initialPageParam: 1,
    });

  const polls = data?.pages.flatMap((page) => page.items) || [];

  const loadMorePolls = () => {
    if (hasNextPage && polls.length > 0) {
      fetchNextPage();
    }
  };

  const refetchPollsFn = () => {
    if (polls.length > 0) {
      refetch();
    }
  };

  return (
    <>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlashList
          data={polls}
          onEndReached={loadMorePolls}
          onEndReachedThreshold={0.5}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          keyExtractor={({ id }) => String(id)}
          estimatedItemSize={83}
          ListEmptyComponent={
            <Text style={styles.emptyListText}>
              На данный момент нет активных опросов
            </Text>
          }
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={refetchPollsFn} />
          }
          renderItem={({ item }) => (
            <PollsCard
              id={item.id}
              title={item.title}
              numberOfQuestions={item.total_questions}
              isPassed={item.is_completed}
              date_start={item.date_start}
              date_end={item.date_end}
            />
          )}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 18,
    paddingBottom: Platform.OS === "ios" ? 64 : 32,
  },
  emptyListText: {
    fontSize: 16,
    fontFamily: Fonts.TRegular,
    margin: "auto",
  },
});
