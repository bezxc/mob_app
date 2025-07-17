import dayjs from "dayjs";
import { router } from "expo-router";
import { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NotificationCard } from "@/entities/notification-card";
import { ChevronRight } from "@/shared/assets/icons";
import { Colors } from "@/shared/styles/tokens";
import { IMockCard } from "@/shared/types/types";
import { Skeleton } from "@/shared/ui";
import { skeletonData } from "../model/skeletonData";

interface IHomeNotificationsProps {
  data: IMockCard[];
  isLoading: boolean;
}

export const HomeNotifications: FC<IHomeNotificationsProps> = ({
  data,
  isLoading,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <Text style={styles.headerTitle}>Уведомления</Text>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => router.push("/(withoutTabs)/notificationsPage")}
        >
          <Text style={styles.headerButtonText}>Все</Text>
          <ChevronRight />
        </TouchableOpacity>
      </View>
      <View style={styles.notificationContainer}>
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
              .slice(0, 3)
              .map((item) => (
                <NotificationCard
                  key={item.id}
                  title="Какой-то заголовок уведомления"
                  date={dayjs("2022-01-01").format("D MMM YYYY HH:mm")}
                  description="Какой-то текст уведомления"
                />
              ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
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
  notificationContainer: { marginTop: 10, gap: 10, paddingBottom: 10 },
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
