import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getColleaguesBirthdayList } from "@/entities/colleagues";
import { ColleaguesCard } from "@/features/ColleaguesCard";
import { ChevronRight } from "@/shared/assets/icons";
import { Colors } from "@/shared/styles/tokens";
import { Skeleton } from "@/shared/ui";
import { skeletonData } from "../model/skeletonData";

export const HomeBirthdays = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["home-colleagues-birthday"],
    queryFn: async () => {
      return getColleaguesBirthdayList();
    },
  });
  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <Text style={styles.headerTitle}>Не забудьте поздравить!</Text>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => router.push("/(withoutTabs)/colleaguesBirthdayPage")}
        >
          <Text style={styles.headerButtonText}>Будущие</Text>
          <ChevronRight />
        </TouchableOpacity>
      </View>
      <View style={styles.birthdayContainer}>
        {isLoading
          ? skeletonData.slice(0, 3).map((item) => (
              <Skeleton
                key={item.id}
                style={styles.skeletonContainer}
                isLoading={isLoading}
              >
                <View
                  style={[
                    styles.skeletonWrapper,
                    styles.skeletonElementWrapper,
                  ]}
                >
                  <View style={[styles.skeletonImage]} />
                  <View style={[styles.skeletonWrapper, styles.skeletonInner]}>
                    <View style={styles.skeletonElement} />
                    <View style={styles.skeletonElement} />
                  </View>
                </View>
              </Skeleton>
            ))
          : data
              ?.slice(0, 3)
              .map((item) => (
                <ColleaguesCard
                  key={item.kan_uid}
                  kan_uid={String(item.kan_uid)}
                  name={item.full_name}
                  position={item.position.name}
                />
              ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
  },
  headerTitle: { fontSize: 16 },
  headerButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  headerButtonText: { fontSize: 12, color: Colors.grayText },
  birthdayContainer: { marginTop: 10, gap: 10, paddingBottom: 10 },
  skeletonContainer: {
    width: "100%",
    justifyContent: "flex-end",
    padding: 3,
    borderRadius: 16,
  },
  skeletonElement: {
    borderRadius: 16,
    height: 10,
    backgroundColor: Colors.gray,
  },
  skeletonImage: {
    borderRadius: 20,
    width: 48,
    height: 48,
    backgroundColor: Colors.gray,
  },
  skeletonWrapper: {
    backgroundColor: "transparent",
    flexGrow: 1,
  },
  skeletonInner: {
    gap: 10,
  },
  skeletonElementWrapper: {
    flexDirection: "row",
    gap: 14,
  },
});
