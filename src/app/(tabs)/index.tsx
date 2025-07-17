import { usePrefetchQuery, useQueryClient } from "@tanstack/react-query";
import { useUnit } from "effector-react";
import { router } from "expo-router";
import { useState } from "react";
import {
  Dimensions,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import {
  ColleaguesBirthdayButton,
  getColleagueInfoV2,
} from "@/entities/colleagues";
import { getAllCoursesByUserId } from "@/entities/courses";
import { $auth } from "@/shared/api/auth.store";
import { Colors } from "@/shared/styles/tokens";
import { HomeNavigationCards } from "@/widgets/HomeNavigationCards";
import { HomePinnedSlider } from "@/widgets/HomePinnedSlider";
import { HomePostsList } from "@/widgets/HomePostsList";

export default function Tab() {
  const { kanUid } = useUnit($auth);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const queryCLient = useQueryClient();

  usePrefetchQuery({
    queryKey: ["user", { kanUid }],
    queryFn: () => getColleagueInfoV2({ kan_uid: kanUid }),
  });

  usePrefetchQuery({
    queryKey: ["courses", { kanUid }],
    queryFn: () => {
      return getAllCoursesByUserId(Number(kanUid));
    },
  });

  const refetchPosts = () => {
    setIsLoading(true);
    Promise.allSettled([
      queryCLient.invalidateQueries({ queryKey: ["home_pinned_posts"] }),
      queryCLient.invalidateQueries({ queryKey: ["home_posts"] }),
    ]).then(() => {
      setIsLoading(false);
    });
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refetchPosts} />
      }
      showsVerticalScrollIndicator={false}
      style={[styles.container]}
    >
      <View style={styles.paddingContainer}>
        <HomePinnedSlider />
      </View>
      <HomePostsList />
      <View style={styles.paddingContainer}>
        <HomeNavigationCards />
        {/* <HomeServicesButton /> */}
        {/* <HomeBirthdays /> */}
        <ColleaguesBirthdayButton
          style={{ marginBottom: 20, marginTop: 32 }}
          onPress={() => router.push("/(withoutTabs)/colleaguesBirthdayPage")}
        />
      </View>

      {/* <HomeNotifications data={data} isLoading={isLoading} /> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    height: Dimensions.get("window").height - 60,
    maxHeight: Dimensions.get("window").height - 60,
    overflow: "scroll",
  },
  paddingContainer: {
    paddingHorizontal: 18,
  },
});
