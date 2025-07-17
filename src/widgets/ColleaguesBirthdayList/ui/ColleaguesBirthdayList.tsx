import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  getColleaguesBirthdayListV2,
  getInitialIndex,
  groupByDateOfBirth,
} from "@/entities/colleagues";
import { ColleaguesCard } from "@/features/ColleaguesCard";
import { Colors, Fonts } from "@/shared/styles/tokens";

export const ColleaguesBirthdayList = () => {
  const [initialScrollIndex, setInitialScrollIndex] = useState<number | null>(
    null,
  );

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["colleagues-birthday"],
    queryFn: async () => {
      return getColleaguesBirthdayListV2();
    },
  });

  const colleagues = useMemo(
    () => groupByDateOfBirth(data?.map((page) => page) || []),
    [data],
  );

  const refetchColleaguesFn = () => {
    if (colleagues.length > 0) {
      refetch();
    }
  };

  const renderListEmptyComponent = () => (
    <Text style={styles.emptyListText}>Список пуст</Text>
  );

  useEffect(() => {
    const initialIndex = getInitialIndex(colleagues);
    setInitialScrollIndex(initialIndex);
  }, [colleagues]);

  return (
    <View style={styles.container}>
      {isLoading || initialScrollIndex === null ? (
        <ActivityIndicator />
      ) : (
        <FlashList
          initialScrollIndex={initialScrollIndex}
          data={colleagues}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          estimatedItemSize={64}
          refreshing={isLoading}
          onRefresh={refetchColleaguesFn}
          ListEmptyComponent={renderListEmptyComponent}
          keyExtractor={(_, index) => String(index)}
          renderItem={({ item }) => {
            if (typeof item === "object") {
              return (
                <ColleaguesCard
                  kan_uid={String(item.kan_uid)}
                  name={item.full_name}
                  position={item.position.name}
                  onPress={() =>
                    router.push(`/(withoutTabs)/colleaguesInfo/${item.kan_uid}`)
                  }
                />
              );
            }
            return (
              <View style={styles.titleWrapper}>
                <Text style={styles.title}>{item}</Text>
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, gap: 32 },
  contentContainer: {
    paddingHorizontal: 18,
    paddingBottom: Platform.OS === "ios" ? 64 : 32,
  },
  emptyListText: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: Fonts.TRegular,
  },
  titleWrapper: {
    marginBottom: 16,
    height: 48,
    justifyContent: "center",
  },
  title: {
    fontFamily: Fonts.TBold,
    fontSize: 14,
    color: Colors.redAccent,
  },
});
